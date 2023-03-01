import { createPointerSelectorListener } from "../utils/pointerSelector";
import { getDescription, getName } from "aria-api";

function LogAriaAttributes(target: HTMLElement): boolean {

  console.log("target: ", target);
  console.log("name: ", getName(target));
  console.log("description ", getDescription(target));
  return true;
}
createPointerSelectorListener(undefined, LogAriaAttributes);
