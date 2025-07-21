package com.audira.lib.reactnative.pingandroid.icmp

import com.audira.lib.reactnative.pingandroid.PingConst_NO_ECHO_RTT
import com.audira.lib.reactnative.pingandroid.PingConst_NO_ECHO_TTL
import com.audira.lib.reactnative.pingandroid.PingConst_STATUS_TIMEDOUT

fun createResultTimedOut(isEnded: Boolean): ICMPResult {
    return createResult(
        rtt = PingConst_NO_ECHO_RTT,
        ttl = PingConst_NO_ECHO_TTL,
        status = PingConst_STATUS_TIMEDOUT,
        isEnded = isEnded,
    )
}
