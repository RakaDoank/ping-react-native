package com.audira.lib.reactnative.pingandroid.icmp

private val regexEcho = Regex("ttl=(\\d+).*time=(.+)\\sms")
private val regexTimeout = Regex("timed out|timedout|timeout", RegexOption.IGNORE_CASE)

fun createResultFromLine(line: String, isEnded: Boolean): ICMPResult {
    val echo = regexEcho.find(line)
    if(echo != null) {
        return try {
            val (ttl, time) = echo.destructured
            createResultEcho(
                rtt = time.toDouble(),
                ttl = ttl.toInt(),
                isEnded = isEnded,
            )
        } catch(err: NumberFormatException) {
            return createResultUnknownFailure(isEnded)
        }
    }

    val timeout = regexTimeout.find(line)
    if(timeout != null) {
        return createResultTimedOut(isEnded)
    }

    return createResultUnknownFailure(isEnded)
}
