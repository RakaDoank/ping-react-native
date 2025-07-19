import type {
	NativeStackScreenProps,
} from '@react-navigation/native-stack'

import type {
	Stacks,
} from './Stacks'

export interface ScreenProps<Name extends keyof Stacks> extends NativeStackScreenProps<Stacks, Name> {
}
