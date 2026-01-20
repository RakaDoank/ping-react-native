import type {
	ButtonTogglerState,
} from "./ButtonTogglerState"

export interface ButtonTogglerRef {
	setState: (state: ButtonTogglerState) => void,
}
