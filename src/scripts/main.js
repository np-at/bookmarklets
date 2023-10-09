"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_process_1 = require("node:process");
var terser_1 = require("terser");
var fs = require("fs/promises");
var ts_bundler_1 = require("@puresamari/ts-bundler");
var commander_1 = require("commander");
var glob_1 = require("glob");
var node_path_1 = require("node:path");
var repoRoot = (0, node_path_1.join)(__dirname, "..", "..");
var program = new commander_1.Command();
program.version("0.0.1");
// program.option("-d, --debug", "debug mode",undefined, false);
program.option("-o, --output <file>", "output file");
program.option("-i, --input <file>", "input file");
program.option("--no-urlencode", "disable urlencoding of outputted js");
program.option("--no-minify", "disable minification");
program.allowUnknownOption(false).allowExcessArguments(false);
program.parse(node_process_1.argv);
var _a = program.opts(), output = _a.output, input = _a.input, urlencode = _a.urlencode, minify = _a.minify;
var inputFile = input;
var outputFile = output;
// const debug = program.debug;
// const ags = argv.slice(argv.indexOf(__filename) + 1);
function cleanCode(c) {
    return c.trim();
}
var formatAsBookmarklet = function (code) {
    return "javascript:" +
        encodeURIComponent("(function(){" + cleanCode(code)) +
        "})();";
};
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
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var inputFiles, _i, inputFiles_1, input_1, bundler, r, codeOutput, minified, outFile, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, glob_1.glob)(inputFile)];
            case 1:
                inputFiles = _b.sent();
                console.log("input files: ", inputFiles);
                _i = 0, inputFiles_1 = inputFiles;
                _b.label = 2;
            case 2:
                if (!(_i < inputFiles_1.length)) return [3 /*break*/, 10];
                input_1 = inputFiles_1[_i];
                bundler = new ts_bundler_1.TypescriptBundler(input_1, (0, node_path_1.join)(__dirname, "..", "..", "tsconfig.web.json"));
                return [4 /*yield*/, bundler.bundle()];
            case 3:
                r = _b.sent();
                codeOutput = void 0;
                if (!minify) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, terser_1.minify)(r.output, {
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
                    })];
            case 4:
                minified = _b.sent();
                codeOutput = minified.code;
                return [3 /*break*/, 6];
            case 5:
                codeOutput = r.output;
                _b.label = 6;
            case 6:
                outFile = outputFile !== null && outputFile !== void 0 ? outputFile : (0, node_path_1.join)(repoRoot, "dist", (0, node_path_1.basename)(input_1, ".ts") + ".js");
                console.log("writing to: ", outFile);
                _a = codeOutput;
                if (!_a) return [3 /*break*/, 8];
                return [4 /*yield*/, fs.writeFile(outFile, urlencode ? formatAsBookmarklet(codeOutput) : codeOutput)];
            case 7:
                _a = (_b.sent());
                _b.label = 8;
            case 8:
                _a;
                _b.label = 9;
            case 9:
                _i++;
                return [3 /*break*/, 2];
            case 10: return [2 /*return*/];
        }
    });
}); })().then(function (_) {
    // console.log(formatAsBookmarklet(value))
    // console.log(value)
}, function (rej) {
    console.warn("rejected: ", rej);
});
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
