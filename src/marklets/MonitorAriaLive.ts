const config: MutationObserverInit = {
  attributes: true,
  subtree: true,
  childList: true,
  characterData: true,
  attributeOldValue: true,
  characterDataOldValue: true,
};

const mutationObserverCallback: MutationCallback = (mutations, _observer) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      console.debug("mutation: ", mutation);
      const target = mutation.target as HTMLElement;
      const addedNodes = Array.from(mutation.addedNodes);
      const removedNodes = Array.from(mutation.removedNodes);
      console.debug("addedNodes: ", addedNodes);
      console.debug("removedNodes: ", removedNodes);
      addedNodes.forEach((x) => {
        if (x.nodeType === Node.TEXT_NODE) {
          console.debug("text node added: ", x.textContent);
        } else if (x.nodeType === Node.ELEMENT_NODE) {
          console.debug("element node added: ", x);
          const liveregions = Array.from(
            (x as HTMLElement).querySelectorAll("[aria-live]")
          );
          liveregions && console.debug("found regions: ", liveregions);
          liveregions.forEach((x) => {
            if (monitoredNodes.includes(x)) {
              console.log("node already present", x);
              return;
            }
            monitoredNodes.push(x);
            const mo = new MutationObserver(mutationObserverCallback);
            mo.observe(x, config);
          });
        }
      });
      removedNodes.forEach((x) => {
        if (x.nodeType === Node.TEXT_NODE) {
          console.debug("text node removed: ", x.textContent);
        } else if (x.nodeType === Node.ELEMENT_NODE) {
          console.debug("element node removed: ", x);
          const liveregions = Array.from(
            (x as HTMLElement).querySelectorAll("[aria-live]")
          );
          liveregions && console.debug("found regions: ", liveregions);
          liveregions.forEach((x) => {
            if (monitoredNodes.includes(x)) {
              console.log("node already present", x);
              return;
            }
            monitoredNodes.push(x);
            const mo = new MutationObserver(mutationObserverCallback);
            mo.observe(x, config);
          });
        }
      });
    }
    if (mutation.type === "characterData") {
      console.debug("mutation: ", mutation);
      const target = mutation.target as HTMLElement;
      console.debug("text node changed: ", target.textContent);
    }

    if (mutation.type === "attributes") {
      console.debug("mutation: ", mutation);
      const target = mutation.target as HTMLElement;
      const attr = mutation.attributeName;
      const value = attr ? target.getAttribute(attr) : null;
      console.debug("value: ", value);
      if (attr === "aria-live") {
        console.debug("aria-live changed");
        if (value === "off") {
          console.debug("removing node from monitoredNodes");
          const idx = monitoredNodes.indexOf(target);
          if (idx > -1) {
            monitoredNodes.splice(idx, 1);
          }
        }
      }
    }
  });
};

// const al_attr = 'data-arialive-mutatobs-set'
const monitoredNodes: Element[] = [];

// apply callback to shadow roots
function applyToShadowRoots(
  startNode: Element,
  callback: (root: ShadowRoot) => void
): void {
  startNode.querySelectorAll("*").forEach((x) => {
    x.shadowRoot && callback(x.shadowRoot);
  });
}

function MonitorAriaLive(): void {
  //    const body = document.querySelector('body')
  //    if (body.attributes.getNamedItem(al_attr)) {
  //        console.log("Aria live mutation observers already set")
  //        return
  //    }

  console.debug("Looking for aria-live regions");
  const liveregions = Array.from(document.querySelectorAll("[aria-live]"));

  applyToShadowRoots(document.body, (root) => {
    liveregions.push(...Array.from(root.querySelectorAll("[aria-live]")));
  });

  liveregions && console.debug("found regions: ", liveregions);
  liveregions.forEach((x) => {
    if (monitoredNodes.includes(x)) {
      console.log("node already present", x);
      return;
    }
    monitoredNodes.push(x);
    const mo = new MutationObserver(mutationObserverCallback);
    mo.observe(x, config);
  });
  console.debug("monitoredNodes: ", monitoredNodes);
  //    body.setAttribute(al_attr, '')
}

MonitorAriaLive();
