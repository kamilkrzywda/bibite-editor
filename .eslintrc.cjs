// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        indent: ['error', 4],
        // 'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/no-unescaped-entities': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
};
