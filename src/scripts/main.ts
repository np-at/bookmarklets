import {argv} from "node:process";
import * as ts from "typescript"
import {WriteFileCallback} from "typescript";
import {minify} from "terser";
import * as fs from "fs";

const ags = argv.slice(argv.indexOf(__filename) + 1);


function cleanCode(c) {
    return c.trim()
}

async function compile(fileNames: string[], options: ts.CompilerOptions) {
    let program = ts.createProgram(fileNames, options);
    const cb: WriteFileCallback = (_fileName, data, _writeByteOrderMark, _onError) => {
        minify(data, {
            compress: {
                keep_fnames: false,
                keep_fargs: false,
                keep_classnames: false,
                passes: 3,
                booleans_as_integers: true,
                drop_console: false,
                toplevel: true,
            },
            mangle: {
                keep_fnames: false,
                toplevel: true,
                keep_classnames: false,
                properties: true
            },
            toplevel: true,
            sourceMap: false,
            keep_fnames: false,
            keep_classnames: false,

        }).then(c => {
            // console.log(formatAsBookmarklet(c.code));
            fs.writeFileSync(ags[1], formatAsBookmarklet(c.code));
        }).catch(e => {
            // fs.writeFileSync("asdf.js", e.toString());
            console.error(e);
            console.log(e);
        })


    }
    program.emit(undefined, cb)
    let emitResult = program.emit();
    let allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            let {line, character} = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });

    let exitCode = emitResult.emitSkipped ? 1 : 0;
}

compile([ags[0]], {
    noEmitOnError: true,
    noImplicitAny: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    // outDir: "./dist",
    removeComments: true,
    sourceMap: false,
});

const formatAsBookmarklet: (code: string) => string = (code: string) => "javascript:" + encodeURIComponent("(function(){" + cleanCode(code)) + "})();";
