#ifdef RCT_NEW_ARCH_ENABLED

#import <RNPingSpec/RNPingSpec.h>

#else

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

#endif

@interface RNPing :
#ifdef RCT_NEW_ARCH_ENABLED
                    NativeRNPingSpecBase <NativeRNPingSpec>
#else
                    RCTEventEmitter <RCTBridgeModule> {
    bool pingListening;
}

- (void)emitPingListener:(NSDictionary *)dictionary;

#endif
@end
