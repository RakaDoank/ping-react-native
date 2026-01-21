import {
	useRouter,
} from "expo-router"

import {
	HomeScreen,
} from "@examples/shared/screens"

export default function HomePage() {

	const
		router =
			useRouter(),

		toICMPInputsHandler: HomeScreen.PageProps["toICMPInputsHandler"] =
			inputFor => {
				if(inputFor == "icmp") {
					router.push("/icmp-inputs/icmp")
				} else {
					router.push("/icmp-inputs/use-icmp")
				}
			}

	return (
		<HomeScreen.Page
			toICMPInputsHandler={ toICMPInputsHandler }
		/>
	)

}
