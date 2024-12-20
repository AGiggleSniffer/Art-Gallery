import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginRefresh from "eslint-plugin-react-refresh";
import pluginHooks from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ ignores: ["dist", "node_modules"] },
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		settings: {
			react: {
				version: "detect",
			},
		},
		languageOptions: {
			globals: globals.browser,
		},
	},
	pluginJs.configs.recommended,
	pluginRefresh.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat["jsx-runtime"],
	{
		plugins: {
			"react-hooks": pluginHooks,
		},
		rules: {
			"react/prop-types": "off",
			...pluginHooks.configs.recommended.rules,
		},
	},
];
