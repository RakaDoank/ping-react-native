import {
	HomeScreen,
} from "@examples/shared/screens"

import {
	NavigationHook,
} from "../../hooks"

export function Page() {

	const
		router =
			NavigationHook.useRouter(),

		toICMPInputsHandler: HomeScreen.PageProps["toICMPInputsHandler"] =
			inputFor => {
				if(inputFor == "icmp") {
					router.push("icmp_inputs", { for: "test_icmp" })
				} else {
					router.push("icmp_inputs", { for: "test_use_icmp" })
				}
			}

	return (
		<HomeScreen.Page
			toICMPInputsHandler={ toICMPInputsHandler }
		/>
	)

}
