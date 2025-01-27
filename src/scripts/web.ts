// @ts-expect-error TS2307

import fcs from "marklet:../marklets/fcs.ts";
// @ts-expect-error TS2307
import Axify from "marklet:../marklets/Axify.ts";
// @ts-expect-error TS2307
import AxifyTargeted from "marklet:../marklets/AxifyTargeted.ts";
// @ts-expect-error TS2307
import ForceFocusOutline from "marklet:../marklets/ForceFocusOutline.ts";
// @ts-expect-error TS2307
import TextSpacing from "marklet:../marklets/TextSpacing.ts";
// @ts-expect-error TS2307
import AriaLiveObserver from "marklet:../marklets/MonitorAriaLive.ts";
// @ts-expect-error TS2307
import ShowHeadings from "marklet:../marklets/showHeadings.ts";
// @ts-expect-error TS2307
import FindDuplicateIds from "marklet:../marklets/FindDuplicateIds.ts";
// @ts-expect-error TS2307
import HoverTest from "marklet:../marklets/HoverTest.ts";
// @ts-expect-error TS2307
import IdentifyExplicitNames from "marklet:../marklets/IdentifyExplicitNames.ts";
// @ts-expect-error TS2307
import ImageChecker from "marklet:../marklets/ImageCheck.ts";
// @ts-expect-error TS2307
import Pathify from "marklet:../marklets/Pathify.ts";
// @ts-expect-error TS2307
import MakeSkele from "marklet:../marklets/MakeSkele.ts";
// @ts-expect-error TS2307
import ShowImageAlt from "marklet:../marklets/ShowImageAlt";
// @ts-expect-error TS2307
import DupeId from "marklet:../marklets/dupeIdCheck.ts";
// @ts-expect-error TS2307
import TextObserver from "marklet:../marklets/TextObserver.ts";
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
  anchorElement.id = "asdfas"
  root.appendChild(anchorElement);

};

// START: add links
// makeLink(asdf, "asdf")
makeLink(ShowImageAlt, "ShowImageAlt");
makeLink(fcs, "fcs");
makeLink(Axify, "Axify");
makeLink(AxifyTargeted, "AxifyTargeted");

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
makeLink(DupeId, "DupeId");
makeLink(TextObserver, "TextObserver");
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
