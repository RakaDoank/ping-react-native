import {
	NativeModule,
} from "./native-module"

/**
 * Gets the host name from an IP address.
 * 
 * If the host argument was given with a host name, a reverse name lookup still will be performed and the result will be returned based on the system configured name lookup service.
 * 
 * The Promise will never be rejected. It will return `null` if it fails.
 */
export function getHostname(host: string) {
	return NativeModule.getHostname(host)
}
