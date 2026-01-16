import * as EslintCompat from '@eslint/compat'
import EslintJs from '@eslint/js'

import ReactNativeEslintConfig from '@react-native/eslint-config'

import StylisticJs from '@stylistic/eslint-plugin'

import * as EslintImportResolverTypeScript from 'eslint-import-resolver-typescript'

import * as EslintPluginImportX from 'eslint-plugin-import-x'

import ReactEslintPlugin from 'eslint-plugin-react'

import ReactHooksEslintPlugin from 'eslint-plugin-react-hooks'

import ReactNativeEslintPlugin from 'eslint-plugin-react-native'

import Globals from 'globals'

import * as TypeScriptEslint from 'typescript-eslint'

export default [

	{
		ignores: [
			'**/node_modules/',
			'package/lib',
			'**/android/',
			'**/ios/',
			'**/apple/',
			'**/.bundle/',
		],
	},

	EslintJs.configs.recommended,

	EslintPluginImportX.importX.flatConfigs.recommended,
	EslintPluginImportX.importX.flatConfigs.typescript,

	{
		rules: {
			'consistent-return': 'error',
			'eol-last': 'error',
			'semi': 'off',
			'yoda': 'error',

			'import-x/first': 'error',
			'import-x/newline-after-import': [
				'error',
				{
					'count': 1,
					'considerComments': true,
				},
			],
			'import-x/no-cycle': 'error',
			'import-x/order': [
				'error',
				{
					'alphabetize': {
						'order': 'asc',
					},
					/**
					 * I want to distinct module import, not only the group
					 * Ommitting this prop is not force me to put new empty line each import tho
					 */
					// 'consolidateIslands': 'inside-groups',
					'distinctGroup': false,
					'newlines-between': 'always-and-inside-groups',
					'named': {
						'enabled': true,
						'cjsExports': true,
						'export': true,
						'import': true,
						'require': true,
						'types': 'types-last',
					},
					'groups': [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
					'pathGroups': [
						{
							'pattern': 'react',
							'group': 'builtin',
							'position': 'after',
						},
						{
							'pattern': 'react-native',
							'group': 'builtin',
							'position': 'after',
						},
						{
							'pattern': '@storybook/**',
							'group': 'builtin',
							'position': 'after',
						},
					],
					'pathGroupsExcludedImportTypes': [
						'builtin',
					],
					'warnOnUnassignedImports': true,
				},
			],
		},
	},

	{
		plugins: {
			'@stylistic': StylisticJs,
		},
		rules: {
			'@stylistic/block-spacing': 'error',
			'@stylistic/brace-style': [
				'error',
				'1tbs',
			],
			'@stylistic/comma-dangle': [
				'warn',
				'always-multiline',
			],
			'@stylistic/comma-spacing': ['error', {
				'before': false,
				'after': true,
			}],
			'@stylistic/function-call-spacing': [
				'error',
				'never',
			],
			'@stylistic/indent': ['warn', 'tab'],
			'@stylistic/key-spacing': [
				'error',
				{
					'beforeColon': false,
				},
			],
			'@stylistic/jsx-curly-spacing': [
				'warn',
				{
					'when': 'always',
					'spacing': {
						'objectLiterals': 'never',
					},
				},
			],
			'@stylistic/jsx-equals-spacing': [
				'error',
				'never',
			],
			'@stylistic/jsx-max-props-per-line': [
				'warn',
				{
					'maximum': 2,
				},
			],
			'@stylistic/keyword-spacing': [
				'error',
				{
					'overrides': {
						'if': {
							'after': false,
						},
						'for': {
							'after': false,
						},
						'catch': {
							'after': false,
							'before': true,
						},
					},
				},
			],
			'@stylistic/no-mixed-operators': [
				'error',
				{
					'groups': [
						['&', '|', '^', '~', '<<', '>>', '>>>'],
						['==', '!=', '===', '!==', '>', '>=', '<', '<='],
						['&&', '||'],
						['in', 'instanceof'],
					],
					'allowSamePrecedence': false,
				},
			],
			'@stylistic/no-multiple-empty-lines': [
				'error',
				{
					'max': 2,
					'maxEOF': 1,
					'maxBOF': 0,
				},
			],
			'@stylistic/no-trailing-spaces': [
				'warn',
				{
					'ignoreComments': true,
				},
			],
			'@stylistic/object-curly-newline': [
				'error',
				{
					'ObjectExpression': {
						'multiline': true,
						'consistent': true,
					},
					'ObjectPattern': {
						'multiline': true,
						'consistent': true,
					},
					'ExportDeclaration': 'always',
					'ImportDeclaration': 'always',
					'TSTypeLiteral': 'always',
					'TSInterfaceBody': 'always',
					'TSEnumBody': 'always',
				},
			],
			'@stylistic/object-curly-spacing': [
				'warn',
				'always',
			],
			'@stylistic/semi': 'off',
			'@stylistic/semi-spacing': [
				'error',
				{
					'before': false,
					'after': true,
				},
			],
			'@stylistic/space-before-blocks': 'warn',
			'@stylistic/space-before-function-paren': [
				'error',
				{
					'anonymous': 'never',
					'asyncArrow': 'always', // valid: async () => {} | error: async() => {}
					'named': 'never',
					"catch": "never",
				},
			],
			'@stylistic/space-infix-ops': [
				'error',
				{
					'int32Hint': true,
				},
			],
			'@stylistic/spaced-comment': [
				'warn',
				'always',
			],
		},
	},

	...TypeScriptEslint.configs.recommendedTypeChecked.map(conf => ({
		...conf,
		files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
	})),
	{
		files: [
			'**/*.ts',
			'**/*.tsx',
			'**/*.mts',
		],
		rules: {
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
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
			'./example/src/**/*.{js,jsx,ts,tsx}',
			'./package/src/**/*.{js,jsx,ts,tsx}',
		],
		ignores: [
			'node_modules/react-native/Libraries/Types/CodegenTypes.js',
		],
		settings: {
			react: {
				version: 'detect',
			},
		},
		plugins: {
			...ReactEslintPlugin.configs.flat['jsx-runtime'].plugins,
			'react-hooks': EslintCompat.fixupPluginRules(ReactHooksEslintPlugin),
			'react-native': EslintCompat.fixupPluginRules(ReactNativeEslintPlugin),
		},
		languageOptions: {
			...ReactEslintPlugin.configs.flat['jsx-runtime'].languageOptions,
			globals: {
				...ReactNativeEslintConfig.globals,
			},
		},
		rules: {
			...ReactEslintPlugin.configs.flat.recommended.rules,
			...ReactEslintPlugin.configs.flat['jsx-runtime'].rules,
			...ReactHooksEslintPlugin.configs.recommended.rules,

			/**
			 * Take rules from @react-native/eslint-config (not all of it) that doesn't included in eslint-plugin-react & eslint-plugin-react-hooks recommended rules
			 * https://github.com/facebook/react-native/blob/22e7691473a0e895385e03743186aaa32add6731/packages/eslint-config-react-native/index.js#L301
			 */
			'react/display-name': 'off',
			'react/jsx-boolean-value': 'off',
			'react/no-did-mount-set-state': 'warn',
			'react/no-did-update-set-state': 'warn',
			'react/no-unstable-nested-components': 'warn',
			'react-native/no-inline-styles': 'warn',
		},
	},

	{
		files: [
			'example/**/*.{js,mjs}',
			'builder-bob/**/*.{js,mjs}',
			'scripts/**/*.{js,mjs}',
		],
		languageOptions: {
			globals: Globals.node,
		},
	},

	{
		files: [
			'./example/**/*.{ts,tsx}',
		],
		settings: {
			'import-x/resolver-next': [
				EslintImportResolverTypeScript.createTypeScriptImportResolver({
					alwaysTryTypes: true,
					project: './example/tsconfig.json',
				}),
			],
		},
	},

	{
		files: [
			'./package/**/*.{ts,tsx}',
		],
		settings: {
			'import-x/resolver-next': [
				EslintImportResolverTypeScript.createTypeScriptImportResolver({
					alwaysTryTypes: true,
					project: './package/tsconfig.json',
				}),
			],
		},
	},

]
