// License: MIT
// Author: Anton Medvedev <anton@medv.io>
// Source: https://github.com/antonmedv/finder

interface Knot {
  name: string;
  penalty: number;
  level?: number;
}

type Path = Knot[];

export interface FinderOptions {
  root: Element;
  idName: (name: string) => boolean;
  className: (name: string) => boolean;
  tagName: (name: string) => boolean;
  attr: (name: string, value: string) => boolean;
  seedMinLength: number;
  optimizedMinLength: number;
  threshold: number;
  maxNumberOfTries: number;
}

let config: FinderOptions;
let rootDocument: Document | Element;
export function finder(input: Element, options?: Partial<FinderOptions>): string {
  function _finder(_input: Element | null, _options?: Partial<FinderOptions>): string {
    if (_input === null) throw new Error();
    if (input.nodeType !== Node.ELEMENT_NODE) {
      throw new Error(`Can't generate CSS selector for non-element node type.`);
    }
    if (_input.tagName.toLowerCase() === "html") {
      return "html";
    }
    const defaults: FinderOptions = {
      root: document.body,
      idName: () => true,
      className: () => true,
      tagName: () => true,
      attr: () => false,
      seedMinLength: 1,
      optimizedMinLength: 2,
      threshold: 1000,
      maxNumberOfTries: 10000,
    };

    config = { ...defaults, ..._options };
    rootDocument = findRootDocument(config.root, defaults);

    let path = bottomUpSearch(_input, "all", () =>
      bottomUpSearch(_input, "two", () => bottomUpSearch(_input, "one", () => bottomUpSearch(_input, "none"))),
    );

    if (path) {
      const optimized = sort(optimize(path, _input));
      if (optimized.length > 0) {
        path = optimized[0];
      }
      return selector(path);
    } else {
      throw new Error(`Selector was not found.`);
    }
  }

  function findRootDocument(rootNode: Element | Document, defaults: FinderOptions): Element | Document {
    if (rootNode.nodeType === 9) {
      // Node.DOCUMENT_NODE
      return rootNode;
    }
    if (rootNode === defaults.root) {
      return rootNode.ownerDocument;
    }
    return rootNode;
  }

  function bottomUpSearch(input: Element, limit: "all" | "two" | "one" | "none", fallback?: () => Path | null): Path | null {
    let path: Path | null = null;
    const stack: Knot[][] = [];
    let current: Element | null = input;
    let i = 0;
    while (current) {
      let level: Knot[] = maybe(id(current)) ||
        maybe(...attr(current)) ||
        maybe(...classNames(current)) ||
        maybe(tagName(current)) || [any()];
      const nth = index(current);
      if (limit == "all") {
        if (nth) {
          level = level.concat(level.filter(dispensableNth).map((node) => nthChild(node, nth)));
        }
      } else if (limit == "two") {
        level = level.slice(0, 1);
        if (nth) {
          level = level.concat(level.filter(dispensableNth).map((node) => nthChild(node, nth)));
        }
      } else if (limit == "one") {
        const [node] = (level = level.slice(0, 1));
        if (nth && dispensableNth(node)) {
          level = [nthChild(node, nth)];
        }
      } else if (limit == "none") {
        level = [any()];
        if (nth) {
          level = [nthChild(level[0], nth)];
        }
      }
      for (const node of level) {
        node.level = i;
      }
      stack.push(level);
      if (stack.length >= config.seedMinLength) {
        path = findUniquePath(stack, fallback);
        if (path) {
          break;
        }
      }
      current = current.parentElement;
      i++;
    }
    if (!path) {
      path = findUniquePath(stack, fallback);
    }
    if (!path && fallback) {
      return fallback();
    }
    return path;
  }

  function findUniquePath(stack: Knot[][], fallback?: () => Path | null): Path | null {
    const paths = sort(combinations(stack));
    if (paths.length > config.threshold) {
      return fallback ? fallback() : null;
    }
    for (const candidate of paths) {
      if (unique(candidate)) {
        return candidate;
      }
    }
    return null;
  }

  function selector(path: Path): string {
    let node = path[0];
    let query = node.name;
    for (let i = 1; i < path.length; i++) {
      const level = path[i].level ?? 0;
      if (node.level === level - 1) {
        query = `${path[i].name} > ${query}`;
      } else {
        query = `${path[i].name} ${query}`;
      }
      node = path[i];
    }
    return query;
  }

  function penalty(path: Path): number {
    return path.map((node) => node.penalty).reduce((acc, i) => acc + i, 0);
  }

  function unique(path: Path): boolean {
    const css = selector(path);
    switch (rootDocument.querySelectorAll(css).length) {
      case 0:
        throw new Error(`Can't select any node with this selector: ${css}`);
      case 1:
        return true;
      default:
        return false;
    }
  }

  function id(input: Element): Knot | null {
    const elementId = input.getAttribute("id");
    if (elementId && config.idName(elementId)) {
      return {
        name: "#" + CSS.escape(elementId),
        penalty: 0,
      };
    }
    return null;
  }

  function attr(input: Element): Knot[] {
    const attrs = Array.from(input.attributes).filter((attr) => config.attr(attr.name, attr.value));
    return attrs.map(
      (attr): Knot => ({
        name: `[${CSS.escape(attr.name)}="${CSS.escape(attr.value)}"]`,
        penalty: 0.5,
      }),
    );
  }

  function classNames(input: Element): Knot[] {
    const names = Array.from(input.classList).filter(config.className);
    return names.map(
      (name): Knot => ({
        name: "." + CSS.escape(name),
        penalty: 1,
      }),
    );
  }

  function tagName(input: Element): Knot | null {
    const name = input.tagName.toLowerCase();
    if (config.tagName(name)) {
      return {
        name,
        penalty: 2,
      };
    }
    return null;
  }

  function any(): Knot {
    return {
      name: "*",
      penalty: 3,
    };
  }

  function index(input: Element): number | null {
    const parent = input.parentNode;
    if (!parent) {
      return null;
    }
    let child = parent.firstChild;
    if (!child) {
      return null;
    }
    let i = 0;
    while (child) {
      if (child.nodeType === 1) {
        i++;
      }
      if (child === input) {
        break;
      }
      child = child.nextSibling;
    }
    return i;
  }

  function nthChild(node: Knot, i: number): Knot {
    return {
      name: node.name + `:nth-child(${i})`,
      penalty: node.penalty + 1,
    };
  }

  function dispensableNth(node: Knot): boolean {
    return node.name !== "html" && !node.name.startsWith("#");
  }

  function maybe(...level: Array<Knot | null>): Knot[] | null {
    const list = level.filter(notEmpty);
    if (list.length > 0) {
      return list;
    }
    return null;
  }

  function notEmpty<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  function* combinations(stack: Knot[][], path: Knot[] = []): Generator<Knot[]> {
    if (stack.length > 0) {
      for (const node of stack[0]) {
        yield* combinations(stack.slice(1, stack.length), path.concat(node));
      }
    } else {
      yield path;
    }
  }

  function sort(paths: Iterable<Path>): Path[] {
    return Array.from(paths)
      .map((x) => x)
      .sort((a, b) => penalty(a) - penalty(b));
  }

  interface Scope {
    counter: number;
    visited: Map<string, boolean>;
  }

  function* optimize(
    path: Path,
    input: Element,
    scope: Scope = {
      counter: 0,
      visited: new Map<string, boolean>(),
    },
  ): Generator<Knot[]> {
    if (path.length > 2 && path.length > config.optimizedMinLength) {
      for (let i = 1; i < path.length - 1; i++) {
        if (scope.counter > config.maxNumberOfTries) {
          return; // Okay At least I tried!
        }
        scope.counter += 1;
        const newPath = [...path];
        newPath.splice(i, 1);
        const newPathKey = selector(newPath);
        if (scope.visited.has(newPathKey)) {
          return;
        }
        if (unique(newPath) && same(newPath, input)) {
          yield newPath;
          scope.visited.set(newPathKey, true);
          yield* optimize(newPath, input, scope);
        }
      }
    }
  }

  function same(path: Path, input: Element): boolean {
    return rootDocument.querySelector(selector(path)) === input;
  }
  return _finder(input, options);
}
