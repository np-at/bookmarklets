// stolen from https://codepen.io/stevef/pen/YLMqbo
// eslint-disable-next-line n/no-exports-assign
exports = {};
function TextSpacing() {
    var _a, _b, _c, _d, _e;
    var d = document;
    var id = "phltsbkmklt";
    var el = d.getElementById(id);
    var f = d.querySelectorAll("iframe");
    var i = 0;
    var l = f.length;
    if (el) {
        function removeFromShadows(root) {
            var _a, _b;
            for (var _i = 0, _c = Array.from((_a = root === null || root === void 0 ? void 0 : root.querySelectorAll("*")) !== null && _a !== void 0 ? _a : []); _i < _c.length; _i++) {
                var el_1 = _c[_i];
                if (el_1.shadowRoot) {
                    (_b = el_1.shadowRoot.getElementById(id)) === null || _b === void 0 ? void 0 : _b.remove();
                    removeFromShadows(el_1.shadowRoot);
                }
            }
        }
        el.remove();
        if (l) {
            for (i = 0; i < l; i++) {
                try {
                    (_b = (_a = f[i].contentWindow) === null || _a === void 0 ? void 0 : _a.document.getElementById(id)) === null || _b === void 0 ? void 0 : _b.remove();
                    removeFromShadows((_c = f[i].contentWindow) === null || _c === void 0 ? void 0 : _c.document);
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        removeFromShadows(d);
    }
    else {
        var s_1 = d.createElement("style");
        s_1.id = id;
        s_1.innerText =
            "*{line-height:1.5 !important;letter-spacing:0.12em !important;word-spacing:0.16em !important;}p{margin-bottom:2em !important;}";
        function applyToShadows(root) {
            var _a;
            for (var _i = 0, _b = Array.from((_a = root === null || root === void 0 ? void 0 : root.querySelectorAll("*")) !== null && _a !== void 0 ? _a : []); _i < _b.length; _i++) {
                var el_2 = _b[_i];
                if (el_2.shadowRoot) {
                    el_2.shadowRoot.appendChild(s_1.cloneNode(true));
                    applyToShadows(el_2.shadowRoot);
                }
            }
        }
        d.getElementsByTagName("head")[0].appendChild(s_1);
        for (i = 0; i < l; i++) {
            try {
                (_d = f[i].contentWindow) === null || _d === void 0 ? void 0 : _d.document.getElementsByTagName("head")[0].appendChild(s_1.cloneNode(true));
                applyToShadows((_e = f[i].contentWindow) === null || _e === void 0 ? void 0 : _e.document);
            }
            catch (e) {
                console.log(e);
            }
        }
        applyToShadows(d);
    }
}
TextSpacing();
