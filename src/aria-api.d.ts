declare module "aria-api" {
  export const getRole: any;
  export const getAttribute: any;
  export const getName: any;
  export const getDescription: any;
  export const matches: any;
  export const querySelector: any;
  export const querySelectorAll: any;
  export const closest: any;
  export const getParentNode: any;
  export const getChildNodes: any;
  export function hasRole(el: any, roles: any): any;
  export function walk(root: any, fn: any): void;
  export function searchUp(node: any, test: any): any;
}
