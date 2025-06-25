import { FlatCompat } from "@eslint/eslintrc";
import { globalIgnores } from "eslint/config";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  globalIgnores(["src/gen/"]),
];

export default eslintConfig;
