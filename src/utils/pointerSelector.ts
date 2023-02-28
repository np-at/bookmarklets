let _pointerSelector: HTMLElement;
let _latestCoordinates: { x: number; y: number } = { x: 0, y: 0 };
let _debounceTimer: string | number | NodeJS.Timeout | undefined;
// This is a helper function to help you find the element you want to click on.
// It will create a red box around the element you hover over.
// You can pass a click handler that will be called when you click on the element.
// If you return true from the click handler, the pointer selector element will be removed.
function createPointerSelector(
  clickHandler?: (e: MouseEvent) => boolean
): boolean {
  if (_pointerSelector) {
    console.warn("Pointer selector already exists");
    return false;
  }
  function clickHandlerResolver(click: MouseEvent): void {
    if (clickHandler?.(click)) {
      document
        .getElementById("phlffobkmklt")
        ?.removeEventListener("click", clickHandlerResolver);
      document
        .getElementById("phlffobkmklt")
        ?.removeEventListener("mouseover", pointerSelectorMouseEventForwarder);
      document.getElementById("phlffobkmklt")?.remove();
    }
  }
  _pointerSelector = document.createElement("div");
  _pointerSelector.className = "phlffobkmklt";
  _pointerSelector.style.position = "absolute";
  _pointerSelector.id = "phlffobkmklt";
  _pointerSelector.style.zIndex = "100000";
  _pointerSelector.style.border = "2px solid red";
  _pointerSelector.style.outline = "2px solid orange";
  _pointerSelector.style.outlineOffset = "2px";
  _pointerSelector.style.opacity = "0.5";
  if (typeof clickHandler === "function") {
    _pointerSelector.style.pointerEvents = "auto";
    _pointerSelector.addEventListener("click", clickHandlerResolver, {
      passive: true,
      once: false,
    });
    _pointerSelector.addEventListener(
      "mouseover",
      pointerSelectorMouseEventForwarder,
      {
        passive: false,
        once: false,
        capture: true,
      }
    );
  } else {
    _pointerSelector.style.pointerEvents = "none";
  }
  _pointerSelector = document.body.appendChild(_pointerSelector);
  return true;
}
const getTargetFromCachedCoords: () => HTMLElement = () =>
  document.elementFromPoint(
    _latestCoordinates.x,
    _latestCoordinates.y
  ) as HTMLElement;

function pointerSelectorMouseEventForwarder(e: MouseEvent): void {
  // _pointerSelector.style.pointerEvents = "none";

  e.stopPropagation();
  _latestCoordinates = { x: e.pageX, y: e.pageY };
  if (_debounceTimer) {
    clearTimeout(_debounceTimer);
  }
  _debounceTimer = setTimeout(() => {
    _pointerSelector.style.display = "none";
    const lowerEl = getTargetFromCachedCoords();
    lowerEl?.dispatchEvent(
      new MouseEvent(e.type, {
        bubbles: true,
      })
    );
    console.debug("lower el: ", lowerEl);
    _debounceTimer = undefined;
    _pointerSelector.style.display = "block";
  }, 500);

  // _pointerSelector.style.pointerEvents = "auto";
}
function adjustPointerSelector(target: HTMLElement): void {
  const { x: x1, y: y1, height, width } = target.getBoundingClientRect();
  // const y2 = y1 + height;
  // const x2 = x1 + width;
  const pointerSelector = document.getElementById(
    "phlffobkmklt"
  ) as HTMLElement;
  pointerSelector.style.top = `${y1}px`;
  pointerSelector.style.left = `${x1}px`;
  pointerSelector.style.width = `${width}px`;
  pointerSelector.style.height = `${height}px`;
}
function mouseoverHandler(
  e: MouseEvent,
  callback?: (me: MouseEvent) => void
): void {
  const target = e.target as HTMLElement;
  adjustPointerSelector(target);
  if (callback) {
    callback(e);
  }
  console.debug(target);
}

// Creates a pointer selector that will create a red box around the element you hover over.
// You can pass a click handler that will be called when you click on the element.
// If you return true from the click handler, the pointer selector element will be removed.
//
// You can also pass a hover handler that will be called when you hover over an element.
function createPointerSelectorListener(
  hoverCallback?: (t: MouseEvent) => void,
  clickCallback?: (t: MouseEvent) => boolean
): void {
  if (!createPointerSelector(clickCallback)) return;
  document.addEventListener(
    "mouseover",
    (e) => {
      mouseoverHandler(e, hoverCallback);
    },
    {
      passive: true,
      once: false,
    }
  );
}
export { createPointerSelectorListener };
