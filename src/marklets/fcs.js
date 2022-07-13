"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aria_api_1 = require("aria-api");
var focusTrace = [];
var ariaDebug = function (el) {
    var role = (0, aria_api_1.getRole)(el);
    var name = (0, aria_api_1.getName)(el);
    var description = (0, aria_api_1.getDescription)(el);
    console.log("\n        role: ".concat(role, "\n                name: ").concat(name, "\n        description: ").concat(description, "\n    "));
};
function addBoundingStyle() {
    var boundRule = "div.bounding-rect { pointer-events: none; border: 3px solid red; border-radius: 4px 4px 4px 4px; position: fixed; z-index: 10000;}";
    var sht = document.styleSheets[0];
    try {
        sht.insertRule(boundRule, sht.cssRules.length);
    }
    catch (_a) {
        var styleSheet = document.createElement("style");
        styleSheet.innerText = boundRule.valueOf();
        document.head.appendChild(styleSheet);
    }
}
function handleFocusChange(_event) {
    var _a;
    clearTimeout(selectionChangeTimer);
    selectionChangeTimer = setTimeout(drawFocusBoxes, 100);
    var rect = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    if (rect.top && rect.left)
        focusTrace.push([rect.left + (rect.width / 3) + document.scrollingElement.scrollLeft, rect.top + (rect.height / 3) + document.scrollingElement.scrollTop]);
    console.log("asdf", document.activeElement);
    drawFocusTraceArrows();
}
function redrawSelectionBoxes(_event) {
    clearTimeout(redrawTimer);
    redrawTimer = setTimeout(drawFocusBoxes, 300);
}
function clearCurrentSelectionBoxes() {
    var nodes = document.querySelectorAll("div.bounding-rect, div.segment-rect");
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].parentNode.removeChild(nodes[i]);
    }
}
function drawFocusBoxes() {
    clearCurrentSelectionBoxes();
    clearArrowSvgs();
    var selection = document.activeElement;
    if (selection == null) {
        return;
    }
    console.debug(selection);
    ariaDebug(selection);
    var rect = selection.getBoundingClientRect();
    if (rect.width && rect.height) {
        var outline = document.createElement("div");
        outline.classList.add("bounding-rect");
        outline.style.top = rect.top + "px";
        outline.style.left = rect.left + "px";
        outline.style.width = rect.width + "px";
        outline.style.height = rect.height + "px";
        document.body.appendChild(outline);
    }
}
function clearArrowSvgs() {
}
function createArrowSvg(c1, c2, svg) {
    if (svg === void 0) { svg = null; }
    var dX = c2[0] - c1[0];
    var dY = c2[1] - c1[1];
    if (isNaN(dX) || isNaN(dY))
        return;
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(c1[0]));
    line.setAttribute("x2", String(c2[0]));
    line.setAttribute("y1", String(c1[1]));
    line.setAttribute("y2", String(c2[1]));
    line.setAttribute("stroke", "red");
    line.setAttribute("stroke-width", "3");
    var angleOffset = Math.PI / 6;
    var triSideLength = Math.sqrt(dX * dX + dY * dY) / 10;
    var angle = Math.atan(dY / dX) + (Math.sign(dX) === -1 ? 0 : -1 * Math.PI);
    var x3 = triSideLength * Math.cos(angle + angleOffset) + c2[0];
    var x4 = triSideLength * Math.cos(angle - angleOffset) + c2[0];
    var y3 = triSideLength * Math.sin(angle + angleOffset) + c2[1];
    var y4 = triSideLength * Math.sin(angle - angleOffset) + c2[1];
    var triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    triangle.setAttribute("points", "".concat(c2[0], ",").concat(c2[1], " ").concat(x3, ",").concat(y3, " ").concat(x4, ",").concat(y4));
    triangle.setAttribute("fillcolor", "blue");
    if (svg == null) {
        var newSvg = void 0;
        newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        newSvg.setAttribute("version", "1.1");
        newSvg.setAttribute("aria-hidden", "true");
        newSvg.setAttribute('id', 'rootSvg');
        newSvg.style.position = "absolute";
        newSvg.style.pointerEvents = "none";
        newSvg.style.top = String(0);
        newSvg.style.left = String(0);
        newSvg.style.width = '100%';
        newSvg.style.height = "100%";
        newSvg.style.overflow = "overlay";
        newSvg.appendChild(triangle);
        newSvg.appendChild(line);
        document.body.append(newSvg);
        console.log("line: ", newSvg);
    }
    else {
        svg.appendChild(triangle);
        svg.appendChild(line);
    }
}
function drawFocusTraceArrows() {
    if (focusTrace.length < 2)
        return;
    var svg = document.getElementById('rootSvg');
    createArrowSvg(focusTrace[focusTrace.length - 2], focusTrace[focusTrace.length - 1], svg);
}
var selectionChangeTimer = null;
var redrawTimer = null;
addBoundingStyle();
window.addEventListener("focusin", handleFocusChange, { passive: false });
window.addEventListener("scroll", redrawSelectionBoxes, { passive: false });
window.addEventListener("resize", redrawSelectionBoxes, { passive: false });
