#import "RNPing.h"
#import "PingConst.h"
#import "ICMP/ICMP.h"

@implementation RNPing {
    NSMutableDictionary *dictICMP;
}

RCT_EXPORT_MODULE()

- (void)icmp:(NSString *)eventId
        host:(NSString *)host
       count:(NSInteger)count
  packetSize:(NSInteger)packetSize
     timeout:(NSInteger)timeout
         ttl:(NSInteger)ttl
    interval:(NSInteger)interval
{
    if(count < 0 || timeout <= 0 || interval <= 0 || packetSize < 0 || ttl < 0) {
        [self emitPingListener:@{
            @"rtt": [NSNumber numberWithInt:PingConst_NO_ECHO_RTT],
            @"ttl": [NSNumber numberWithInt:PingConst_NO_ECHO_TTL],
            @"status": [NSNumber numberWithInt:PingConst_STATUS_INVALID_ARG],
            @"isEnded": [NSNumber numberWithBool:YES],
        }];
        return;
    }

    if(dictICMP == nil) {
        dictICMP = @{}.mutableCopy;
    }

    if(![dictICMP objectForKey:eventId]) {
        ICMP *icmp = [[ICMP alloc] initICMP:(NSString *)host
                                      count:(NSUInteger)count
                                 packetSize:(NSUInteger)packetSize
                                        ttl:(NSUInteger)ttl
                                    timeout:(NSUInteger)timeout
                                   interval:(NSUInteger)interval
        ];

        icmp.onPing = ^(double rtt, double ttl, int status, BOOL isEnded) {
            [self emitPingListener:@{
                @"rtt"      : [NSNumber numberWithDouble:rtt],
                @"ttl"      : [NSNumber numberWithDouble:ttl],
                @"status"   : [NSNumber numberWithDouble:status],
                @"isEnded"  : [NSNumber numberWithBool:isEnded],
            }];
        };

        [dictICMP setObject:icmp forKey:eventId];
        [icmp ping];
    } else {
        [self emitPingListener:@{
            @"rtt"      : [NSNumber numberWithInt:PingConst_NO_ECHO_RTT],
            @"ttl"      : [NSNumber numberWithInt:PingConst_NO_ECHO_TTL],
            @"status"   : [NSNumber numberWithInt:PingConst_STATUS_ECHOING],
            @"isEnded"  : [NSNumber numberWithBool:NO],
        }];
    }
}

- (void)icmpRemove:(NSString *)eventId {
    ICMP *icmp = [dictICMP objectForKey:eventId];
    if(icmp) {
        [icmp stop];
        [dictICMP removeObjectForKey:eventId];
    }
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNPingSpecJSI>(params);
}

@end
