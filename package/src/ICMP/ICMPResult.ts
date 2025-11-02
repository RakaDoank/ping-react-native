import {
	type Double,
// eslint-disable-next-line import-x/no-unresolved
} from 'react-native/Libraries/Types/CodegenTypes'

import {
	PingStatus,
} from '../PingStatus'

import {
	ICMPStatus,
} from './ICMPStatus'

export interface ICMPResult {
	rtt: Double,
	ttl: number,
	status: ICMPStatus | PingStatus,
	isEnded: boolean,
}
