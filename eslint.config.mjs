import tsEslint from "typescript-eslint";
import htmlEslint from "@html-eslint/eslint-plugin";
import parser from "@html-eslint/parser";

import { default as pw_config } from "eslint-plugin-playwright";
import eslint from "@eslint/js";

export default tsEslint.config(
  eslint.configs.recommended,
  tsEslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.ts", "**/*.mjs"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.spec.json", "./tsconfig.web.json"],
      },
    },
  },
  // eslintConfigPrettier,
  // {
  //
  //   // plugins: {
  //   //   "@typescript-eslint": typescriptEslint
  //   // },
  //
  //   languageOptions: {
  //     globals: {
  //       ...globals.browser
  //     },
  //
  //     ecmaVersion: "latest",
  //     sourceType: "module",
  //
  //     parserOptions: {
  //       project: ["./tsconfig.node.json", "./tsconfig.spec.json", "./tsconfig.web.json"]
  //     }
  //   },
  //
  //   rules: {
  //     "no-var": "error",
  //     "prefer-const": "error"
  //   }
  // },
  // {
  //   files: ["**/*.ts"],
  //   // extends: compat.extends(
  //   //   "plugin:@typescript-eslint/recommended",
  //   //   "eslint-config-prettier"
  //   // ),
  //   // ...tseeslint.def.configs.recommendedTypeChecked,
  //   ...tsEslintConfigs.recommendedTypeChecked,
  //   // languageOptions: {
  //   //   parser: tsParser,
  //   //   ecmaVersion: 5,
  //   //   sourceType: "script",
  //   //   parserOptions: {
  //   //     project: ["./tsconfig.node.json", "./tsconfig.spec.json", "./tsconfig.web.json"]
  //   //   }
  //   // },
  //   // rules: {
  //   //   "@typescript-eslint/strict-boolean-expressions": "off",
  //   //   "@typescript-eslint/no-unused-vars": "warn",
  //   //   "@typescript-eslint/non-nullable-type-assertion-style": "off",
  //   //   "@typescript-eslint/naming-convention": "off"
  //   // }
  // },
  {
    files: ["**/*.test.ts"],
    ...pw_config.configs["flat/recommended"],
  },
  {
    ...htmlEslint.configs["flat/recommended"],
    files: ["**/*.html"],

    languageOptions: {
      parserOptions: {
        project: tsEslint.parser,
      },
      parser: parser,
    },
    extends: [tsEslint.configs.disableTypeChecked],
  },
  {
    ignores: ["node_modules", "dist", "_site", "test-results", ".tmp", ".parcel-cache/", ".vscode/", ".idea/"],
  },
);
