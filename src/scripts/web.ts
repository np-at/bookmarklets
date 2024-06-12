import fcs from "marklet:../marklets/fcs.ts"
import Axify from "marklet:../marklets/Axify.ts"
import ForceFocusOutline from "marklet:../marklets/ForceFocusOutline.ts"
import TextSpacing from "marklet:../marklets/TextSpacing.ts"
import AriaLiveObserver from "marklet:../marklets/MonitorAriaLive.ts"
import ShowHeadings from "marklet:../marklets/showHeadings.ts"
import FindDuplicateIds from "marklet:../marklets/FindDuplicateIds.ts"
import HoverTest from "marklet:../marklets/HoverTest.ts"
import IdentifyExplicitNames from "marklet:../marklets/IdentifyExplicitNames.ts"
import ImageChecker from "marklet:../marklets/ImageCheck.ts"
import Pathify from "marklet:../marklets/Pathify.ts"
import MakeSkele from "marklet:../marklets/MakeSkele.ts"
import ShowImageAlt from "marklet:../marklets/ShowImageAlt"
import "./style.css";


// const asdf = "asdf"
// // END: import scripts
const root = document.querySelector("#root");
if (!root) {
  throw new Error("root element not found");
}
const makeLink = (x: string, name: string): void => {
  const anchorElement = document.createElement("a");
  anchorElement.href = x;
  anchorElement.innerText = name;
  root.appendChild(anchorElement);
};

// START: add links
// makeLink(asdf, "asdf")
makeLink(ShowImageAlt, "ShowImageAlt");

makeLink(fcs, "fcs");
makeLink(Axify, "Axify");
makeLink(ForceFocusOutline, "ForceFocusOutline");
makeLink(TextSpacing, "TextSpacing");
makeLink(AriaLiveObserver, "AriaLiveObserver");
makeLink(ShowHeadings, "ShowHeadings");
makeLink(FindDuplicateIds, "FindDuplicateIds");
makeLink(HoverTest, "HoverTest");
makeLink(IdentifyExplicitNames, "IdentifyExplicitNames");
makeLink(ImageChecker, "ImageChecker");
makeLink(Pathify, "Pathify");
makeLink(MakeSkele, "MakeSkele");

// END: add links

// random text generator
function generateRandomText(): string {
  const randomText: string[] = [];
  const randomLength = Math.floor(Math.random() * 10) + 1;
  for (let i = 0; i < randomLength; i++) {
    randomText.push(Math.random().toString(36).substring(2, 15));
  }
  return randomText.join(" ");
}
//
// setInterval(() => {
//   try {
//     (
//       document.getElementById("live-region") as HTMLSpanElement
//     ).innerText = `poop ${generateRandomText()}`;
//   } catch (e) {
//     console.error(e);
//     clearInterval(this);
//   }
// }, 6000);

// TODO: finish this
document.getElementById("live-region") as HTMLSpanElement;
