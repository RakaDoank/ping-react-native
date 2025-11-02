import {
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
}

export function useICMP({
	host,
	count,
	packetSize,
	timeout,
	ttl,
	interval,
	enabled = true,
}: UseICMPProps) {

	const
		icmp =
			useRef<ICMP>(null),

		[result, setResult] =
			useState<UseICMP['result']>(undefined)

	useEffect(() => {
		icmp.current?.stop()

		icmp.current = new ICMP({
			host,
			count,
			packetSize,
			timeout,
			ttl,
			interval,
		})

		const icmpRef = icmp.current

		return () => {
			icmpRef?.stop()
		}
	}, [
		host,
		count,
		packetSize,
		timeout,
		ttl,
		interval,
	])

	useEffect(() => {
		if(enabled && icmp.current) {
			icmp.current.ping(result => {
				setResult(result)
			})
		} else if(icmp.current?.isRunning) {
			icmp.current.stop()
			// This effect block will not be ran immediately when `enabled` prop is false
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setResult(curr => {
				if(curr) {
					return {
						...curr,
						isEnded: true,
					}
				}
				return undefined
			})
		}
	}, [
		enabled,
	])

	return {
		isRunning: enabled
			? result
				? !result.isEnded
				: true // Provide `isRunning` with true value immediately without waiting the first result
			: false,
		result,
	}

}
