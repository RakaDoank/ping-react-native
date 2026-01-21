import {
	CarbonReactNative,
} from "@audira/carbon-react-native"

import {
	GestureHandlerRootView,
} from "react-native-gesture-handler"

import {
	SafeAreaProvider,
} from "react-native-safe-area-context"

import {
	NavigationBootstrap,
} from "./bootstraps"

export function MacOS() {

	return (
		<GestureHandlerRootView>
			<SafeAreaProvider>
				<CarbonReactNative>
					<NavigationBootstrap.Container/>
				</CarbonReactNative>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	)

}
