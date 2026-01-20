import {
	useContext,
} from "react"

import {
	ScrollView,
	StyleSheet,
} from "react-native"

import {
	useRouter,
} from "expo-router"

import {
	Button,
	CarbonStyleSheet,
	DialogContext,
} from "@audira/carbon-react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

import IconChevronRight from "@carbon/icons/svg/chevron--right.svg"

import {
	FlexStyleSheet,
} from "@/style-sheets"

import {
	ModalGetHostAddress,
} from "./_modal-get-host-address"

import {
	ModalGetHostname,
} from "./_modal-get-hostname"

export function Page() {

	CarbonStyleSheet.use()

	const
		dialogContext =
			useContext(DialogContext),

		router =
			useRouter(),

		navigateToICMPInputs_ICMP =
			() => {
				router.navigate("/icmp-inputs/icmp")
			},

		navigateToICMPInputs_UseICMP =
			() => {
				router.navigate("/icmp-inputs/use-icmp")
			},

		dismissModal =
			() => {
				dialogContext.dismiss()
			},

		showModalGetHostname =
			() => {
				dialogContext.show({
					component: (
						<ModalGetHostname
							dismissHandler={ dismissModal }
						/>
					),
				})
			},

		showModalGetHostAddress =
			() => {
				dialogContext.show({
					component: (
						<ModalGetHostAddress
							dismissHandler={ dismissModal }
						/>
					),
				})
			}

	return (
		<ScrollView
			style={ styleSheet.scrollView }
			contentContainerStyle={ [
				FlexStyleSheet.flex_auto,
				FlexStyleSheet.justify_center,
				FlexStyleSheet.self_center,
				FlexStyleSheet.items_center,
				styleSheet.scrollContentContainer,
			] }
		>
			<Button.Tertiary
				text="ICMP"
				Icon={ IconChevronRight }
				onPress={ navigateToICMPInputs_ICMP }
				style={ styleSheet.button }
			/>
			<Button.Tertiary
				text="useICMP"
				Icon={ IconChevronRight }
				onPress={ navigateToICMPInputs_UseICMP }
				style={ styleSheet.button }
			/>
			<Button.Tertiary
				text="getHostname"
				Icon={ IconChevronRight }
				onPress={ showModalGetHostname }
				style={ styleSheet.button }
			/>
			<Button.Tertiary
				text="getHostAddress"
				Icon={ IconChevronRight }
				onPress={ showModalGetHostAddress }
				style={ styleSheet.button }
			/>
		</ScrollView>
	)

}

const
	styleSheet =
		StyleSheet.create({
			scrollView: {
				flex: 1,
			},
			scrollContentContainer: {
				padding: Spacing.spacing_05,
				rowGap: Spacing.spacing_05,
				width: "100%",
				maxWidth: 320,
			},
			button: {
				alignSelf: "stretch",
			},
		})
