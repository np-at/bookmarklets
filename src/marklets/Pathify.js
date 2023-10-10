/* eslint-disable @typescript-eslint/naming-convention */
"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var useIDRefs = true;
var hidePanels = false;
var targetAndSourceCompilationReadable = "";
var targetAndSourceCompilationProcessed = "";
function cartesian(head) {
    var _i, remainder, _a, remainder_1, r, _b, head_1, h;
    var tail = [];
    for (_i = 1; _i < arguments.length; _i++) {
        tail[_i - 1] = arguments[_i];
    }
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                remainder = tail.length ? cartesian.apply(void 0, tail) : [[]];
                _a = 0, remainder_1 = remainder;
                _c.label = 1;
            case 1:
                if (!(_a < remainder_1.length)) return [3 /*break*/, 6];
                r = remainder_1[_a];
                _b = 0, head_1 = head;
                _c.label = 2;
            case 2:
                if (!(_b < head_1.length)) return [3 /*break*/, 5];
                h = head_1[_b];
                return [4 /*yield*/, __spreadArray([h], r, true)];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4:
                _b++;
                return [3 /*break*/, 2];
            case 5:
                _a++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}
function findShortestUniqueClassCombination(el) {
    var classList = el.classList;
    var classListArray = Array.from(classList);
    var shortestUniqueClassCombination;
    for (var _i = 0, _a = cartesian(classListArray, classListArray); _i < _a.length; _i++) {
        var combo = _a[_i];
        var classString = "." + combo.join(".");
        var f = document.querySelectorAll(classString);
        if (f.length === 1) {
            shortestUniqueClassCombination = classString;
            break;
        }
    }
    return shortestUniqueClassCombination;
}
function getShortestCssSelector(el) {
    var currentEl = el;
    var shortestUniqueClassCombination;
    do {
        shortestUniqueClassCombination = findShortestUniqueClassCombination(currentEl);
        if (shortestUniqueClassCombination) {
            return shortestUniqueClassCombination;
        }
        currentEl = currentEl.parentNode;
    } while (currentEl.parentNode);
    var path = [];
    while (el.nodeType === Node.ELEMENT_NODE) {
        var selector = el.nodeName.toLowerCase();
        if (el.id) {
            selector += "#" + el.id;
            path.unshift(selector);
            break;
        }
        else {
            var sib = el;
            var nth = 1;
            while (sib) {
                if (sib.nodeName.toLowerCase() === selector) {
                    nth++;
                }
                sib = sib.previousElementSibling;
            }
            if (nth !== 1) {
                selector += ":nth-of-type(" + String(nth) + ")";
            }
        }
        path.unshift(selector);
        el = el.parentNode;
    }
    return path.join(" > ");
}
function getXpath(el) {
    return getShortestCssSelector(el);
    // let currentEl = el;
    // let currentElTagName = el.tagName.toLowerCase();
    // let parentEl: HTMLElement;
    // let parentElTagName = "";
    // let xpath = "";
    // let index = "";
    // let separator = "";
    //
    // while (currentEl.parentNode) {
    //     parentEl = currentEl.parentNode as HTMLElement;
    //     if (parentEl.tagName) {
    //         parentElTagName = parentEl.tagName.toLowerCase();
    //         const elementsWithSameTagName = parentEl.querySelectorAll(":scope > " + currentEl.tagName);
    //         if (elementsWithSameTagName.length > 1) {
    //             index = "[" + parseInt(String(Array.from(elementsWithSameTagName).indexOf(currentEl) + 1)).toString() + "]";
    //         } else {
    //             index = "";
    //         }
    //         currentElTagName = currentEl.tagName.toLowerCase();
    //         const id = currentEl.getAttribute("id");
    //         if (id && useIDRefs) {
    //             xpath = '/*[@id="' + id + '"]' + separator + xpath;
    //         } else {
    //             xpath = currentElTagName + index + separator + xpath;
    //         }
    //         separator = "/";
    //     }
    //
    //     currentEl = parentEl as Element;
    // }
    // if (parentElTagName === "") {
    //     parentElTagName = currentElTagName;
    // }
    // xpath = "//" + parentElTagName + index + separator + xpath;
    //
    // const xpathSplit = xpath.split("//*");
    // if (xpathSplit.length > 1) {
    //     xpath = xpathSplit[xpathSplit.length - 1];
    //     xpath = "//*" + xpath;
    // }
    //
    // return xpath;
}
function getXpathAndSource() {
    var currentEl;
    var parentEl;
    var infoPanel;
    var outputPanelForARC;
    var outputPanelForARC_textarea;
    var outputPanelForARC_textarea_label;
    var outputPanelForARC_input;
    var outputPanelForARC_input_label;
    var outputPanelForARC_closeButton;
    var outputPanelForARCAdded = false;
    var hasRun = false;
    if (!document.querySelector("#tempDOMDumpingGround")) {
        var tempDOMDumpingGroundNew = document.createElement("div");
        tempDOMDumpingGroundNew.setAttribute("id", "tempDOMDumpingGround");
        tempDOMDumpingGroundNew.setAttribute("hidden", "hidden");
        document.body.appendChild(tempDOMDumpingGroundNew);
    }
    var allEls = document.querySelectorAll("*");
    function downloadReadable(filename, text) {
        var allTargetsFileDownloadLinkReadable = document.querySelector("#allTargetsFileDownloadLinkReadable");
        if (!allTargetsFileDownloadLinkReadable) {
            throw new Error("allTargetsFileDownloadLinkReadable not found");
        }
        allTargetsFileDownloadLinkReadable.textContent = "Download the targets (Readable, .txt file)";
        allTargetsFileDownloadLinkReadable.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
        allTargetsFileDownloadLinkReadable.setAttribute("download", filename);
    }
    function downloadProcessed(filename, text) {
        var allTargetsFileDownloadLinkProcessed = document.querySelector("#allTargetsFileDownloadLinkProcessed");
        if (!allTargetsFileDownloadLinkProcessed) {
            throw new Error("allTargetsFileDownloadLinkProcessed not found");
        }
        allTargetsFileDownloadLinkProcessed.textContent = "Download the targets (Processed, .txt file)";
        allTargetsFileDownloadLinkProcessed.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
        allTargetsFileDownloadLinkProcessed.setAttribute("download", filename);
    }
    function addEmptyDownloadLinkReadable() {
        var a = document.createElement("a");
        a.setAttribute("id", "allTargetsFileDownloadLinkReadable");
        a.setAttribute("class", "allTargetsFileDownloadLink");
        a.addEventListener("click", function (e) {
            buildMarkdownFileOutput();
            var prefix = prompt("What SC do these targets relate to? (Filename will be prepended accordingly)");
            var allTargetsFileDownloadLinkReadable = document.querySelector("#allTargetsFileDownloadLinkReadable");
            if (!allTargetsFileDownloadLinkReadable) {
                throw new Error("allTargetsFileDownloadLinkReadable not found");
            }
            a.setAttribute("download", prefix !== null && prefix !== void 0 ? prefix : "" + "-xpaths-targets-selected---human-readable.txt");
            e.stopPropagation();
        });
        document.body.appendChild(a);
    }
    function addEmptyDownloadLinkProcessed() {
        var a = document.createElement("a");
        a.setAttribute("id", "allTargetsFileDownloadLinkProcessed");
        a.setAttribute("class", "allTargetsFileDownloadLink");
        a.addEventListener("click", function (e) {
            var _a;
            buildMarkdownFileOutput();
            var prefix = prompt("What SC do these targets relate to? (Filename will be prepended accordingly)");
            (_a = document.getElementById('allTargetsFileDownloadLinkProcessed')) === null || _a === void 0 ? void 0 : _a.setAttribute("download", prefix !== null && prefix !== void 0 ? prefix : "" + "-xpaths-targets-selected---machine-readable.txt");
            e.stopPropagation();
        });
        document.body.appendChild(a);
    }
    function addInfoPanel() {
        infoPanel = document.createElement("div");
        infoPanel.setAttribute("id", "infoPanel");
        infoPanel.setAttribute("role", "status");
        document.body.appendChild(infoPanel);
    }
    function addOutputPanelForARC() {
        function addPanelBehaviours() {
            outputPanelForARC_input.addEventListener("click", function (e) {
                outputPanelForARC_input.select();
                e.stopPropagation();
            });
            outputPanelForARC_textarea.addEventListener("click", function (e) {
                outputPanelForARC_textarea.select();
                e.stopPropagation();
            });
            outputPanelForARC.addEventListener("click", function (e) {
                e.stopPropagation();
            });
            outputPanelForARC_input_label.addEventListener("click", function (e) {
                e.stopPropagation();
            });
            outputPanelForARC_textarea_label.addEventListener("click", function (e) {
                e.stopPropagation();
            });
            outputPanelForARC_closeButton.addEventListener("click", function (e) {
                removeAllTheThings();
            });
        }
        function createLabels() {
            outputPanelForARC_input_label = document.createElement("label");
            outputPanelForARC_input_label.setAttribute("for", "outputPanelForARC_input");
            outputPanelForARC_input_label.textContent = "Xpath locator";
            outputPanelForARC_textarea_label = document.createElement("label");
            outputPanelForARC_textarea_label.setAttribute("for", "outputPanelForARC_textarea");
            outputPanelForARC_textarea_label.textContent = "Source code";
        }
        function createInputs() {
            outputPanelForARC_input = document.createElement("input");
            outputPanelForARC_input.setAttribute("id", "outputPanelForARC_input");
            outputPanelForARC_textarea = document.createElement("textarea");
            outputPanelForARC_textarea.setAttribute("id", "outputPanelForARC_textarea");
            outputPanelForARC_textarea.setAttribute("aria-label", "Source code");
        }
        function createCloseButton() {
            outputPanelForARC_closeButton = document.createElement("button");
            outputPanelForARC_closeButton.setAttribute("type", "button");
            outputPanelForARC_closeButton.textContent = "Close";
        }
        function createInfoPanel() {
            outputPanelForARC = document.createElement("div");
            outputPanelForARC.setAttribute("id", "outputPanelForARC");
            outputPanelForARC.setAttribute("tabindex", "-1");
            outputPanelForARC.setAttribute("role", "region");
            outputPanelForARC.setAttribute("aria-label", "Xpath and Source values");
        }
        function addElementsToInfoPanel() {
            outputPanelForARC.appendChild(outputPanelForARC_input_label);
            outputPanelForARC.appendChild(outputPanelForARC_input);
            outputPanelForARC.appendChild(outputPanelForARC_textarea_label);
            outputPanelForARC.appendChild(outputPanelForARC_textarea);
            outputPanelForARC.appendChild(outputPanelForARC_closeButton);
        }
        createInfoPanel();
        createInputs();
        createLabels();
        createCloseButton();
        addElementsToInfoPanel();
        addPanelBehaviours();
        document.body.appendChild(outputPanelForARC);
        outputPanelForARCAdded = true;
    }
    function removeAllTheThings() {
        var _a;
        outputPanelForARC.remove();
        (_a = document.querySelector("#xpathGetterStyles")) === null || _a === void 0 ? void 0 : _a.remove();
    }
    function buildMarkdownFileOutput() {
        downloadReadable("xpaths-targets-selected.txt", targetAndSourceCompilationReadable);
        downloadProcessed("xpaths-targets-selected-processed.txt", targetAndSourceCompilationProcessed);
    }
    function addAppStyles() {
        var xpathGetterStyles = document.createElement("style");
        xpathGetterStyles.setAttribute("id", "xpathGetterStyles");
        xpathGetterStyles.textContent = "#outputPanelForARC button {border:1px solid white;color:white;background:black;}#outputPanelForARC label {color:white;}#outputPanelForARC, #outputPanelForARC * {font-size:20px;font-family:sans-serif;}#outputPanelForARC {position:fixed;bottom:80px;right:20px;padding:20px;background:black;width:50vw;z-index:10000;outline:3px solid white;border-radius:5px;}#outputPanelForARC input, #outputPanelForARC textarea {width:100%;display:block;margin:10px 0;background:white;color:black;}#outputPanelForARC textarea {font-family:monospace;}.tempHighlight{outline:4px solid black!important;outline-offset:-4px!important;-webkit-box-shadow: 0px 0px 0px 4px #fff; box-shadow: 0px 0px 0px 4px #fff;}#infoPanel {z-index:100000;font-size:20px;background:rgba(0,0,0,0.8);color:#fff;font-weight:bold;padding:10px;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);max-width:50vw;font-family:sans-serif;overflow-wrap: break-word;outline:3px solid white;border-radius:5px;}#infoPanel:empty {visibility:hidden;}#infoPanel code {color:lime}#allTargetsFileDownloadLinkReadable {right:20px;background:rgba(41, 98, 24,0.9);}#allTargetsFileDownloadLinkProcessed {right:400px;background:rgba(135, 48, 167,0.9);outline:3px solid white;border-radius:5px;}.allTargetsFileDownloadLink {position:fixed;bottom:20px;color:white;font-weight:bold;padding:10px;font-family:sans-serif;font-size:16px;z-index:10000;outline:3px solid white;border-radius:5px;}.allTargetsFileDownloadLink:empty{visibility:hidden}#infoPanel kbd {color:yellow;}";
        // xpathGetterStyles.style.display = 'unset';
        xpathGetterStyles.style.display = 'none';
        document.head.appendChild(xpathGetterStyles);
    }
    function getNodeHTML(el) {
        var wrap = document.createElement("span");
        wrap.appendChild(el.cloneNode(true));
        var snippet = wrap.innerHTML;
        return snippet;
    }
    function getNodeDetails(el, e) {
        if (!outputPanelForARCAdded) {
            addOutputPanelForARC();
        }
        buildMarkdownFileOutput();
        unhighlightElement(el);
        outputPanelForARC_input.value = getXpath(el);
        var markup = getNodeHTML(el).replace(' class=""', "");
        var markupSplit = markup.split("\n");
        markup = "";
        for (var _i = 0, markupSplit_1 = markupSplit; _i < markupSplit_1.length; _i++) {
            var element = markupSplit_1[_i];
            if (element.trim() !== "") {
                markup += element.trim() + "\n";
            }
        }
        // const indented = indent.js(markup, { tabString: "\t" });
        // outputPanelForARC_textarea.value = indented;
        outputPanelForARC_textarea.value = markup;
        targetAndSourceCompilationReadable += getXpath(el) + "\n" + markup + "🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸 END target and source markup 🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸\n";
        targetAndSourceCompilationProcessed += getXpath(el) + "~~~//~~~" + flatten(markup) + "\n";
        console.clear();
        console.log("targetAndSourceCompilationReadable = \n", targetAndSourceCompilationReadable);
    }
    function flatten(string) {
        string = string.split("\n").join("\\n");
        return string;
    }
    function hideAllTheThings() {
        var _a, _b, _c;
        (_a = document.querySelector("#outputPanelForARC")) === null || _a === void 0 ? void 0 : _a.setAttribute("hidden", "hidden");
        // if (document.querySelector("#infoPanel")) {
        //   document.querySelector("#infoPanel").setAttribute("hidden","hidden");
        // }
        if (document.querySelector("#allTargetsFileDownloadLinkProcessed")) {
            (_b = document.querySelector("#allTargetsFileDownloadLinkProcessed")) === null || _b === void 0 ? void 0 : _b.setAttribute("hidden", "hidden");
        }
        if (document.querySelector("#allTargetsFileDownloadLinkReadable")) {
            (_c = document.querySelector("#allTargetsFileDownloadLinkReadable")) === null || _c === void 0 ? void 0 : _c.setAttribute("hidden", "hidden");
        }
    }
    function showAllTheThings() {
        var _a, _b, _c, _d;
        (_a = document.querySelector("#outputPanelForARC")) === null || _a === void 0 ? void 0 : _a.removeAttribute("hidden");
        (_b = document.querySelector("#infoPanel")) === null || _b === void 0 ? void 0 : _b.removeAttribute("hidden");
        (_c = document.querySelector("#allTargetsFileDownloadLinkProcessed")) === null || _c === void 0 ? void 0 : _c.removeAttribute("hidden");
        (_d = document.querySelector("#allTargetsFileDownloadLinkReadable")) === null || _d === void 0 ? void 0 : _d.removeAttribute("hidden");
    }
    unHighlightAll();
    Array.from(allEls).forEach(function (el) {
        el.addEventListener("click", function (e) {
            if (el.getAttribute("id") !== "allTargetsFileDownloadLinkReadable") {
                e.stopPropagation();
                e.preventDefault();
                getNodeDetails(el, e);
                infoPanel.innerHTML = "Values captured for " + getXpath(el);
            }
        });
        el.addEventListener("focus", function (e) {
            indicateCurrentEl(el, e);
        });
        el.addEventListener("mouseover", function (e) {
            indicateCurrentEl(el, e);
        });
        el.addEventListener("mouseout", function (e) {
            unHighlightAll();
        });
        el.addEventListener("blur", function (e) {
            unHighlightAll();
        });
    });
    function unHighlightAll() {
        Array.from(allEls).forEach(function (el) {
            unhighlightElement(el);
        });
    }
    function indicateCurrentEl(el, e) {
        currentEl = el;
        e.stopPropagation();
        if (!hasRun) {
            highlightElement(el);
        }
        updateInfoPanel(currentEl);
    }
    function unhighlightElement(el) {
        el.classList.remove("tempHighlight");
    }
    function highlightElement(el) {
        el.classList.add("tempHighlight");
    }
    function updateInfoPanel(el) {
        // console.clear();
        // console.log(getXpath(el));
        infoPanel.innerHTML = getXpath(el);
    }
    function checkKeyPresses() {
        document.addEventListener("keydown", function (e) {
            var _a;
            if (e.key === "Escape") {
                removeAllTheThings();
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                if (currentEl.parentNode && currentEl.tagName !== "HTML") {
                    unhighlightElement(currentEl);
                    parentEl = currentEl.parentNode;
                    currentEl = parentEl;
                    highlightElement(currentEl);
                }
                updateInfoPanel(currentEl);
                infoPanel.textContent = (_a = infoPanel.textContent) !== null && _a !== void 0 ? _a : "" + " 👈 Press Return to get this element's details";
            }
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (currentEl.previousElementSibling) {
                    unhighlightElement(currentEl);
                    currentEl = currentEl.previousElementSibling;
                    indicateCurrentEl(currentEl, e);
                }
            }
            if (e.key === "ArrowRight") {
                e.preventDefault();
                if (currentEl.nextElementSibling) {
                    unhighlightElement(currentEl);
                    currentEl = currentEl.nextElementSibling;
                    indicateCurrentEl(currentEl, e);
                }
            }
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (currentEl.childNodes.length > 1) {
                    unhighlightElement(currentEl);
                    var elementNodeFound_1 = false;
                    var elementToMoveTo_1;
                    Array.from(currentEl.childNodes).forEach(function (thisNode) {
                        if (thisNode.nodeType === 1 && !elementNodeFound_1) {
                            elementNodeFound_1 = true;
                            elementToMoveTo_1 = thisNode;
                        }
                    });
                    if (elementToMoveTo_1) {
                        currentEl = elementToMoveTo_1;
                        indicateCurrentEl(currentEl, e);
                    }
                }
            }
            if (e.key === "x") {
                useIDRefs = !useIDRefs;
                console.log("useIDRefs = ", useIDRefs);
                if (useIDRefs) {
                    infoPanel.innerHTML = "Using ID refs (where available) to get xpath";
                }
                else {
                    infoPanel.innerHTML = "Using element position in DOM to get xpath";
                }
            }
            if (e.key === "h") {
                console.log("hidePanels = ", hidePanels);
                if (!hidePanels) {
                    infoPanel.innerHTML = "Hiding panels temporarily (press h to show again or select an element)";
                    hideAllTheThings();
                }
                else {
                    showAllTheThings();
                    infoPanel.innerHTML = "Showing panels";
                }
                hidePanels = !hidePanels;
            }
            if (e.key === "Enter") {
                e.preventDefault();
                currentEl.click();
            }
        });
    }
    addAppStyles();
    addInfoPanel();
    addEmptyDownloadLinkReadable();
    addEmptyDownloadLinkProcessed();
    checkKeyPresses();
    // @ts-expect-error will be fiiine
    if (typeof infoPanel !== "undefined") {
        infoPanel.innerHTML = "<p>Xpath and Source getter started.</p><ul><li>Hover over on elements on the page, then click when the correct element is highlighted</li><li>Or <kbd>Tab</kbd> to a focusable element on the page and then press the arrow keys to fine tune your selection (choose parent, child and sibling elements in the DOM) and confirm that selection with <kbd>Enter</kbd></li><li>You can toggle the xpath type by (DOM position or use ID if present) pressing <kbd>x</kbd> key</li><li>Show/hide panels and download links by the <kbd>h</kbd> key</li></ul>";
    }
}
getXpathAndSource();
