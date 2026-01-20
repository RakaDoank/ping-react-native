import {
	useRouter,
} from "expo-router"

import {
	ICMPInputsScreen,
} from "@/screens"

export default function ICMPInputsForUseICMP() {

	const
		router =
			useRouter(),

		submitHandler: ICMPInputsScreen.PageProps["onSubmit"] =
			data => {
				router.push({
					pathname: "/test-use-icmp",
					params: data,
				})
			}

	return (
		<ICMPInputsScreen.Page
			onSubmit={ submitHandler }
		/>
	)

}
