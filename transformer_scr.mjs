import { Transformer } from "@parcel/plugin";
import { TypescriptBundler } from "@puresamari/ts-bundler";
import { minify as terserMinify } from "terser";
import path, { join, resolve } from "node:path";
import fs from "fs";
import ts from "typescript";
import console from "node:console";

/**
 *

 * @param {string} absolutePath
 * @param {string} base
 * @return {ts.TranspileOutput}
 */
function extractEntryPoint(absolutePath, base) {
  try {
    const tsCode = fs.readFileSync(absolutePath, "utf-8");

    const prog = ts.createProgram([absolutePath], {});
    // const diag = prog.getSyntacticDiagnostics()

    const sourceFile = prog.getSourceFile(absolutePath);
    // console.dir(sourceFile)
    const funcStmts = sourceFile.statements.filter((x) => ts.isFunctionLike(x));
    console.log(funcStmts);
    /** @type ts.SignatureDeclaration */

    /** @type ts.TranspileOutput */
    // const jsCode = ts.transpileModule(tsCode, {
    //   compilerOptions: {
    //     baseUrl: base,
    //     removeComments: true,
    //   },
    // });
    //
    // return jsCode;
  } catch (e) {
    console.log(absolutePath);
    throw e;
  }
}

/**
 *

 * @param {string} rel
 * @param {string} base
 * @return {ts.TranspileOutput}
 */
export function compileRel(rel, base) {
  return extractEntryPoint(path.resolve(base, rel), base);
}

/**
 *
 * @param c { string }
 * @return {string}
 */
function cleanCode(c) {
  return c.trim();
}

/**
 *
 * @param code {string}
 * @return {string}
 */
const formatAsBookmarklet = (code) =>
  "'javascript:" + encodeURIComponent("(function(){" + cleanCode(code)).replace(/(['])/g, "\\$1") + "})();'";

/**
 *
 * @param {string} inputFile
 * @param {boolean} minify
 * @param {import("@parcel/types").PluginLogger | undefined} logger
 */
async function compile(inputFile, minify, logger) {
  const e = extractEntryPoint(resolve(inputFile), undefined);
  const bundler = new TypescriptBundler(inputFile, join(import.meta.dirname, "tsconfig.web.json"));
  const r = await bundler.bundle();
  // const console = await import("node:console");
  // console.log(r.output);

  if (minify) {
    const minified = await terserMinify(r.output, {
      compress: {
        dead_code: true,
        defaults: true,
        ecma: 2020,
        keep_fnames: false,
        keep_fargs: false,
        keep_classnames: false,
        passes: 3,
        booleans_as_integers: true,
        drop_console: false,
        expression: true,
        module: true,
        toplevel: true,
      },

      // mangle: true,
      mangle: {
        keep_fnames: false,
        toplevel: true,
        keep_classnames: false,
        properties: false,
        module: true,
      },
      // toplevel: true,
      sourceMap: {
        asObject: false,
      },
      // format: {
      //   ecma: 2020,
      //   comments: false,
      //
      // }
    });
    if (!minified.code) {
      throw new Error("Failed to minify code");
    }
    logger?.info({ message: `compiled ${inputFile} to ${minified.code.length} bytes; unminified: ${r.output.length} bytes` });

    return {
      code: formatAsBookmarklet(minified.code),
      map: minified.map,
    };
  } else {
    return {
      code: formatAsBookmarklet(r.output),
      // map: r.map
    };
  }
}

export default new Transformer({
  async transform({ asset, logger }) {
    const { code, map } = await compile(asset.filePath, true, logger);

    // logger.info({message: code});

    // let sourceMap = await asset.getMap();

    // Run it through some compiler, and set the results
    // on the asset.
    // let {code, map} = compile(source, sourceMap);
    if (code) asset.setCode(code);
    // asset.addDependency({specifierType:'esm', specifier: '@puresamari/ts-bundler', pipeline: 'ts', isOptional: false});
    // if (map && typeof map === 'string')
    //     asset.setMap(new SourceMap('',Buffer.from(map)));
    asset.type = "string";
    asset.bundleBehavior = "inline";

    // Return the asset
    return [asset];
  },
});
