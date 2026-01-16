import type {
	ICMPConstructorData,
} from "../../ICMP/ICMPConstructorData"

export interface UseICMPProps extends ICMPConstructorData {
	/**
	 * Provide this option with boolean value to determine when should the ICMP instance run. It's `true` by default.
	 * @default true
	 */
	enabled?: boolean,
}
