"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.digIntoIframes = void 0;
function digIntoIframes(root, fxn) {
    for (var _i = 0, _a = Array.from(root.querySelectorAll("iframe")); _i < _a.length; _i++) {
        var el = _a[_i];
        if (el.contentDocument) {
            fxn(el.contentDocument);
            digIntoIframes(el.contentDocument, fxn);
        }
        else {
            fetch(el.src, {
                mode: "no-cors",
            })
                .then(function (response) {
                response
                    .text()
                    .then(function (text) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(text, "text/html");
                    fxn(doc);
                    digIntoIframes(doc, fxn);
                })
                    .catch(function (err) {
                    console.error(err);
                });
            })
                .catch(function (err) {
                console.error(err);
            });
        }
    }
}
exports.digIntoIframes = digIntoIframes;
