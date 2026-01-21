import {
	useRouter,
} from "expo-router"

import {
	ICMPInputsScreen,
} from "@examples/shared/screens"

export default function ICMPInputsForICMP() {

	const
		router =
			useRouter(),

		submitHandler: ICMPInputsScreen.PageProps["onSubmit"] =
			data => {
				router.push({
					pathname: "/test-icmp",
					params: data,
				})
			}

	return (
		<ICMPInputsScreen.Page
			backHandler={ router.back }
			onSubmit={ submitHandler }
		/>
	)

}
