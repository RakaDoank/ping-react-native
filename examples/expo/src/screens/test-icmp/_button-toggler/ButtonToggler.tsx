import {
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"

import {
	Button,
} from "@audira/carbon-react-native"

import type {
	ButtonTogglerProps,
} from "./ButtonTogglerProps"

import type {
	ButtonTogglerState,
} from "./ButtonTogglerState"

export function ButtonToggler({
	ref,
	onToggle,
	...props
}: ButtonTogglerProps) {

	const
		allowEffectOnToggle =
			useRef<boolean>(false),

		[state, setState_] =
			useState<ButtonTogglerState>("stopped"),

		toggleHandler =
			() => {
				setState_(s => s == "stopped" ? "started" : "stopped")
			}

	useEffect(() => {
		if(!allowEffectOnToggle.current) {
			allowEffectOnToggle.current = true
		} else {
			onToggle?.(state)
		}
	}, [
		state,
		onToggle,
	])

	useImperativeHandle(ref, () => {
		return {
			setState(nextState) {
				allowEffectOnToggle.current = false
				setState_(nextState)
			},
		}
	}, [])

	if(state == "started") {
		return (
			<Button.Secondary
				{ ...props }
				text="Stop"
				onPress={ toggleHandler }
			/>
		)
	}

	return (
		<Button.Primary
			{ ...props }
			text="Start"
			onPress={ toggleHandler }
		/>
	)

}
