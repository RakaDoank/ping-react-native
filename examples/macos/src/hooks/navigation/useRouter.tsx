import {
	useNavigation,
} from "@react-navigation/native"

import type {
	StackNavigationProp,
} from "@react-navigation/stack"

import type {
	NavigationType,
} from "../../types"

export function useRouter() {

	return useNavigation<StackNavigationProp<NavigationType.Stacks>>()

}
