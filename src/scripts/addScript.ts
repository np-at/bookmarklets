#!/usr/bin/env node
import { join, relative, resolve } from "node:path";
import { existsSync, constants } from "fs";
import { writeFile, readFile } from "fs/promises";
import inquirer from "inquirer";

const repoHome = resolve(join(__dirname, "..", ".."));
const srcDir = join(repoHome, "src");
const bookmarkletSrcDir = join(srcDir, "marklets");
const scriptSrcDir = join(srcDir, "scripts");

const webScript = join(scriptSrcDir, "web.ts");

(async () => {
  const answer = await inquirer.prompt({
    name: "newScriptName",
    type: "input",
    message: "What is the name of the script?",
  });
  const newScriptName = answer.newScriptName as string;
  if (!newScriptName?.trim()) {
    console.log("No name provided, exiting...");
    process.exit(1);
  }
  const newScriptPath = join(bookmarkletSrcDir, `${newScriptName.trim()}.ts`);
  if (existsSync(newScriptPath)) {
    console.log(`File ${newScriptPath} already exists, exiting...`);
    process.exit(1);
  }
  const newScript = `// Path: ${relative(repoHome, newScriptPath)}\n`;
  await writeFile(newScriptPath, newScript);
  console.log(`Created ${newScriptPath}`);
  const webScriptImportStmt = `const ${newScriptName.trim()} = fs.readFileSync(
        join(__dirname, "../../dist", "${newScriptName.trim()}.js"),
        "utf-8"
    )\n`;
  const webScriptMakeLinkStmt = `makeLink(${newScriptName.trim()}, "${newScriptName.trim()}");\n`;

  const webScriptContents = await readFile(webScript, {
    encoding: "utf-8",
  });
  const webScriptContentsWithImport = webScriptContents.replace(
    "// START: import scripts",
    `// START: import scripts\n${webScriptImportStmt}`,
  );
  const webScriptContentsWithMakeLink = webScriptContentsWithImport.replace(
    "// START: add links",
    `// START: add links\n${webScriptMakeLinkStmt}`,
  );
  await writeFile(webScript, webScriptContentsWithMakeLink, {
    encoding: "utf-8",
    flag: constants.O_TRUNC | constants.O_WRONLY,
  });
  console.log(`Updated ${webScript}`);
})()
  .then(() => {
    console.log("Done!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
