import {
	useLocalSearchParams,
} from "expo-router"

import type {
	ICMPConstructorData,
} from "ping-react-native"

import {
	TestUseICMPScreen,
} from "@/screens"

export default function TestUseICMPPage() {

	const
		{
			host,
			count,
			interval,
			packetSize,
			timeout,
			ttl,
		} =
			useLocalSearchParams<{
				[Key in keyof ICMPConstructorData]: string
			}>()

	return (
		<TestUseICMPScreen.Page
			host={ host }
			count={ strToNumber(count) }
			interval={ strToNumber(interval) }
			packetSize={ strToNumber(packetSize) }
			timeout={ strToNumber(timeout) }
			ttl={ strToNumber(ttl) }
		/>
	)

}

function strToNumber(str?: string | null): number | undefined {
	if(str) {
		return Number(str)
	}
	return undefined
}
