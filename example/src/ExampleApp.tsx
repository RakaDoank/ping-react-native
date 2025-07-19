import {
	SafeAreaProvider,
} from 'react-native-safe-area-context'

import {
	NavigationBootstrap,
} from '@/bootstraps'

export function ExampleApp() {

	return (
		<SafeAreaProvider>
			<NavigationBootstrap/>
		</SafeAreaProvider>
	)

}
