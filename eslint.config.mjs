import EslintJs from '@eslint/js'
import {
	fixupPluginRules,
} from '@eslint/compat'
import StylisticJs from '@stylistic/eslint-plugin'
import TsEslint from 'typescript-eslint'

import ReactNativeEslintConfig from '@react-native/eslint-config'
import ReactNativeEslintPlugin from 'eslint-plugin-react-native'
import ReactEslintPlugin from 'eslint-plugin-react'
import ReactHooksEslintPlugin from 'eslint-plugin-react-hooks'

import Globals from 'globals'

export default [

	{
		ignores: [
			'**/node_modules/',
			'package/lib',
		],
	},

	EslintJs.configs.recommended,

	{
		plugins: {
			'@stylistic': StylisticJs,
		},
		rules: {
			'consistent-return': 'error',
			'eol-last': 'error',
			'semi': 'off',
			'yoda': 'error',

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
					'named': 'never',
					'asyncArrow': 'always', // valid: async () => {} | error: async() => {}
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

	...TsEslint.configs.recommendedTypeChecked.map(conf => ({
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
	},

	{
		// React Native files

		files: [
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
			'react-hooks': fixupPluginRules(ReactHooksEslintPlugin),
			'react-native': fixupPluginRules(ReactNativeEslintPlugin),
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
		languageOptions: {
			ecmaVersion: 2020,
			parserOptions: {
				project: [
					'./example/tsconfig.json',
					'./package/tsconfig.json',
				],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},

]
