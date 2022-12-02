import * as fs from "fs";
import { join } from "path";

// import "./style.css";

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
)
const FindDuplicateIds = fs.readFileSync(
    join(__dirname, "../../dist","FindDuplicateIds.js"),
    "utf-8"
)
const root = document.querySelector("#root") as HTMLDivElement;
const makeLink = (x, name: string) => {
  const anchorElement = document.createElement("a");
  anchorElement.href = x;
  anchorElement.innerText = name;
  root.appendChild(anchorElement);
};

makeLink(fcs, "fcs");
makeLink(ForceFocusOutline, "ForceFocusOutline");
makeLink(TextSpacing, "TextSpacing");
makeLink(AriaLiveObserver, "AriaLiveObserver");
makeLink(ShowHeadings, "ShowHeadings")
makeLink(FindDuplicateIds, "FindDuplicateIds")
