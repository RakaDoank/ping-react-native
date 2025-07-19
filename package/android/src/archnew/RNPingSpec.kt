package com.audira.lib.reactnative.pingandroid

import com.facebook.react.bridge.ReactApplicationContext

abstract class RNPingSpec internal constructor(context: ReactApplicationContext) : NativeRNPingSpec(context) {

	companion object {
		const val NAME = NativePingAndroidSpec.NAME
	}

}