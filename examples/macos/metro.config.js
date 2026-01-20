const
	node_path =
		require("node:path"),

	{ getDefaultConfig, mergeConfig } =
		require("@react-native/metro-config")

const
	workspacePath =
		node_path.join(__dirname, "..", "..")

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {

	projectRoot: __dirname,

	resolver: {
		nodeModulesPaths: [
			node_path.join(__dirname, "node_modules"),
			node_path.join(workspacePath, "node_modules"),
		],
	},

	watchFolders: [
		workspacePath,
	],

}

module.exports = mergeConfig(
	getDefaultConfig(__dirname),
	config,
);
