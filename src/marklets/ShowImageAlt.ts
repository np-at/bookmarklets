// Path: src/marklets/ShowImageAlt.ts
import {getName} from "aria-api";
import {drawBox, type DrawStyleProps, ensureBoundingStyleAvailable} from "../utils/drawUtils";


const rel_showImageAlt = "aria-show-image-alt";
function _main(reset: boolean = false): void {
    ensureBoundingStyleAvailable();
    if (reset) {
        console.log("resetting")
        const s = Array.from(document.querySelectorAll(`[rel=${rel_showImageAlt}]`))
        console.log("found", s)
            s.forEach((el) => {
            el.parentNode?.removeChild(el);
        })
    }
    const errors: string[] = [];
    Array.from(document.querySelectorAll("img, svg, [role=img]")).forEach((el) => {
        let overlayText: string;

        const ATName = getName(el);
        const alt = el.getAttribute("alt");

        const style: DrawStyleProps = {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "black",
        }
        switch (alt) {
            case "":
                overlayText = "[Presentational image]";
                break;
            case null:
            case undefined:
                overlayText = "[Missing alt text]";
                style.backgroundColor = "rgba(255, 0, 0, 0.8)";
                style.color = "white";
                break;
            default:
                overlayText = alt;
                break
        }
        if (alt && ATName) {
            if (alt !== ATName) {
                errors.push(`alt text "${alt}" does not match accessible name "${ATName}" for `, el.innerHTML)
                // console.warn(`alt text "${alt}" does not match accessible name "${ATName}" for `, el);
                style.borderColor = "goldenrod";
                overlayText += ` (WARN: accessible name does not match alt text\n Accessible Name: ${ATName})a;lsdkjf;aslkjdf;lasdkjf;laskdjf;laskdjf;laskdjf;laskdjf;lasdkjf;alsdkjf;lasdkjf;alsdkjf;alsdkjf;asldkfja;sasdlkfjasldkfj`;

            }
        }
        const {x, y} = el.getBoundingClientRect()
        const scrim = document.createElement("div");
        scrim.setAttribute('rel', rel_showImageAlt);
        scrim.style.left = `${x}px`;
        scrim.style.top = `${y}px`;
        scrim.style.width = `${el.clientWidth}px`;
        scrim.style.height = `${el.clientHeight}px`;
        scrim.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        scrim.style.position = "absolute";
        scrim.style.zIndex = "9999";
        scrim.style.pointerEvents = "none";
        document.body.appendChild(scrim);


        drawBox(scrim as HTMLElement, rel_showImageAlt, overlayText ?? "ERROR", style)

        // if (alt === "") {
        // }
        // if (alt === null || alt === undefined) {
        //     overlayText = "[Missing alt text]";
        //     style.backgroundColor = "rgba(255, 0, 0, 0.8)";
        //     style.color = "white";
        // }

    })
}
// probably could have been done with clever use of pseudo-elements
// but, I'm not that clever
let _timer: number | undefined;
window.addEventListener("resize",() => {
    if (_timer) {
        window.clearTimeout(_timer);
    }
    _timer = window.setTimeout(() => {
        _main(true);
    }, 500)
});
_main();
