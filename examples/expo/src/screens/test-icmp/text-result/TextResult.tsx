import {
	useImperativeHandle,
	useState,
} from "react"

import {
	StyleSheet,
	View,
	type ViewProps,
} from "react-native"

import {
	Text,
} from "@audira/carbon-react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

import {
	type ICMPResult,
} from "ping-react-native"

import {
	FlexStyleSheet,
} from "@/style-sheets"

import type {
	TextResultProps,
} from "./TextResultProps"

export function TextResult({
	limit,
	ref,
	style,
	...props
}: TextResultProps) {

	const
		[result, setResult_] =
			useState<ResultState>({
				rtt: undefined,
				ttl: undefined,
				status: undefined,
				isEnded: undefined,
				counter: 0,
			})

	useImperativeHandle(ref, () => {
		return {
			setResult(res) {
				setResult_(currentResult => {
					return {
						...res,
						counter: (currentResult.counter % limit) + 1,
					}
				})
			},
		}
	}, [
		limit,
	])

	return (
		<View
			{ ...props }
			style={ [
				styleSheet.textResult,
				style,
			] }
		>
			<Item
				title="rtt"
				result={ result.rtt ?? "-" }
			/>
			<Item
				title="ttl"
				result={ result.ttl ?? "-" }
			/>
			<Item
				title="status"
				result={ result.status ?? "-" }
			/>
			<Item
				title="isEnded"
				result={ typeof result.isEnded == "boolean" ? `${result.isEnded}` : "-" }
			/>

			<Item
				title="Counter"
				result={ result.counter ?? "0" }
				style={ styleSheet.itemCounter }
			/>
		</View>
	)

}

interface ResultState extends Partial<ICMPResult> {
	counter: number,
}

interface ItemProps extends Omit<ViewProps, "children"> {
	title: string,
	result: string | number,
}
function Item({
	title,
	result,
	style,
	...props
}: ItemProps) {

	return (
		<View
			{ ...props }
			style={ [
				styleSheet.item,
				FlexStyleSheet.flex_row,
				FlexStyleSheet.justify_between,
				style,
			] }
		>
			<Text>
				{ title }:
			</Text>
			<Text>
				{ result }
			</Text>
		</View>
	)

}

const
	styleSheet =
		StyleSheet.create({
			textResult: {
				rowGap: Spacing.spacing_02,
			},
			item: {
				columnGap: Spacing.spacing_02,
			},
			itemCounter: {
				marginTop: Spacing.spacing_04, // add additional margin just to distinguish between the ICMPResult and the counter state
			},
		})
