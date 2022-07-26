exports = {}
function ForceFocusOutline() {
    let d = document, id = 'phlffobkmklt', el = d.getElementById(id), f = d.querySelectorAll('iframe'), i = 0,
        l = f.length;
    if (el) {
        function removeFromShadows(root) {
            for (const el of root.querySelectorAll('*')) {
                if (el.shadowRoot) {
                    el.shadowRoot.getElementById(id).remove();
                    removeFromShadows(el.shadowRoot);
                }
            }
        }

        el.remove();
        if (l) {
            for (i = 0; i < l; i++) {
                try {
                    f[i].contentWindow.document.getElementById(id).remove();
                    removeFromShadows(f[i].contentWindow.document);
                } catch (e) {
                    console.log(e)
                }
            }
        }
        removeFromShadows(d);
    } else {
        const s = d.createElement('style');
        s.id = id;
        s.appendChild(d.createTextNode(':focus{outline:5px solid #F07 !important;z-index:10000 !important;}'));

        function applyToShadows(root) {
            for (var el of root.querySelectorAll('*')) {
                if (el.shadowRoot) {
                    el.shadowRoot.appendChild(s.cloneNode(true));
                    applyToShadows(el.shadowRoot);
                }
            }
        }

        d.getElementsByTagName('head')[0].appendChild(s);
        for (i = 0; i < l; i++) {
            try {
                f[i].contentWindow.document.getElementsByTagName('head')[0].appendChild(s.cloneNode(true));
                applyToShadows(f[i].contentWindow.document);
            } catch (e) {
                console.log(e)
            }
        }
        applyToShadows(d);
    }
}
ForceFocusOutline();
