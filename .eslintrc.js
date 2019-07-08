module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "airbnb"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
        "react/prop-types": "off",
        "react/sort-comp": "off",
        "jsx-a11y/tabindex-no-positive": "off",
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    }
};