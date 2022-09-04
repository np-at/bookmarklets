import { argv } from "node:process";
import { minify as terserMinify } from "terser";
import * as fs from "fs/promises";
import { TypescriptBundler } from "@puresamari/ts-bundler";

import { Command } from "commander";
const program = new Command();
program.version("0.0.1");
//program.option("-d, --debug", "debug mode",undefined, false);
program.option("-o, --output <file>", "output file");
program.option("-i, --input <file>", "input file");
program.option("--no-urlencode", "disable urlencoding of outputted js");
program.option("--no-minify", "disable minification");

program.parse(argv);
const { output, input, urlencode, minify } = program.opts();
const inputFile = input;
const outputFile = output;

//const debug = program.debug;

//const ags = argv.slice(argv.indexOf(__filename) + 1);

function cleanCode(c: string): string {
  return c.trim();
}

// async function compile(fileNames: string[], options: ts.CompilerOptions) {
//     let program = ts.createProgram(fileNames, options);
//     const cb: WriteFileCallback = (_fileName, data, _writeByteOrderMark, _onError) => {
//         terserMinify(data, {
//             compress: {
//                 keep_fnames: false,
//                 keep_fargs: false,
//                 keep_classnames: false,
//                 passes: 3,
//                 booleans_as_integers: true,
//                 drop_console: false,
//                 toplevel: true,
//             },
//             mangle: {
//                 keep_fnames: false,
//                 toplevel: true,
//                 keep_classnames: false,
//                 properties: true
//             },
//             toplevel: true,
//             sourceMap: false,
//             keep_fnames: false,
//             keep_classnames: false,

//         }).then(c => {
//             console.log(formatAsBookmarklet(c.code));
//             // fs.writeFileSync(ags[1], formatAsBookmarklet(c.code));
//         }).catch(e => {
//             // fs.writeFileSync("asdf.js", e.toString());
//             console.error(e);
//             console.log(e);
//         })

//     }
//     program.emit(undefined, cb)
//     let emitResult = program.emit();
//     let allDiagnostics = ts
//         .getPreEmitDiagnostics(program)
//         .concat(emitResult.diagnostics);

//     allDiagnostics.forEach(diagnostic => {
//         if (diagnostic.file) {
//             let {line, character} = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
//             let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
//             console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
//         } else {
//             console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
//         }
//     });

//     let exitCode = emitResult.emitSkipped ? 1 : 0;
// }

const bundler = new TypescriptBundler(inputFile);

(async () => {
  const r = await bundler.bundle();
  // console.log(r.output)
  let codeOutput: string;
  if (minify) {
    const minified = await terserMinify(r.output, {
      compress: {
        keep_fnames: false,
        // keep_fargs: false,
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
        properties: false,
      },
      // toplevel: true,
      sourceMap: false,
      keep_fnames: false,
      keep_classnames: false,
    });
    codeOutput = minified.code;
  } else {
    codeOutput = r.output;
  }

  codeOutput &&
    (await fs.writeFile(
      outputFile,
      urlencode ? formatAsBookmarklet(codeOutput) : codeOutput
    ));
})().then(
  (_) => {
    // console.log(formatAsBookmarklet(value))
    // console.log(value)
  },
  (rej) => {
    console.warn("rejected: ", rej);
  }
);
// compile([ags[0]], {
//     noEmitOnError: true,
//     noImplicitAny: false,
//     esModuleInterop: false,
//     inlineSources: false,
//     target: ts.ScriptTarget.ES5,
//     module: ts.ModuleKind.AMD,
//     moduleResolution: ts.ModuleResolutionKind.NodeJs,
//     // module: ts.ModuleKind.CommonJS,
//     // outDir: "./.tmp",
//     outFile: "./out.js",
//     removeComments: true,
//     importHelpers: true,
//     strict: false,
//     alwaysStrict: false,
//     noImplicitUseStrict: false,
//     declaration: false,
//     sourceMap: false,
//     isolatedModules: false,
// });

const formatAsBookmarklet: (code: string) => string = (code: string) =>
  "javascript:" +
  encodeURIComponent("(function(){" + cleanCode(code)) +
  "})();";
