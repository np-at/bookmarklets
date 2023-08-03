import {applyToShadows} from "../utils/applyToShadows";

// eslint-disable-next-line n/no-exports-assign
exports = {};

function ForceFocusOutline(): void {
  const d = document;
  const id = "phlffobkmklt";
  const el = d.getElementById(id);
  const f = d.querySelectorAll("iframe");
  let i = 0;
  const l = f.length;
  if (el) {
    function removeFromShadows(root: Document | ShadowRoot | undefined): void {
      for (const el of root?.querySelectorAll("*") ?? []) {
        if (el.shadowRoot) {
          el.shadowRoot.getElementById(id)?.remove();
          removeFromShadows(el.shadowRoot);
        }
      }
    }

    el.remove();
    if (l) {
      for (i = 0; i < l; i++) {
        try {
          f[i].contentWindow?.document.getElementById(id)?.remove();
          // remove from shadow roots
          applyToShadows(f[i].contentWindow?.document, (root) =>
            root.getElementById(id)?.remove()
          );
          // removeFromShadows(f[i].contentWindow?.document);
        } catch (e) {
          console.log(e);
        }
      }
    }
    removeFromShadows(d);
  } else {
    const s = d.createElement("style");
    s.id = id;
    s.innerText =
      ":focus{outline:5px solid #F07 !important;z-index:10000 !important;}";

    // function applyToShadows(root: Document | ShadowRoot | undefined): void {
    //   for (const el of root?.querySelectorAll("*") ?? []) {
    //     if (el.shadowRoot) {
    //       el.shadowRoot.appendChild(s.cloneNode(true));
    //       applyToShadows(el.shadowRoot);
    //     }
    //   }
    // }

    d.getElementsByTagName("head")[0].appendChild(s);
    for (i = 0; i < l; i++) {
      try {
        f[i].contentWindow?.document
          .getElementsByTagName("head")[0]
          .appendChild(s.cloneNode(true));
        applyToShadows(f[i].contentWindow?.document, (root) =>
          root.appendChild(s.cloneNode(true))
        );
      } catch (e) {
        console.log(e);
      }
    }
    applyToShadows(d, (root) => root.appendChild(s.cloneNode(true)));
  }
}

ForceFocusOutline();
