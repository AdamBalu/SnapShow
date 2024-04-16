/** @type {import("eslint").Linter.Config} */
module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'next/core-web-vitals',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: { jsx: true },
		project: './tsconfig.json',
		sourceType: 'module',
		ecmaVersion: 'latest'
	},
	ignorePatterns: [
		'.eslintrc.cjs',
		'tailwind.config.cjs',
		'postcss.config.js',
		'next.config.mjs',
		'/**/*.md',
		'/**/*.html'
	],
	plugins: [
		'import',
		'react',
		'@typescript-eslint',
		'eslint-plugin-prefer-arrow',
		'jsx-a11y',
		'prettier'
	],
	rules: {
		// Turn off prettier related
		'indent': 'off',
		'quotes': 'off',
		'linebreak-style': 'off',
		'semi': 'off',
		// General
		'no-template-curly-in-string': ['error'],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'no-var': 'error',
		'no-useless-rename': 'error',
		'object-shorthand': ['error', 'always'],
		'comma-dangle': ['error', 'never'],
		'arrow-body-style': ['error', 'as-needed'],
		'eqeqeq': ['error', 'always'],
		'dot-notation': 'error',
		'prefer-arrow-callback': 'error',
		'prefer-const': 'error',
		'prefer-template': 'error',
		'prefer-arrow/prefer-arrow-functions': 'error',
		// React
		'react/function-component-definition': [
			'error',
			{ namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' }
		],
		'react/react-in-jsx-scope': 'off',
		'react/self-closing-comp': 'error',
		'react/jsx-boolean-value': ['error', 'never'],
		'react/jsx-curly-brace-presence': ['error', 'never'],
		'react/jsx-curly-spacing': ['error', 'never'],
		'react/jsx-equals-spacing': ['error', 'never'],
		'react/jsx-fragments': ['error', 'syntax'],
		'react/jsx-no-useless-fragment': 'error',
		'react/display-name': 'off',
		// Typescript
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/prefer-optional-chain': 'error',
		'@typescript-eslint/prefer-nullish-coalescing': 'error',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ args: 'all', argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
		],
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{ prefer: 'type-imports', fixStyle: 'inline-type-imports' }
		],
		// Import
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				'groups': [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index'
				]
			}
		]
	},
	settings: {
		// Fix react version detection
		'react': { version: 'detect' },
		// Set src folder path
		'import/resolver': {
			node: { paths: 'src' },
			typescript: {
				extensionAlias: {
					'.js': ['.ts', '.tsx', '.d.ts', '.js'],
					'.jsx': ['.tsx', '.d.ts', '.jsx'],
					'.cjs': ['.cts', '.d.cts', '.cjs'],
					'.mjs': ['.mts', '.d.mts', '.mjs']
				}
			}
		}
	},
	overrides: [
		// Disable prop-types errors clashing with typescript options
		{
			files: ['**/*.tsx'],
			rules: { 'react/prop-types': 'off' }
		}
	]
};
