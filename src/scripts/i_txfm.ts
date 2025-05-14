
import { resolve } from "node:path";
import {createCommand, createArgument} from "commander"
import {argv} from "node:process"
//  function transform(path: string) {
//   const p= resolve(path);
//   let com = createProgram(p , {}, undefined, undefined, []);
//   com.emit(undefined, (fileName, text, writeByteOrderMark, onError, sourceFiles) => {}, undefined, false, {before: []})
//   console.log(com)
// }
function main() {
  const c = createCommand('s');
  const arg = createArgument("path", "path")
  arg.argRequired().argParser(value => {
    return resolve(value)
  })

  c.addArgument(arg);

  const parsed = c.parse(argv)
  console.log(parsed);
}

main();
