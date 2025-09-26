import {
	type Double,
// eslint-disable-next-line import-x/no-unresolved
} from 'react-native/Libraries/Types/CodegenTypes'

import {
	PingStatus,
} from '../PingStatus'

export interface ICMPResult {
	rtt: Double,
	ttl: number,
	status: PingStatus,
	isEnded: boolean,
}
