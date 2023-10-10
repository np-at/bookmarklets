"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyToShadows = void 0;
function applyToShadows(root, fn) {
    var _a;
    for (var _i = 0, _b = Array.from((_a = root === null || root === void 0 ? void 0 : root.querySelectorAll("*")) !== null && _a !== void 0 ? _a : []); _i < _b.length; _i++) {
        var el = _b[_i];
        if (el.shadowRoot) {
            fn(el.shadowRoot);
            applyToShadows(el.shadowRoot, fn);
        }
    }
}
exports.applyToShadows = applyToShadows;
