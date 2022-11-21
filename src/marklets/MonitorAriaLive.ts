function mutationObserverCallback(mutations: any, _observer: any): void {
  console.log("mutations: ", mutations);
}

// const al_attr = 'data-arialive-mutatobs-set'
const monitoredNodes: Element[] = [];

function MonitorAriaLive(): void {
  //    const body = document.querySelector('body')
  //    if (body.attributes.getNamedItem(al_attr)) {
  //        console.log("Aria live mutation observers already set")
  //        return
  //    }
  const config: MutationObserverInit = {
    attributes: true,
    subtree: true,
    childList: true,
  };
  console.debug("Looking for aria-live regions");
  const liveregions = document.querySelectorAll("[aria-live]");
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
