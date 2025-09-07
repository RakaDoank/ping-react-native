import {
	NativeModule,
} from './native-module'

/**
 * Gets the host address from a host name. Returns the IP address string in textual presentation.
 * 
 * The Promise will never be rejected. It will return `null` if it fails.
 */
export function getHostAddress(host: string) {
	return NativeModule.getHostAddress(host)
}
