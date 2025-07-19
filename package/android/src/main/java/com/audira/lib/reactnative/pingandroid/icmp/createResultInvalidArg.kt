package com.audira.lib.reactnative.pingandroid.icmp

import com.audira.lib.reactnative.pingandroid.C_NO_ECHO_RTT
import com.audira.lib.reactnative.pingandroid.C_NO_ECHO_TTL
import com.audira.lib.reactnative.pingandroid.C_STATUS_INVALID_ARG

fun createResultInvalidArg(): ICMPResult {
    return createResult(
        rtt = C_NO_ECHO_RTT,
        ttl = C_NO_ECHO_TTL,
        status = C_STATUS_INVALID_ARG,
        isEnded = true,
    )
}
