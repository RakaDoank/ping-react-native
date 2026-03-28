import type {
	ExpoConfig,
} from "@expo/config"

const
	packageName =
		"com.audira.pingreactnative.example",

	versionCode =
		1,

	versionName =
		"1.0.0"

export default {

	name: "Ping React Native",
	slug: "pingreactnative",

	version: versionName,

	orientation: "default",

	platforms: ["android", "ios"],

	userInterfaceStyle: "automatic",

	android: {
		versionCode: versionCode,
		adaptiveIcon: {
			backgroundColor: "#ffffff",
			foregroundImage: "./assets/android-icon-foreground.png",
			backgroundImage: "./assets/android-icon-background.png",
			monochromeImage: "./assets/android-icon-monochrome.png",
		},
		package: packageName,
	},

	ios: {
		buildNumber: versionCode.toString(),
		supportsTablet: true,
		bundleIdentifier: packageName,
		icon: "./assets/android-icon-foreground.png",
		config: {
			usesNonExemptEncryption: false,
		},
	},

	plugins: [
		[
			"expo-build-properties",
			{
				ios: {
					deploymentTarget: "26.0",
				},
			},
		],
		[
			"expo-font",
			{
				fonts: [
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-Thin.ttf",
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-Thin-Italic.ttf",
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-ExtraLight.ttf",
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-ExtraLight-Italic.ttf",
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-Light.ttf",
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-Light-Italic.ttf",
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-Regular.ttf",
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-Italic.ttf",
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-Medium.ttf",
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-Medium-Italic.ttf",
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-SemiBold.ttf",
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-SemiBold-Italic.ttf",
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-Bold.ttf",
					"../../node_modules/@audira/carbon-react-native/assets/fonts/IBMPlexSans-Bold-Italic.ttf",
				],
			},
		],
		[
			"expo-splash-screen",
			{
				image: "./assets/splash-icon.png",
				imageWidth: 200,
				resizeMode: "contain",
				backgroundColor: "#ffffff",
				dark: {
					backgroundColor: "#ffffff",
				},
			},
		],
	],

} satisfies ExpoConfig
