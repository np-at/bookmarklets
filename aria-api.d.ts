// noinspection JSUnusedGlobalSymbols
declare module "aria-api" {
  export const getRole: (el: Element) => string;
  export const getAttribute: (el: Element) => string;
  export const getName: (el: Element) => string;
  export const getDescription: (el: Element) => string;
  export const matches: (el: Element, selector: string) => boolean;
  export const querySelector: (root: Element, role: string) => Element | null;
  export const querySelectorAll: (root: Element, role: string) => Element[];
  export const closest: (el: Element, selector: string) => Element | null;
  export const getParentNode: (node: Node, owners?: Node[] ) => Node | null;
  export const getChildNodes: (node: Node, owners?: Node[] ) => Node[];
  export function hasRole(el: Element, roles: string[]): boolean;
  export function walk(root: Node, fn: (Node)=>never): void;
  export function searchUp(node: Node, test: (Node)=>boolean): Node | undefined;
}
