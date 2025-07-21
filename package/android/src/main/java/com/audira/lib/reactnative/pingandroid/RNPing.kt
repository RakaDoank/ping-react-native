package com.audira.lib.reactnative.pingandroid

import com.audira.lib.reactnative.pingandroid.icmp.ICMP

import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod

import java.net.InetAddress

class RNPing (
	reactContext: ReactApplicationContext,
) : RNPingSpec(reactContext) {

	private val mapICMP
		: MutableMap<String/* Event ID */, ICMP>
		= mutableMapOf()

	private val lifecycleEventListener =
		object : LifecycleEventListener {

			private fun icmpCancel() {
				try {
					val last = mapICMP.entries.last()
					mapICMP[last.key]?.stop()
					mapICMP.remove(last.key)
				} catch(err: NoSuchElementException) {
					// does nothing
				}
			}

			override fun onHostDestroy() {
				icmpCancel()
			}

			override fun onHostPause() {
				icmpCancel()
			}

			override fun onHostResume() {
			}

		}

	init {
		reactContext.addLifecycleEventListener(lifecycleEventListener)
	}

	@ReactMethod
	override fun icmp(
		eventId: String,
		host: String,
		count: Double,
		packetSize: Double,
		timeout: Double,
		ttl: Double,
		interval: Double,
	) {
		if(mapICMP[eventId] == null) {
			mapICMP[eventId] = ICMP(
				host = host,
				packetSize = packetSize.toInt(),
				timeout = timeout.toLong(),
				ttl = ttl.toInt(),
				count = count.toLong(),
				interval = interval.toLong(),
				onPing = {
					emitPingListener(it)
				}
			)
			mapICMP[eventId]?.ping()
		}
	}

	@ReactMethod
	override fun icmpRemove(eventId: String) {
		mapICMP[eventId]?.stop()
		mapICMP.remove(eventId)
	}

	@ReactMethod
	fun isReachable(
		host: String,
		timeout: Double?,
		promise: Promise,
	) {
		try {
			val bool = InetAddress.getByName(host).isReachable(timeout?.toInt() ?: 10000)
			promise.resolve(bool)
		} finally {
			promise.resolve(null)
		}
	}

	@ReactMethod
	fun getHostName(
		host: String,
		promise: Promise,
	) {
		try {
			val hostName = InetAddress.getByName(host).hostName
			promise.resolve(hostName)
		} finally {
			promise.resolve(null)
		}
	}

}
