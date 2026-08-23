import type {
	StackScreenProps,
} from "@react-navigation/stack"

import type {
	Stacks,
} from "./Stacks"

export interface ScreenProps<StackName extends keyof Stacks> extends StackScreenProps<Stacks, StackName> {
}
