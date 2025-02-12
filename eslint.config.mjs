import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ['server.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
];

export default eslintConfig;
