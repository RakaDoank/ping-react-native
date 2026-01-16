import {
	useEffect,
	useRef,
	useState,
} from "react"

import {
	Button,
} from "@audira/carbon-react-native"

import {
	useICMP,
} from "ping-react-native"

import * as TestICMPScreen from "../test-icmp"

import type {
	PageProps,
} from "./PageProps"

export function Page({
	host,
	count,
	interval,
	packetSize,
	timeout,
	ttl,
}: PageProps) {

	return (
		<TestICMPScreen.PageView>
			<Content
				host={ host }
				count={ count }
				interval={ interval }
				packetSize={ packetSize }
				timeout={ timeout }
				ttl={ ttl }
			/>
		</TestICMPScreen.PageView>
	)

}

interface ContentProps extends PageProps {
}
function Content({
	host,
	count,
	interval,
	packetSize,
	timeout,
	ttl,
}: ContentProps) {

	const
		textResultRef =
			useRef<TestICMPScreen.TextResultRef>(null),

		[ enabled, setEnabled ] =
			useState(false),

		{ result, isRunning } =
			useICMP({
				host,
				count,
				interval,
				packetSize,
				timeout,
				ttl,
				enabled,
			})

	useEffect(() => {
		if(result) {
			textResultRef.current?.setResult({ ...result })
			if(result.isEnded) {
				// eslint-disable-next-line react-hooks/set-state-in-effect
				setEnabled(false)
			}
		}
	}, [
		result,
	])

	return (<>
		<TestICMPScreen.TextResult
			limit={ count ?? 10 }
			ref={ textResultRef }
		/>

		{ isRunning ? (
			<Button.Secondary
				text="Stop"
				onPress={ () => setEnabled(false) }
			/>
		) : (
			<Button.Primary
				text="Start"
				onPress={ () => setEnabled(true) }
			/>
		) }
	</>)

}
