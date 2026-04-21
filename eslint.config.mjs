import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    ...nextVitals,
    ...nextTs,
    prettier,
    globalIgnores(['node_modules', 'dist', '.next', 'next-env.d.ts']),
    {
        rules: {
            'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'prefer-destructuring': ['error', { AssignmentExpression: { array: false } }],
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
        },
    },
    {
        files: ['*.config.js', '*.config.cjs'],
        languageOptions: {
            globals: { require: 'readonly', module: 'readonly', __dirname: 'readonly' },
        },
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
]);
