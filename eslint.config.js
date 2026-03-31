import js from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";
import nextPlugin from "@next/eslint-plugin-next";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: [
      ".next",
      "node_modules",
      "out",
      "build",
      ".git",
      "dist",
      ".env",
      ".env.development",
      ".env.production",
    ],
  },
  // Config for JavaScript files
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        clearInterval: "readonly",
        clearTimeout: "readonly",
        global: "readonly",
        setInterval: "readonly",
        setTimeout: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  // Config for Node.js/CommonJS files
  {
    files: ["jest.config.js", "commitlint.config.js", "infra/scripts/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
  },
  // Config for Node.js migration files (ESM)
  {
    files: ["infra/migrations/**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        console: "readonly",
      },
    },
  },
  // Config for Jest test files
  {
    files: ["tests/**/*.js", "**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        fetch: "readonly",
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },
  // Config for Next.js pages
  {
    files: ["pages/**/*.js", "pages/**/*.jsx"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  // Prettier config (should be last to override other rules)
  prettierConfig,
];
