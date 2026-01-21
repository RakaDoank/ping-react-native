import {
	useRef,
} from "react"

import {
	ScrollView,
	StyleSheet,
} from "react-native"

import {
	Button,
	ButtonGroup,
	TextInput,
	type TextInputProps,
} from "@audira/carbon-react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

import {
	type ICMPConstructorData,
} from "ping-react-native"

import {
	FlexStyleSheet,
} from "../../style-sheets"

import type {
	PageProps,
} from "./PageProps"

export function Page({
	backHandler,
	onSubmit,
}: PageProps) {

	const
		configRef =
			useRef<Required<ICMPConstructorData>>({
				host: "1.1.1.1",
				count: 10,
				interval: 1000,
				packetSize: 56,
				timeout: 1000,
				ttl: 54,
			}),

		onChangeHost: TextInputProps["onChangeText"] =
			text => {
				configRef.current.host = text
			},

		onChangeCount: TextInputProps["onChangeText"] =
			text => {
				configRef.current.count = Number(text)
			},

		onChangeInterval: TextInputProps["onChangeText"] =
			text => {
				configRef.current.interval = Number(text)
			},

		onChangePacketSize: TextInputProps["onChangeText"] =
			text => {
				configRef.current.packetSize = Number(text)
			},

		onChangeTimeout: TextInputProps["onChangeText"] =
			text => {
				configRef.current.timeout = Number(text)
			},

		onChangeTTL: TextInputProps["onChangeText"] =
			text => {
				configRef.current.ttl = Number(text)
			}

	return (
		<ScrollView
			style={ styleSheet.scrollView }
			contentContainerStyle={ [
				FlexStyleSheet.flex_auto,
				FlexStyleSheet.justify_center,
				FlexStyleSheet.self_center,
				styleSheet.scrollContentContainer,
			] }
		>
			<TextInput
				label="Host"
				helperText="e.g. 1.1.1.1, 8.8.8.8, github.com"
				// eslint-disable-next-line react-hooks/refs
				defaultValue={ configRef.current.host }
				onChangeText={ onChangeHost }
			/>

			<TextInput
				label="Count"
				keyboardType="numeric"
				// eslint-disable-next-line react-hooks/refs
				defaultValue={ configRef.current.count.toString() }
				onChangeText={ onChangeCount }
			/>

			<TextInput
				label="Interval"
				helperText="In milliseconds"
				keyboardType="numeric"
				// eslint-disable-next-line react-hooks/refs
				defaultValue={ configRef.current.interval!.toString() }
				onChangeText={ onChangeInterval }
			/>

			<TextInput
				label="Packet Size"
				helperText="In bytes"
				keyboardType="numeric"
				// eslint-disable-next-line react-hooks/refs
				defaultValue={ configRef.current.packetSize!.toString() }
				onChangeText={ onChangePacketSize }
			/>

			<TextInput
				label="Timeout"
				helperText="In milliseconds"
				keyboardType="numeric"
				// eslint-disable-next-line react-hooks/refs
				defaultValue={ configRef.current.timeout!.toString() }
				onChangeText={ onChangeTimeout }
			/>

			<TextInput
				label="TTL"
				keyboardType="numeric"
				// eslint-disable-next-line react-hooks/refs
				defaultValue={ configRef.current.ttl!.toString() }
				onChangeText={ onChangeTTL }
			/>

			<ButtonGroup
				fluid
				button1={
					<Button.Ghost
						text="Dismiss"
						onPress={ backHandler }
					/>
				}
				button2={
					<Button.Primary
						text="Submit"
						onPress={ () => onSubmit({ ...configRef.current }) }
					/>
				}
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
				maxWidth: 480,
			},
		})
