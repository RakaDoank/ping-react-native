const
	node_path =
		require("node:path"),

	{
		mergeConfig,
	} =
		require("@expo/metro/metro-config"),

	{
		getDefaultConfig,
	} =
		require("expo/metro-config")

const
	workspacePath =
		node_path.resolve(__dirname, "..", ".."),

	defaultConfig =
		getDefaultConfig(__dirname)

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@expo/metro-config').MetroConfig}
 */
const config = {

	projectRoot: __dirname,

	resolver: {
		...defaultConfig.resolver,
		assetExts: [
			...(defaultConfig.resolver?.assetExts.filter(ext => ext !== "svg") ?? []),
		],
		extraNodeModules: {
			...defaultConfig.resolver?.extraNodeModules,
			"ping-react-native": node_path.join(workspacePath, "package", "src"),
		},
		sourceExts: [
			...(defaultConfig.resolver?.sourceExts ?? []),
			"svg",
		],
	},

	transformer: {
		...defaultConfig.transformer,
		babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
	},

}

module.exports = mergeConfig(defaultConfig, config)
