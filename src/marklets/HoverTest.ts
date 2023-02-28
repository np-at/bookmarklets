import { createPointerSelectorListener } from "../utils/pointerSelector";
import { getDescription, getName } from "aria-api";

function LogAriaAttributes(e: MouseEvent): boolean {
  const target = e.target;
  if (!(target instanceof HTMLElement)) {
    console.debug("target is not an HTMLElement");
    return false;
  }
  console.debug("name: ", getName(target));
  console.debug("description ", getDescription(target));
  return true;
}
createPointerSelectorListener(undefined, LogAriaAttributes);
