const
	node_path =
		require("node:path"),

	{ makeMetroConfig } =
		require("@rnx-kit/metro-config"),

	MetroSymlinksResolver =
		require("@rnx-kit/metro-resolver-symlinks")

const
	workspaceRoot =
		node_path.join(__dirname, "..", ".."),

	rnxKitMetroConfig =
		makeMetroConfig()

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {

	...rnxKitMetroConfig,

	projectRoot: __dirname,

	resolver: {
		...rnxKitMetroConfig.resolver,
		assetExts: [
			...(rnxKitMetroConfig.resolver?.assetExts?.filter(ext => ext !== "svg") ?? []),
		],
		extraNodeModules: {
			...rnxKitMetroConfig.resolver?.extraNodeModules,
			"ping-react-native": node_path.join(workspaceRoot, "package", "src"),
		},
		// only for monorepo setup
		nodeModulesPaths: [
			...rnxKitMetroConfig.resolver?.nodeModulesPaths ?? [],
			node_path.join(__dirname, "node_modules"),
			node_path.join(workspaceRoot, "node_modules"),
		],
		resolveRequest: MetroSymlinksResolver(),
		sourceExts: [
			...(rnxKitMetroConfig.resolver?.sourceExts ?? []),
			"svg",
		],
	},

	transformer: {
		...rnxKitMetroConfig.transformer,
		babelTransformerPath: require.resolve("react-native-svg-transformer/react-native"),
	},

	// only for monorepo setup
	watchFolders: [
		node_path.join(workspaceRoot, "examples", "shared"),
		node_path.join(workspaceRoot, "package"),
		node_path.join(__dirname, "node_modules"),
		node_path.join(workspaceRoot, "node_modules"),
	],

}

module.exports = config
