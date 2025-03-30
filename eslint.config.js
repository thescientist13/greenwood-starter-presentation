import js from "@eslint/js";
import globals from "globals";

export default [
  {
    // https://github.com/eslint/eslint/discussions/18304#discussioncomment-9069706
    ignores: [
      ".greenwood/*",
      "node_modules/*",
      "public/*",
      "reports/*",
      "storybook-static/**",
      "patches/**",
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.mocha,
        ...globals.chai,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      // turn this off for Prettier
      "no-irregular-whitespace": "off"
    },
  },
];