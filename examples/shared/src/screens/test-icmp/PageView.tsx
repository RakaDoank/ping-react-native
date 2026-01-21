import {
	StyleSheet,
	View,
} from "react-native"

import {
	Button,
} from "@audira/carbon-react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

import {
	FlexStyleSheet,
} from "../../style-sheets"

import type {
	PageViewProps,
} from "./PageViewProps"

export function PageView({
	backHandler,
	children,
	style,
	...props
}: PageViewProps) {

	return (
		<View
			{ ...props }
			style={ [
				FlexStyleSheet.flex_1,
				FlexStyleSheet.justify_center,
				styleSheet.container,
				style,
			] }
		>
			<View
				style={ [
					FlexStyleSheet.self_center,
					styleSheet.contentContainer,
				] }
			>
				<Button.Tertiary
					text="Back"
					onPress={ backHandler }
				/>

				{ children }
			</View>
		</View>
	)

}

const
	styleSheet =
		StyleSheet.create({
			container: {
				padding: Spacing.spacing_05,
			},
			contentContainer: {
				width: "100%",
				maxWidth: 420,
				rowGap: Spacing.spacing_05,
			},
			buttonBack: {
				marginBottom: Spacing.spacing_05,
			},
		})
