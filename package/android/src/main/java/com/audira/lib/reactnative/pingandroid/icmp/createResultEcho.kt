package com.audira.lib.reactnative.pingandroid.icmp

import com.audira.lib.reactnative.pingandroid.C_STATUS_ECHO

fun createResultEcho(rtt: Double, ttl: Int, isEnded: Boolean): ICMPResult {
    return createResult(
        rtt = rtt,
        ttl = ttl,
        status = C_STATUS_ECHO,
        isEnded = isEnded,
    )
}