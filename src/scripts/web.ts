import  fs from "fs";
import { join } from "path";

import "./style.css";
console.log(join(__dirname, "../../dist", "fcs.js"));
const fcs = fs.readFileSync(join(__dirname, "../../dist", "fcs.js"), "utf-8");
const ForceFocusOutline = fs.readFileSync(
  join(__dirname, "../../dist", "ForceFocusOutline.js"),
  "utf-8"
);
const TextSpacing = fs.readFileSync(
  join(__dirname, "../../dist", "TextSpacing.js"),
  "utf-8"
);
const AriaLiveObserver = fs.readFileSync(
  join(__dirname, "../../dist", "MonitorAriaLive.js"),
  "utf-8"
);
const ShowHeadings = fs.readFileSync(
  join(__dirname, "../../dist", "showHeadings.js"),
  "utf-8"
);
const FindDuplicateIds = fs.readFileSync(
  join(__dirname, "../../dist", "FindDuplicateIds.js"),
  "utf-8"
);
const HoverTest = fs.readFileSync(
  join(__dirname, "../../dist", "HoverTest.js"),
  "utf-8"
);

const IdentifyExplicitNames = fs.readFileSync(
  join(__dirname, "../../dist", "IdentifyExplicitNames.js"),
  "utf-8"
);
const ImageChecker = fs.readFileSync(
    join(__dirname, "../../dist", "ImageCheck.js"),
    "utf-8"
);
const Axify = fs.readFileSync(
    join(__dirname, "../../dist", "Axify.js"),
    "utf-8"
);
const Pathify = fs.readFileSync(
    join(__dirname, "../../dist", "Pathify.js"),
    "utf-8"
);
const root = document.querySelector("#root") as HTMLDivElement;
const makeLink = (x: string, name: string): void => {
  const anchorElement = document.createElement("a");
  anchorElement.href = x;
  anchorElement.innerText = name;
  root.appendChild(anchorElement);
};


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
makeLink(Pathify, "Pathify")

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
