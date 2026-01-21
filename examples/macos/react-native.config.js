const
	node_path =
		require("node:path")

/**
 * @see {@link https://github.com/react-native-community/cli/blob/main/docs/configuration.md}
 * @see {@link https://github.com/react-native-community/cli/blob/main/docs/autolinking.md#how-can-i-autolink-a-local-library}
 */
module.exports = {
	dependencies: {
		"ping-react-native": {
			root: node_path.join(__dirname, "..", "..", "package"),
		},
	},
}
