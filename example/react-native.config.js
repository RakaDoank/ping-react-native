const node_path = require('node:path')

/**
 * @see {@link https://github.com/react-native-community/cli/blob/main/docs/configuration.md}
 */
module.exports = {
	dependencies: {
		/**
		 * https://github.com/react-native-community/cli/blob/main/docs/autolinking.md#how-can-i-autolink-a-local-library
		 */
		'ping-react-native': {
			root: node_path.join(__dirname, '../package'),
			platforms: {
				// Codegen script incorrectly fails without this
				// So we explicitly specify the platforms with empty object
				ios: {},
				android: {},
			},
		},
	},
	project: {
		ios: {
			automaticPodsInstallation: false,
		},
		android: {},
	},
}
