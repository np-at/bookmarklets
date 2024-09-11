/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Transformer } from "@parcel/plugin";
import { TypescriptBundler } from "@puresamari/ts-bundler";
import { minify as terserMinify } from "terser";
import { join } from "node:path";

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
  const bundler = new TypescriptBundler(inputFile, join(import.meta.dirname, "tsconfig.web.json"));
  const r = await bundler.bundle();
  // console.log(r.output)

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
        asObject: false
      }
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
      map: minified.map
    };
  } else {
    return {
      code: formatAsBookmarklet(r.output)
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
  }

});
