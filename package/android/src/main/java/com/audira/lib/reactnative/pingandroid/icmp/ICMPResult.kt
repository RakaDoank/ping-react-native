package com.audira.lib.reactnative.pingandroid.icmp

import com.facebook.react.bridge.ReadableMap

/**
 * @return A map that contain:
 * - `rtt`: `Number`
 * - `status`: `Number` - From the `PingConst.kt`
 * - `ttl`: `Number`
 * - `isEnded`: `Boolean`
 */
typealias ICMPResult = ReadableMap
