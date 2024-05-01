module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
    es2020: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:react/jsx-runtime",
    "plugin:flowtype/recommended",
  ],
  parser: "@babel/eslint-parser",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  plugins: ["flowtype", "react-hooks"],
  rules: {
    quotes: "off",
    // best practices
    "class-methods-use-this": "off", // Allow class methods to not use this
    "no-param-reassign": "off", // Changed the parameter directly TODO: Enable?

    // errors
    "no-constant-binary-expression": "error", // Prevent constant expressions in conditions

    // es6
    "no-duplicate-imports": "error", // Prevent duplicate imports
    "sort-imports": ["error", { ignoreDeclarationSort: true }], // Enforce import sorting

    // imports
    "import/exports-last": "error", // Enforce export statements to be last

    // style
    "brace-style": ["error", "stroustrup", { allowSingleLine: true }], // Allow if/else in single line
    "max-len": "off", // Max Line Length TODO: Enable?
    "no-nested-ternary": "off", // Allow nested ternary TODO: Enable?
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }], // Allow i++ in loops

    // react
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ], // Enforce arrow function for functional components
    "react/hook-use-state": "error", // Enforce useState hook
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }], // Support for JSX in JS ( in index.js )
    "react/jsx-no-leaked-render": "error", // Prevent problematic leaked values from being rendered
    "react/jsx-sort-default-props": "off", // Enforce default props alphabetical sorting
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: false,
        shorthandLast: true,
        multiline: "last",
        ignoreCase: true,
        noSortAlphabetically: false,
      },
    ], // Enforce props alphabetical sorting
    "react/prop-types": "error", // Enforce prop types
    "react/sort-prop-types": "off", // Enforce props alphabetical sorting
    "default-param-last": "error", // Allow default params to be last
  },
};
