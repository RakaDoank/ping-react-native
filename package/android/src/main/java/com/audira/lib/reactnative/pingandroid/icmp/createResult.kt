package com.audira.lib.reactnative.pingandroid.icmp

import com.facebook.react.bridge.Arguments

fun createResult(
    rtt: Double,
    ttl: Int,
    status: Int,
    isEnded: Boolean,
): ICMPResult {
    val map = Arguments.createMap()
    map.putDouble("rtt", rtt)
    map.putInt("ttl", ttl)
    map.putInt("status", status)
    map.putBoolean("isEnded", isEnded)
    return map
}
