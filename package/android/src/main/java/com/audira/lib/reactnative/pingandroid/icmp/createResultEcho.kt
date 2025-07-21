package com.audira.lib.reactnative.pingandroid.icmp

import com.audira.lib.reactnative.pingandroid.PingConst_STATUS_ECHO

fun createResultEcho(rtt: Double, ttl: Int, isEnded: Boolean): ICMPResult {
    return createResult(
        rtt = rtt,
        ttl = ttl,
        status = PingConst_STATUS_ECHO,
        isEnded = isEnded,
    )
}
