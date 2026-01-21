import {
	useRef,
} from "react"

import {
	Alert,
} from "react-native"

import {
	Button,
	ButtonGroup,
	Modal,
	ModalContent,
	TextInput,
	type TextInputProps,
} from "@audira/carbon-react-native"

import {
	getHostname,
} from "ping-react-native"

import {
	useSafeAreaInsets,
} from "react-native-safe-area-context"

import {
	FlexStyleSheet,
} from "../../../style-sheets"

import type {
	ModalGetHostnameProps,
} from "./ModalGetHostnameProps"

export function ModalGetHostname({
	buttonCloseProps,
	dismissHandler,
	style,
	...props
}: ModalGetHostnameProps) {

	const
		safeAreaInsets =
			useSafeAreaInsets(),

		hostRef =
			useRef<string>("1.1.1.1"),

		onChangeText: TextInputProps["onChangeText"] =
			text => {
				hostRef.current = text
			},

		getHostnameHandler =
			() => {
				getHostname(hostRef.current)
					.then(result => {
						Alert.alert(
							"Hostname:",
							result ?? "null",
							[
								{
									text: "Okay",
								},
							],
						)
					})
			}

	return (
		<Modal
			{ ...props }
			title="getHostname"
			buttonCloseProps={{
				...buttonCloseProps,
				onPress: buttonCloseProps?.onPress ?? dismissHandler,
				style: [
					{ top: safeAreaInsets.top }, // this thing should've been fixed in the @audira/carbon-react-native directly
					buttonCloseProps?.style,
				],
			}}
			style={ [
				{
					paddingTop: safeAreaInsets.top,
				},
				style,
			] }
		>
			<ModalContent
				style={ FlexStyleSheet.flex_auto }
			>
				<TextInput
					label="Host"
					defaultValue="1.1.1.1"
					helperText="e.g. 1.1.1.1, 8.8.8.8, google.com, etc."
					size="large"
					onChangeText={ onChangeText }
				/>
			</ModalContent>

			<ButtonGroup
				size="extra_large"
				fluid
				button1={
					<Button.Tertiary
						text="Dismiss"
						onPress={ dismissHandler }
					/>
				}
				button2={
					<Button.Primary
						text="Get"
						onPress={ getHostnameHandler }
					/>
				}
				style={{
					paddingBottom: safeAreaInsets.bottom,
				}}
			/>
		</Modal>
	)

}
