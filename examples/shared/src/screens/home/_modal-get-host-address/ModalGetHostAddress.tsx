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
	getHostAddress,
} from "ping-react-native"

import {
	useSafeAreaInsets,
} from "react-native-safe-area-context"

import {
	FlexStyleSheet,
} from "../../../style-sheets"

import type {
	ModalGetHostAddressProps,
} from "./ModalGetHostAddressProps"

export function ModalGetHostAddress({
	buttonCloseProps,
	dismissHandler,
	style,
	...props
}: ModalGetHostAddressProps) {

	const
		safeAreaInsets =
			useSafeAreaInsets(),

		hostRef =
			useRef<string>("one.one.one.one"),

		onChangeText: TextInputProps["onChangeText"] =
			text => {
				hostRef.current = text
			},

		getHostnameHandler =
			() => {
				getHostAddress(hostRef.current)
					.then(result => {
						Alert.alert(
							"Host Address:",
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
			title="getHostAddress"
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
					defaultValue="one.one.one.one"
					helperText="e.g. google.com, instagram.com, etc."
					size="large"
					onChangeText={ onChangeText }
					// Note:
					// If the text input appears with same background color as the modal
					// it's probably library bug or mistaken level of <Layer>
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
