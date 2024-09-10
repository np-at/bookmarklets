function makeDisplay(): HtmlDivElement {
  const existingDisplay = document.getElementById("a11y-bookmarklet");
  if (existingDisplay) {
    if (existingDisplay.style.display === "none")
      existingDisplay.style.display = "block";
    const wrapper = existingDisplay.querySelector('.content-wrapper')
      wrapper.innerHTML = '';
    return wrapper;
  }
  const display = document.createElement("div");
  display.style.position = "fixed";
  display.style.top = "0";
  display.style.left = "0";
  display.style.zIndex = "1000000";
  display.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  display.style.padding = "10px";
  display.style.border = "1px solid black";
  display.style.borderRadius = "5px";
  display.style.maxWidth = "400px";
  display.style.overflow = "auto";
  display.style.maxHeight = "20vh";
  display.id = "a11y-bookmarklet";
  makeCloseButton(display);

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("content-wrapper");
  contentWrapper.style.maxHeight = "15vh";
  contentWrapper.style.overflow = "auto";
  display.appendChild(contentWrapper);

  document.body.appendChild(display);
  return contentWrapper;
}


function makeCloseButton(display: HtmlDivElement): HtmlButtonElement {
  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.style.position = "absolute";
  closeButton.style.top = "0";
  closeButton.style.right = "0";
  closeButton.style.zIndex = "1000001";
  closeButton.onclick = () => {
    display.style.display = "none";
  };
  display.appendChild(closeButton);
  return closeButton;
}


function findDuplicates(): Map<string, HTMLElement[]> {
  const ids = new Map<string, HTMLElement[]>();
  const all = document.querySelectorAll("[id]");
  all.forEach((x) => {
    if (x.id) {
      if (ids.has(x.id)) {
        ids.get(x.id)?.push(x);
      } else {
        ids.set(x.id, [x]);
      }
    }
  });
  return new Map(Array.from(ids.entries()).filter((x) => x[1].length > 1));
}

const ds = makeDisplay();
const duplicates = findDuplicates();
if (duplicates.size === 0) {
  ds.innerText = "No duplicate IDs found";
} else {
  ds.innerText = "Duplicate IDs found:";
  const topList = document.createElement("ul");
  topList.style.listStyleType = "square";
  ds.appendChild(topList);
  duplicates.forEach((v, k) => {
    const l = document.createElement("li");
    l.style.display = "list-item";
    const header = document.createElement("h2");
    header.innerText = k;
    l.appendChild(header);
    const list = document.createElement("ul");
    list.style.listStyleType = "square";
    header.after(list);
    v.forEach((x) => {
      const p = document.createElement("li");
      p.style.display = "list-item";
      p.innerText = x.innerHTML.length > 100 ? x.outerHTML.replace(x.innerHTML,'...') : x.outerHTML;
      list.appendChild(p);
    });
    topList.appendChild(l);
  });
}
