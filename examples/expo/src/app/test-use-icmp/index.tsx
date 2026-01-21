import {
	useLocalSearchParams,
	useRouter,
} from "expo-router"

import {
	TestUseICMPScreen,
} from "@examples/shared/screens"

import type {
	ICMPConstructorData,
} from "ping-react-native"

export default function TestUseICMPPage() {

	const
		router =
			useRouter(),

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
			backHandler={ router.back }
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
