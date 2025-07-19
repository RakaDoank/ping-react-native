import {
	useNavigation as useNavigationCore,
} from '@react-navigation/native'

import type {
	NativeStackNavigationProp,
} from '@react-navigation/native-stack'

import type {
	NavigationType,
} from '@/types'

export function useNavigation() {

	return useNavigationCore<NativeStackNavigationProp<NavigationType.Stacks>>()

}
