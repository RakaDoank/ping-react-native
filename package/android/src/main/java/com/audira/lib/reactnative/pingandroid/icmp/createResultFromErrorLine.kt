package com.audira.lib.reactnative.pingandroid.icmp

private val regexInvalidArg = Regex("invalid|illegal.*packet size|bad wait time|ttl.*out of range", RegexOption.IGNORE_CASE)
private val regexUnknownHost = Regex("unknown host|name or service not known", RegexOption.IGNORE_CASE)

fun createResultFromErrorLine(
    line: String,
    isEnded: Boolean,
): ICMPResult {
    if(regexUnknownHost.find(line) != null) {
        return createResultUnknownHost()
    }

    if(regexInvalidArg.find(line) != null) {
        return createResultInvalidArg()
    }

    return createResultUnknownFailure(isEnded)
}
