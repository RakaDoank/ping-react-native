import {
	useContext,
} from "react"

import {
	ScrollView,
	StyleSheet,
} from "react-native"

import {
	Button,
	CarbonStyleSheet,
	DialogContext,
} from "@audira/carbon-react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

import {
	FlexStyleSheet,
} from "../../style-sheets"

import type {
	PageProps,
} from "./PageProps"

import {
	ModalGetHostAddress,
} from "./_modal-get-host-address"

import {
	ModalGetHostname,
} from "./_modal-get-hostname"

export function Page({
	toICMPInputsHandler,
}: PageProps) {

	CarbonStyleSheet.use()

	const
		dialogContext =
			useContext(DialogContext),

		navigateToICMPInputs_ICMP =
			() => {
				toICMPInputsHandler("icmp")
			},

		navigateToICMPInputs_UseICMP =
			() => {
				toICMPInputsHandler("use_icmp")
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
				onPress={ navigateToICMPInputs_ICMP }
				style={ styleSheet.button }
			/>
			<Button.Tertiary
				text="useICMP"
				onPress={ navigateToICMPInputs_UseICMP }
				style={ styleSheet.button }
			/>
			<Button.Tertiary
				text="getHostname"
				onPress={ showModalGetHostname }
				style={ styleSheet.button }
			/>
			<Button.Tertiary
				text="getHostAddress"
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
