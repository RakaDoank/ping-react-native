import {
	NativeEventEmitter,
	type EventSubscription,
	type NativeModule as LegacyNativeModule,
} from "react-native"

import {
	NativeModule,
} from "../native-module"

import {
	isTurboModuleCompat,
} from "../native-module/is-turbo-module-compat"

import type {
	ICMPConstructorData,
} from "./ICMPConstructorData"

import type {
	ICMPResult,
} from "./ICMPResult"

import {
	ICMPStatus,
} from "./ICMPStatus"

const isTurboModuleEnabled = isTurboModuleCompat()

export class ICMP {

	private eventId: string = new Date().getTime().toString() + Math.random().toString()
	readonly host: string
	readonly count: number = 0
	readonly packetSize: number = 56
	readonly timeout: number = 1000
	readonly ttl: number = 54
	readonly interval: number = 1000

	static NO_ECHO_RTT = -1
	static NO_ECHO_TTL = -1

	static Status = ICMPStatus

	private pingEventSubscription: EventSubscription | null = null
	private pingEventHandler: ((result: ICMPResult) => void) | null = null

	constructor(data: ICMPConstructorData) {
		this.host = data.host
		this.count = data.count ?? this.count
		this.packetSize = data.packetSize ?? this.packetSize
		this.timeout = data.timeout ?? this.timeout
		this.ttl = data.ttl ?? this.ttl
		this.interval = data.interval ?? this.interval
	}

	ping(
		onPing: (
			result: ICMPResult,
		) => void,
	) {
		if(!this.pingEventHandler) {
			NativeModule.icmp(
				this.eventId,
				this.host,
				this.count,
				this.packetSize,
				this.timeout,
				this.ttl,
				this.interval,
			)

			this.pingEventHandler = onPing

			/* eslint-disable @typescript-eslint/no-unsafe-member-access */
			if(isTurboModuleEnabled) {
				this.pingEventSubscription = NativeModule.pingListener((
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					result: Record<string, any>,
				) => {
					this.pingEventHandler?.({
						rtt: result.rtt,
						status: result.status,
						ttl: result.ttl,
						isEnded: result.isEnded,
					})
					if(result.isEnded) {
						this.stop()
					}
				})
			} else {
				this.pingEventSubscription = new NativeEventEmitter(NativeModule as unknown as LegacyNativeModule).addListener("PingListener", result => {
					this.pingEventHandler?.({
						rtt: result.rtt,
						status: result.status,
						ttl: result.ttl,
						isEnded: result.isEnded,
					})
					if(result.isEnded) {
						this.stop()
					}
				})
			}
			/* eslint-enable @typescript-eslint/no-unsafe-member-access */
		} else {
			onPing({
				rtt: ICMP.NO_ECHO_RTT,
				ttl: ICMP.NO_ECHO_TTL,
				status: ICMPStatus.ECHOING,
				isEnded: true,
			})
		}
	}

	stop() {
		if(this.pingEventHandler) {
			NativeModule.icmpRemove(this.eventId)
			this.pingEventSubscription?.remove()
			this.pingEventHandler = null
		}
	}

	get isRunning() {
		return !!this.pingEventHandler
	}

}
