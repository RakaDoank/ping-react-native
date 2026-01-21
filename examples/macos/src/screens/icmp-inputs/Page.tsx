import {
	ICMPInputsScreen,
} from "@examples/shared/screens"

import {
	NavigationHook,
} from "../../hooks"

import type {
	NavigationType,
} from "../../types"

export function Page({
	route,
}: NavigationType.ScreenProps<"icmp_inputs">) {

	const
		router =
			NavigationHook.useRouter(),

		onSubmit: ICMPInputsScreen.PageProps["onSubmit"] =
			data => {
				router.push(
					route.params.for,
					data,
				)
			}

	return (
		<ICMPInputsScreen.Page
			backHandler={ router.goBack }
			onSubmit={ onSubmit }
		/>
	)

}
