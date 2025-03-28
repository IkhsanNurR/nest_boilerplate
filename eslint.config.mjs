// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs',
      'src/common/env/env.config.ts',
      'src/common/response/response.interceptor.ts',
      'src/**/*.controller.ts',
      'src/common/logger/logging.interceptor.ts',
      'src/common/logger/winston_logger.ts',
      'src/common/response/auto_status_response.interceptor.ts',
      'src/common/response/response.type.ts',
      'src/config/socket/index.ts',
      'src/config/socket/socket_client.ts',
      'src/main.ts',
      'src/common/middlewares/ip.middlewares.ts',
      'src/config/database/postgresql/index.ts',
     ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {    
    plugins: { "@stylistic/ts": stylisticTs },
    rules: {
      'prettier/prettier': ['error'], 
      eqeqeq: ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      'no-useless-catch': 'off',
      'no-extra-boolean-cast': 'off',
      'no-async-promise-executor': 'off',
      'no-duplicate-imports': 'error',
      'no-label-var': 'error',
      'no-lone-blocks': 'error',
      'no-return-assign': 'error',
      'no-undef-init': 'error',
      'no-useless-rename': 'error',
      '@typescript-eslint/require-await' : 'off',
      yoda: 'error',
      "@stylistic/ts/space-infix-ops": ["error", { int32Hint: true }],
      "@stylistic/ts/comma-spacing": ["error", { before: false, after: true }],
      "@stylistic/ts/keyword-spacing": ["error", { before: true, after: true }],
      "@stylistic/ts/brace-style": ["error", "1tbs", { allowSingleLine: true }],
    },
  },
);