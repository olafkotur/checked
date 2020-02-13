module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended'],
    parserOptions: {
        ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',  // Allows for the use of imports
    },
    env: {
        es6: true,
        browser: true,
        node: true,
        jest: true,
    },
    rules: {
        "no-const-assign": 2,
        "no-this-before-super": 2,
        "no-undef": 2,
        "no-unreachable": 2,
        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "constructor-super": 2,
        "valid-typeof": 2,
        "@typescript-eslint/semi": [
            2,
            "always"
        ],
        "@typescript-eslint/interface-name-prefix": 0
    },
    settings: {
        react: {
            version: 'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
}