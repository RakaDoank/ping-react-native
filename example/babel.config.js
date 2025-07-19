module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./'],
				extensions: [
					'.ts',
					'.tsx',
					'.js',
					'.ios.js',
					'.android.js',
					'.json',
					'.svg',
				],
				alias: {
					'@': './src',
				},
			},
		],
	],
}
