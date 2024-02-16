import js from "@eslint/js";
import globals from "globals";
import react from 'eslint-plugin-react';
import tslint from "typescript-eslint";


// Begin fix see: https://stackoverflow.com/questions/76707089/eslint-plugin-react-breaking-typeerror-key-plugins-key-0-expected-an-obj#76713553
react.configs.recommended.plugins = { react }
react.configs.recommended.languageOptions = {
    parserOptions: react.configs.recommended.parserOptions
}
delete react.configs.recommended.parserOptions
// End fix

export default [
    js.configs.recommended,
    react.configs.recommended,
    ...tslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...tslint.configs.disableTypeChecked,
        settings: {
            react: {
                version: "detect",
            },
        },
        languageOptions: {
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: "module",
                babelOptions: {
                    parserOpts: {
                        plugins: ["jsx"]
                    }
                }
            },
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.jest,
                ...globals.node,
            },
        },
        plugins: {
            react: react,
        },
        rules: {
            "no-const-assign": "warn",
            "no-this-before-super": "warn",
            "no-undef": "warn",
            "no-unreachable": "warn",
            "no-unused-vars": "off",
            "constructor-super": "warn",
            "valid-typeof": "warn",
            "react/display-name": "off",
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
        }
    }
];