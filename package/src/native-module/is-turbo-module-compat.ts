/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// @ts-expect-error - See this reference: https://github.com/react-native-community/RNNewArchitectureLibraries/blob/feat/back-turbomodule/example-library/src/index.js
const turboModuleProxy: boolean | undefined = global.__turboModuleProxy

/**
 * global.__turboModuleProxy doesn't exist anymore  
 * So this helper help this package to determine in the runtime either it's Turbo Modules or Legacy Native Modules the RN app is using
 */
export function isTurboModuleCompat() {
	if(typeof turboModuleProxy == 'undefined') {
		// @ts-expect-error - See https://github.com/facebook/react-native/blob/cc5f17d5a2b185de1e7dec2a56a97b088e4c7a81/packages/react-native/Libraries/TurboModule/TurboModuleRegistry.js
		return global.RN$Bridgeless === true
	}

	return !!turboModuleProxy
}
