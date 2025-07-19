import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'

import {
	ICMP,
} from '../../ICMP'

import type {
	ICMPResult,
} from '../../ICMP/ICMPResult'

import type {
	UseICMPProps,
} from './UseICMPProps'

export interface UseICMP {
	isRunning: boolean,
	result: ICMPResult | undefined,
	start: () => void,
	stop: () => void,
}

export function useICMP({
	host,
	count,
	packetSize,
	timeout,
	ttl,
	interval,
}: UseICMPProps) {

	const
		icmp =
			useRef<ICMP>(null),

		[state, setState] =
			useState<{
				result: UseICMP['result'],
				isRunning: boolean
			}>({
				result: undefined,
				isRunning: false,
			}),

		start: UseICMP['start'] =
			useCallback(() => {
				if(!state.isRunning) {
					setState(_state => ({
						result: _state.result,
						isRunning: true,
					}))
				}
			}, [
				state.isRunning,
			]),

		stop: UseICMP['stop'] =
			useCallback(() => {
				icmp.current?.stop()
				setState(_state => ({
					result: _state.result,
					isRunning: false,
				}))
			}, [])

	useEffect(() => {
		if(icmp.current) {
			icmp.current?.stop()
		}

		icmp.current = new ICMP({
			host,
			count,
			packetSize,
			timeout,
			ttl,
			interval,
		})
	}, [
		host,
		count,
		packetSize,
		timeout,
		ttl,
		interval,
	])

	useEffect(() => {
		const icmpRef = icmp.current

		if(state.isRunning) {
			icmp.current?.ping(result => {
				setState({
					result,
					isRunning: !result.isEnded,
				})
			})
		}

		return () => {
			icmpRef?.stop()
		}
	}, [
		state.isRunning,
	])

	return {
		isRunning: state.isRunning,
		result: state.result,
		start,
		stop,
	}

}
