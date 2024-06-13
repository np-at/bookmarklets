/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {Transformer} from '@parcel/plugin';
import {TypescriptBundler} from "@puresamari/ts-bundler";
import {minify as terserMinify} from "terser";
import {join} from 'node:path';

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
    "'javascript:" +
    encodeURIComponent("(function(){" + cleanCode(code)).replace(/(['])/g, "\\$1") +
    "})();'";


/** @typedef {{code: string | undefined, map?: string | any}} R */
/**
 *
 * @param {string} inputFile
 * @param {boolean} minify
 * @returns {Promise<R>}
 */
async function compile(inputFile, minify) {
    const bundler = new TypescriptBundler(
        inputFile,
        join(import.meta.dirname, "tsconfig.web.json")
    );
    const r = await bundler.bundle();
    // console.log(r.output)


    if (minify) {
        const minified = await terserMinify(r.output, {
            compress: {
                keep_fnames: false,
                // keep_fargs: false,
                keep_classnames: false,
                passes: 3,
                booleans_as_integers: true,
                drop_console: false,

                side_effects: false,
                toplevel: true,
            },
            mangle: false,
            // mangle: {
            //   keep_fnames: false,
            //   toplevel: true,
            //   keep_classnames: false,
            //   properties: false,
            // },
            // toplevel: true,
            sourceMap: true,
            keep_fnames: false,
            keep_classnames: false
        });
        return {
            code: minified.code,
            map: minified.map
        }

    } else {
        return {
            code: formatAsBookmarklet(r.output),
            // map: r.map
        }
    }
}

export default new Transformer({
    async transform({asset, logger}) {
        const {code, map} = await compile(asset.filePath, true)
        // logger.info({message: code});

        // let sourceMap = await asset.getMap();

        // Run it through some compiler, and set the results
        // on the asset.
        // let {code, map} = compile(source, sourceMap);
        if (code)
            asset.setCode(code);
        // if (map)
        //     asset.setMap(map);
        asset.type = 'string'
        asset.bundleBehavior = 'inline'

        // Return the asset
        return [asset];
    }
})
