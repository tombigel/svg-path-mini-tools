import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    // Define ignored files
    ignores: ["dist/", "node_modules/", "coverage/", "*.cjs"],
  },
  {
    // Define global environments
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
  },
  // Base ESLint recommended rules
  pluginJs.configs.recommended,
  // TypeScript recommended/strict rules
  ...tseslint.configs.strict,
  // Optional: Stylistic rules (keep or remove? Keeping for now)
  ...tseslint.configs.stylistic,
  {
    // Custom rule adjustments
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_', 'caughtErrorsIgnorePattern': '^_' }
      ],
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
];
