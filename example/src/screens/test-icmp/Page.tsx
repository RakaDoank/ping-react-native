import {
	useEffect,
	useRef,
} from "react"

import {
	ICMP,
} from "ping-react-native"

import type {
	PageProps,
} from "./PageProps"

import {
	PageView,
} from "./PageView"

import {
	ButtonToggler,
	type ButtonTogglerProps,
	type ButtonTogglerRef,
} from "./_button-toggler"

import {
	TextResult,
	type TextResultRef,
} from "./text-result"

export function Page({
	host,
	count,
	interval,
	packetSize,
	timeout,
	ttl,
}: PageProps) {

	const
		textResultRef =
			useRef<TextResultRef>(null),

		buttonTogglerRef =
			useRef<ButtonTogglerRef>(null),

		icmpRef =
			useRef<ICMP | null>(
				new ICMP({
					host,
					count,
					interval,
					packetSize,
					timeout,
					ttl,
				}),
			),

		onPing: Parameters<ICMP["ping"]>[0] =
			result => {
				textResultRef.current?.setResult({ ...result })
				if(result.isEnded) {
					buttonTogglerRef.current?.setState("stopped")
				}
			},

		onToggle: ButtonTogglerProps["onToggle"] =
			nextState => {
				icmpRef.current?.stop()

				if(nextState == "started") {
					icmpRef.current?.ping(onPing)
				}
			}

	useEffect(() => {
		const icmp = icmpRef.current
		return () => {
			icmp?.stop()
		}
	}, [])

	return (
		<PageView>
			<TextResult
				limit={ count ?? 10 }
				ref={ textResultRef }
			/>
			<ButtonToggler
				onToggle={ onToggle }
				ref={ buttonTogglerRef }
			/>
		</PageView>
	)

}
