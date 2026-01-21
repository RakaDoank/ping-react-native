import type {
	ICMPConstructorData,
} from "ping-react-native"

export type Stacks = {
	home?: never,
	icmp_inputs: {
		for: "test_icmp" | "test_use_icmp",
	},
	test_icmp: ICMPConstructorData,
	test_use_icmp: ICMPConstructorData,
}
