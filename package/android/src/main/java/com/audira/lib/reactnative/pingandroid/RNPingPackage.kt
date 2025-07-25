package com.audira.lib.reactnative.pingandroid

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class RNPingPackage : BaseReactPackage() {

	override fun getModule(
		name: String,
		reactContext: ReactApplicationContext,
	): NativeModule? {
		return if(name == RNPingSpec.NAME) {
			RNPing(reactContext)
		} else {
			null
		}
	}

	override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
		return ReactModuleInfoProvider {
			mapOf(
				RNPingSpec.NAME to ReactModuleInfo(
					RNPingSpec.NAME,
					RNPingSpec.NAME,
					false,
					false,
					false,
					BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
				)
			)
		}
	}

}
