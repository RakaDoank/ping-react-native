import * as EslintCompat from "@eslint/compat"
import EslintJs from "@eslint/js"

import ReactNativeEslintConfig from "@react-native/eslint-config"

import StylisticJs from "@stylistic/eslint-plugin"

import * as EslintConfig from "eslint/config"

import * as EslintImportResolverTypeScript from "eslint-import-resolver-typescript"

import * as EslintPluginImportX from "eslint-plugin-import-x"

import EslintPluginReact from "eslint-plugin-react"

import * as EslintPluginReactHooks from "eslint-plugin-react-hooks"

import EslintPluginReactNative from "eslint-plugin-react-native"

import Globals from "globals"

import * as TypeScriptEslint from "typescript-eslint"

export default EslintConfig.defineConfig([

	EslintConfig.globalIgnores([
		"**/.expo/",
		"./examples/*/expo-env.d.ts",

		// We have to exclude macOS project, because they are not in PNPM workspaces (monorepo)
		// you can remove this ignore temporarily to test `examples/macOS` lint
		"./examples/macos/",

		"**/node_modules/",
		"package/lib",
		"**/android/",
		"**/ios/",
		"**/apple/",
		"**/.bundle/",
	]),

	EslintJs.configs.recommended,

	EslintPluginImportX.importX.flatConfigs.recommended,
	EslintPluginImportX.importX.flatConfigs.typescript,

	{
		rules: {
			"consistent-return": "error",
			"eol-last": "error",
			"semi": "off",
			"yoda": "error",

			"import-x/first": "error",
			"import-x/newline-after-import": [
				"error",
				{
					"count": 1,
					"considerComments": true,
				},
			],
			"import-x/no-cycle": "error",
			"import-x/order": [
				"error",
				{
					"alphabetize": {
						"order": "asc",
					},
					/**
					 * I want to distinct module import, not only the group
					 * Ommitting this prop is not force me to put new empty line each import tho
					 */
					// 'consolidateIslands': 'inside-groups',
					"distinctGroup": false,
					"newlines-between": "always-and-inside-groups",
					"named": {
						"enabled": true,
						"cjsExports": true,
						"export": true,
						"import": true,
						"require": true,
						"types": "types-last",
					},
					"groups": [
						"builtin",
						"external",
						"internal",
						"parent",
						"sibling",
						"index",
					],
					"pathGroups": [
						{
							"pattern": "react",
							"group": "builtin",
							"position": "after",
						},
						{
							"pattern": "react-native",
							"group": "builtin",
							"position": "after",
						},
						{
							"pattern": "expo*",
							"group": "builtin",
							"position": "after",
						},
					],
					"pathGroupsExcludedImportTypes": [
						"builtin",
					],
					"warnOnUnassignedImports": true,
				},
			],
		},
	},

	{
		plugins: {
			"@stylistic": StylisticJs,
		},
		rules: {
			"@stylistic/block-spacing": "error",
			"@stylistic/brace-style": [
				"error",
				"1tbs",
			],
			"@stylistic/comma-dangle": [
				"warn",
				"always-multiline",
			],
			"@stylistic/comma-spacing": ["error", {
				"before": false,
				"after": true,
			}],
			"@stylistic/function-call-spacing": [
				"error",
				"never",
			],
			"@stylistic/indent": ["warn", "tab"],
			"@stylistic/key-spacing": [
				"error",
				{
					"beforeColon": false,
				},
			],
			"@stylistic/jsx-curly-spacing": [
				"warn",
				{
					"when": "always",
					"spacing": {
						"objectLiterals": "never",
					},
				},
			],
			"@stylistic/jsx-equals-spacing": [
				"error",
				"never",
			],
			"@stylistic/jsx-max-props-per-line": [
				"warn",
				{
					"maximum": 2,
				},
			],
			"@stylistic/keyword-spacing": [
				"error",
				{
					"overrides": {
						"if": {
							"after": false,
						},
						"for": {
							"after": false,
						},
						"catch": {
							"after": false,
							"before": true,
						},
					},
				},
			],
			"@stylistic/no-mixed-operators": [
				"error",
				{
					"groups": [
						["&", "|", "^", "~", "<<", ">>", ">>>"],
						["==", "!=", "===", "!==", ">", ">=", "<", "<="],
						["&&", "||"],
						["in", "instanceof"],
					],
					"allowSamePrecedence": false,
				},
			],
			"@stylistic/no-multiple-empty-lines": [
				"error",
				{
					"max": 2,
					"maxEOF": 1,
					"maxBOF": 0,
				},
			],
			"@stylistic/no-trailing-spaces": [
				"warn",
				{
					"ignoreComments": true,
				},
			],
			"@stylistic/object-curly-newline": [
				"error",
				{
					"ObjectExpression": {
						"multiline": true,
						"consistent": true,
					},
					"ObjectPattern": {
						"multiline": true,
						"consistent": true,
					},
					"ExportDeclaration": "always",
					"ImportDeclaration": "always",
					"TSTypeLiteral": "always",
					"TSInterfaceBody": "always",
					"TSEnumBody": "always",
				},
			],
			"@stylistic/object-curly-spacing": [
				"warn",
				"always",
			],
			"@stylistic/semi": "off",
			"@stylistic/semi-spacing": [
				"error",
				{
					"before": false,
					"after": true,
				},
			],
			"@stylistic/space-before-blocks": "warn",
			"@stylistic/space-before-function-paren": [
				"error",
				{
					"anonymous": "never",
					"asyncArrow": "always", // valid: async () => {} | error: async() => {}
					"named": "never",
					"catch": "never",
				},
			],
			"@stylistic/space-infix-ops": [
				"error",
				{
					"int32Hint": true,
				},
			],
			"@stylistic/spaced-comment": [
				"warn",
				"always",
			],
			"@stylistic/quotes": [
				"error",
				"double",
				{
					"allowTemplateLiterals": "always",
				},
			],
		},
	},

	...TypeScriptEslint.configs.recommendedTypeChecked.map(conf => ({
		...conf,
		files: ["**/*.ts", "**/*.tsx", "**/*.mts"],
	})),
	{
		files: [
			"**/*.ts",
			"**/*.tsx",
			"**/*.mts",
		],
		rules: {
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-require-imports": "off",
		},
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		settings: {
			"import-x/resolver-next": [
				EslintImportResolverTypeScript.createTypeScriptImportResolver({
					project: "./tsconfig.json",
					// override default https://github.com/import-js/eslint-import-resolver-typescript?tab=readme-ov-file#extensions
					alwaysTryTypes: true,
					extensions: [
						".ts",
						".tsx",
						".d.ts",
						".js",
						".jsx",
						".json",
						".node",
						".ios.ts", ".ios.tsx",
						".android.ts", ".android.tsx",
						".macos.ts", ".macos.tsx",
						".windows.ts", ".windows.tsx",
						".native.ts", ".native.tsx",
						".web.ts", ".web.tsx",
					],
				}),
			],
		},
	},

	{
		// React Native files

		files: [
			"./examples/*/src/**/*.{ts,tsx}",
			"./package/src/**/*.{ts,tsx}",
		],
		settings: {
			react: {
				version: "detect",
			},
		},
		plugins: {
			...EslintPluginReact.configs.flat["jsx-runtime"].plugins,
			"react-hooks": EslintCompat.fixupPluginRules(EslintPluginReactHooks),
			"react-native": EslintCompat.fixupPluginRules(EslintPluginReactNative),
		},
		languageOptions: {
			...EslintPluginReact.configs.flat["jsx-runtime"].languageOptions,
			globals: {
				...ReactNativeEslintConfig.globals,
			},
		},
		rules: {
			...EslintPluginReact.configs.flat.recommended.rules,
			...EslintPluginReact.configs.flat["jsx-runtime"].rules,
			// eslint-disable-next-line import-x/namespace
			...EslintPluginReactHooks.configs.recommended.rules,

			/**
			 * Take rules from @react-native/eslint-config (not all of it) that doesn"t included in eslint-plugin-react & eslint-plugin-react-hooks recommended rules
			 * https://github.com/facebook/react-native/blob/22e7691473a0e895385e03743186aaa32add6731/packages/eslint-config-react-native/index.js#L301
			 */
			"react/display-name": "off",
			"react/jsx-boolean-value": "off",
			"react/no-did-mount-set-state": "warn",
			"react/no-did-update-set-state": "warn",
			"react/no-unstable-nested-components": "warn",
			"react-native/no-inline-styles": "warn",
		},
	},

	{
		files: [
			"./examples/*/*.{js,mjs,ts}",
			"./package-builder/**/*.{js,mjs}",
			"./scripts/**/*.{js,mjs}",
		],
		languageOptions: {
			globals: Globals.node,
		},
	},

])
