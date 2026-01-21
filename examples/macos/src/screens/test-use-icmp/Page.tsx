import {
	TestUseICMPScreen,
} from "@examples/shared/screens"

import {
	NavigationHook,
} from "../../hooks"

import type {
	NavigationType,
} from "../../types"

export function Page({
	route,
}: NavigationType.ScreenProps<"test_use_icmp">) {

	const
		router =
			NavigationHook.useRouter()

	return (
		<TestUseICMPScreen.Page
			host={ route.params.host }
			count={ route.params.count }
			interval={ route.params.interval }
			packetSize={ route.params.packetSize }
			timeout={ route.params.timeout }
			ttl={ route.params.ttl }
			backHandler={ router.goBack }
		/>
	)

}
