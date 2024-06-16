import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    ignores: ["**/dist/*"]
  },
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "no-console": "error"
    }
  },
  ...tseslint.configs.recommended
];
