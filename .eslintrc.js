module.exports = {
    extends: [
        '@apify'
    ],
    env: {
        node: true,
        es6: true
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    ignorePatterns: ["*.test.ts"],
    rules: {
        "quotes": 0,
    },
}
