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
	projectRoot =
		__dirname,

	workspaceRoot =
		node_path.resolve(projectRoot, ".."),

	defaultConfig =
		getDefaultConfig(__dirname)

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@expo/metro-config').MetroConfig}
 */
const config = {

	projectRoot,

	resolver: {
		...defaultConfig.resolver,
		assetExts: [
			...defaultConfig.resolver.assetExts.filter(ext => ext !== "svg"),
		],
		extraNodeModules: {
			...defaultConfig.resolver.extraNodeModules,
			"ping-react-native": node_path.join(workspaceRoot, "package", "src"),
		},
		sourceExts: [
			...defaultConfig.resolver.sourceExts ?? [],
			"svg",
		],
	},

	transformer: {
		...defaultConfig.transformer,
		babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
	},

};

module.exports = mergeConfig(defaultConfig, config);
