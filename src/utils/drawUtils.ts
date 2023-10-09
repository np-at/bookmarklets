

export function clearCurrentSelectionBoxes(): void {
    const nodes = Array.from(document.querySelectorAll(
        "div.bounding-rect, div.segment-rect"
    ));
    for (const element of nodes) {
        element.parentNode?.removeChild(element);
    }
}

export function drawFocusBox(selection: Element | null): void {
    clearCurrentSelectionBoxes();
    if (selection == null) {
        return;
    }
    console.debug(selection);
    const rect = selection.getBoundingClientRect();
    if (rect.width && rect.height) {
        const outline = document.createElement("div");
        outline.classList.add("bounding-rect");
        outline.style.top = rect.top.toString(10) + "px";
        outline.style.left = rect.left.toString(10) + "px";
        outline.style.width = rect.width.toString(10) + "px";
        outline.style.height = rect.height.toString(10) + "px";
        document.body.appendChild(outline);
    }
    // if (rect.top && rect.left)
    //   focusTrace.push([rect.left, rect.top]);
    // console.log("focus array ", focusTrace);
    // drawFocusTraceArrows();
}

export function ensureBoundingStyleAvailable(): void {
    const boundRule =
        "div.bounding-rect { pointer-events: none; border: 3px solid red; border-radius: 4px 4px 4px 4px; position: fixed; z-index: 10000;}";
    const sht: CSSStyleSheet = document.styleSheets[0];
    try {
        sht.insertRule(boundRule, sht.cssRules.length);
    } catch {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = boundRule.valueOf();
        document.head.appendChild(styleSheet);
    }
}
export type DrawStyleProps = Partial<CSSStyleDeclaration>
const defaultStyle: DrawStyleProps = {
    backgroundColor: "black",
    color: "white",
    borderColor: "black",
    borderWidth: "2px",
    borderStyle: "solid",
}
export function drawBox(element: HTMLElement, utilityName: string, content: string, style?: DrawStyleProps): void {
    const blockDiv = document.createElement("div");
    const coords = element.getBoundingClientRect();
    blockDiv.setAttribute('rel', 'aria-' + utilityName);
    blockDiv.className = 'segment-rect';
    blockDiv.style.left = `${coords.x + (coords.width / 2)  - 100}px`;
    blockDiv.style.top = `${coords.y + (coords.height / 2) - 10}px`;
    blockDiv.style.position = 'absolute';
    blockDiv.style.zIndex = '10000';
    blockDiv.style.display = 'block'
    blockDiv.style.maxWidth = `${coords.width / 2}px`;
    blockDiv.style.minWidth = '200px';
    blockDiv.style.overflowWrap = 'break-word';
    blockDiv.style.padding = '1em';
    Object.assign(blockDiv.style, defaultStyle, style)
    // blockDiv.style.backgroundColor = style?.backgroundColor ?? 'black';
    // blockDiv.style.color = style?.color ?? 'white';
    // blockDiv.style.border = `2px solid ${style?.borderColor ?? 'black'}`;
    blockDiv.innerText = content.toString();
    document.body.appendChild(blockDiv);
}
