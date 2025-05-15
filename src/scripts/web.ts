
import fcs from "marklet:../marklets/fcs.ts";

import Axify from "marklet:../marklets/Axify.ts";
import AxifyTargeted from "marklet:../marklets/AxifyTargeted.ts";
import ForceFocusOutline from "marklet:../marklets/ForceFocusOutline.ts";
import TextSpacing from "marklet:../marklets/TextSpacing.ts";
import AriaLiveObserver from "marklet:../marklets/MonitorAriaLive.ts";
import ShowHeadings from "marklet:../marklets/showHeadings.ts";
import FindDuplicateIds from "marklet:../marklets/FindDuplicateIds.ts";
import HoverTest from "marklet:../marklets/HoverTest.ts";
import IdentifyExplicitNames from "marklet:../marklets/IdentifyExplicitNames.ts";
import ImageChecker from "marklet:../marklets/ImageCheck.ts";
import Pathify from "marklet:../marklets/Pathify.ts";
import MakeSkele from "marklet:../marklets/MakeSkele.ts";

import ShowImageAlt from "marklet:../marklets/ShowImageAlt";
import DupeId from "marklet:../marklets/dupeIdCheck.ts";
import TextObserver from "marklet:../marklets/TextObserver.ts";


// const asdf = "asdf"
// // END: import scripts
const root = document.querySelector("#root");
if (!root) {
  throw new Error("root element not found");
}
const makeLink = (x: string, name: string): void => {
  const rowDiv = document.createElement('div')
  rowDiv.classList.add('row')
  const anchorElement = document.createElement("a");
  anchorElement.href = x;
  anchorElement.innerText = name;
  anchorElement.id = "asdfas"
  rowDiv.appendChild(anchorElement);
  root.appendChild(rowDiv)

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateRandomText(): string {
  const randomText: string[] = [];
  const randomLength = Math.floor(Math.random() * 10) + 1;
  for (let i = 0; i < randomLength; i++) {
    randomText.push(Math.random().toString(36).substring(2, 15));
  }
  return randomText.join(" ");
}


// TODO: finish this
document.getElementById("live-region") as HTMLSpanElement;
