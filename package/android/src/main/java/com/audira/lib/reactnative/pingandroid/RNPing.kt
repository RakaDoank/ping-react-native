package com.audira.lib.reactnative.pingandroid

import com.audira.lib.reactnative.pingandroid.icmp.ICMP
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch

import java.net.InetAddress

class RNPing (
	reactContext: ReactApplicationContext,
) : RNPingSpec(reactContext) {

	private var coroutine_getHostname: CoroutineScope? = null
	private var coroutine_getHostAddress: CoroutineScope? = null

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

			private fun removeCoroutines() {
				if(coroutine_getHostname != null) {
					coroutine_getHostname!!.cancel()
					coroutine_getHostname = null
				}
				if(coroutine_getHostAddress != null) {
					coroutine_getHostAddress!!.cancel()
					coroutine_getHostAddress = null
				}
			}

			override fun onHostDestroy() {
				icmpCancel()
				removeCoroutines()
			}

			override fun onHostPause() {
				icmpCancel()
				removeCoroutines()
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
	override fun getHostname(
		host: String?,
		promise: Promise?,
	) {
		if(host.isNullOrEmpty()) {
			promise?.resolve(null)
			return
		}

		try {
			if(coroutine_getHostname == null) {
				coroutine_getHostname = CoroutineScope(Dispatchers.IO)
			}
			coroutine_getHostname?.launch {
				promise?.resolve(
					InetAddress.getByName(host).canonicalHostName
				)
				cancel()
			}
		} catch(e: Throwable) {
			promise?.resolve(null)
		}
	}

	@ReactMethod
	override fun getHostAddress(
		host: String?,
		promise: Promise?,
	) {
		if(host.isNullOrEmpty()) {
			promise?.resolve(null)
			return
		}

		try {
			if(coroutine_getHostAddress == null) {
				coroutine_getHostAddress = CoroutineScope(Dispatchers.IO)
			}
			coroutine_getHostAddress?.launch {
				promise?.resolve(
					InetAddress.getByName(host).hostAddress
				)
				cancel()
			}
		} catch(e: Throwable) {
			promise?.resolve(null)
		}
	}

}
