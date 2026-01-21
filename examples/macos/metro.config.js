const
	node_path =
		require("node:path"),

	{ getDefaultConfig, mergeConfig } =
		require("@react-native/metro-config")

const
	workspacePath =
		node_path.join(__dirname, "..", ".."),

	defaultConfig =
		getDefaultConfig(__dirname)

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {

	projectRoot: __dirname,

	resolver: {
		...defaultConfig.resolver,
		assetExts: [
			...(defaultConfig.resolver?.assetExts?.filter(ext => ext !== "svg") ?? []),
		],
		extraNodeModules: {
			...defaultConfig.resolver?.extraNodeModules,
			"ping-react-native": node_path.join(workspacePath, "package", "src"),
		},
		nodeModulesPaths: [
			...defaultConfig.resolver?.nodeModulesPaths ?? [],
			node_path.join(__dirname, "node_modules"),
			node_path.join(workspacePath, "node_modules"),
		],
		sourceExts: [
			...(defaultConfig.resolver?.sourceExts ?? []),
			"svg",
		],
	},

	transformer: {
		...defaultConfig.transformer,
		babelTransformerPath: require.resolve("react-native-svg-transformer/react-native"),
	},

	watchFolders: [
		workspacePath,
	],

}

module.exports = mergeConfig(defaultConfig, config)
