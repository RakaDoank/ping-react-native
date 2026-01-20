import {
	useRouter,
} from "expo-router"

import {
	ICMPInputsScreen,
} from "@/screens"

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
			onSubmit={ submitHandler }
		/>
	)

}
