import type {
	Button,
} from "@audira/carbon-react-native"

import type {
	ButtonTogglerRef,
} from "./ButtonTogglerRef"

import type {
	ButtonTogglerState,
} from "./ButtonTogglerState"

export interface ButtonTogglerProps extends Omit<
	Button.BaseColorProps,
	| "text"
	| "android_rippleEffectColor"
	| "colorStateStyle"
	| "onToggle"
	| "onPress"
> {
	onToggle?: (nextState: ButtonTogglerState) => void,
	ref?: React.Ref<ButtonTogglerRef>,
}
