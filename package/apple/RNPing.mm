#import "RNPing.h"
#import "PingConst.h"
#import "ICMP/ICMP.h"
#import "Network/Network.h"
#import "arpa/inet.h"

@implementation RNPing {
    NSMutableDictionary<NSString *, ICMP *> *dictICMP;
    dispatch_queue_t queue_getHostname;
    dispatch_queue_t queue_getHostAddress;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(icmp:(NSString *)eventId
                  host:(NSString *)host
                 count:(NSInteger)count
            packetSize:(NSInteger)packetSize
               timeout:(NSInteger)timeout
                   ttl:(NSInteger)ttl
              interval:(NSInteger)interval)
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
        [[dictICMP objectForKey:eventId] ping];
    } else {
        [self emitPingListener:@{
            @"rtt"      : [NSNumber numberWithInt:PingConst_NO_ECHO_RTT],
            @"ttl"      : [NSNumber numberWithInt:PingConst_NO_ECHO_TTL],
            @"status"   : [NSNumber numberWithInt:PingConst_STATUS_ECHOING],
            @"isEnded"  : [NSNumber numberWithBool:NO],
        }];
    }
}

RCT_EXPORT_METHOD(icmpRemove:(NSString *)eventId) {
    ICMP *icmp = [dictICMP objectForKey:eventId];
    if(icmp) {
        [icmp stop];
        [dictICMP removeObjectForKey:eventId];
    }
}

RCT_EXPORT_METHOD(getHostname:(NSString *)host
                      resolve:(RCTPromiseResolveBlock)resolve
                       reject:(nonnull RCTPromiseRejectBlock)reject)
{
    if(host == nil || host.length == 0) {
        resolve(nil);
        return;
    }

    if(!self->queue_getHostname) {
        self->queue_getHostname = dispatch_queue_create("RNPing getHostname Queue", DISPATCH_QUEUE_CONCURRENT);
    }

    dispatch_async(self->queue_getHostname, ^{
        CFHostRef hostRef = CFHostCreateWithName(kCFAllocatorDefault, (__bridge CFStringRef)host);
        
        if(!hostRef) {
            resolve(nil);
            return;
        }
                
        Boolean hostRefResolved = CFHostStartInfoResolution(hostRef, kCFHostAddresses, NULL);
        
        if(!hostRefResolved) {
            resolve(nil);
            CFRelease(hostRef);
            return;
        }

        // toll free
        NSArray *addresses = (__bridge NSArray *)CFHostGetAddressing(hostRef, NULL);
        
        if(addresses == nil || addresses.count == 0) {
            resolve(nil);
            CFRelease(hostRef);
            return;
        }
        
        CFRelease(hostRef);

        CFHostRef reverseHostRef = CFHostCreateWithAddress(kCFAllocatorDefault, (__bridge CFDataRef)addresses[0]);

        if(!reverseHostRef) {
            resolve(nil);
            CFRelease(reverseHostRef);
            return;
        }

        Boolean reverseHostRefResolved = CFHostStartInfoResolution(reverseHostRef, kCFHostNames, NULL);

        if(!reverseHostRefResolved) {
            resolve(nil);
            CFRelease(reverseHostRef);
            return;
        }

        NSArray *names = (__bridge NSArray *)CFHostGetNames(reverseHostRef, NULL);
        
        if(names == nil || names.count == 0) {
            resolve(nil);
            CFRelease(reverseHostRef);
            return;
        }

        resolve((NSString *)names[0]);
        CFRelease(reverseHostRef);
    });
}

RCT_EXPORT_METHOD(getHostAddress:(NSString *)host
                         resolve:(RCTPromiseResolveBlock)resolve
                          reject:(nonnull RCTPromiseRejectBlock)reject)
{
    if(host == nil || host.length == 0) {
        resolve(nil);
        return;
    }

    if(!self->queue_getHostAddress) {
        self->queue_getHostAddress = dispatch_queue_create("RNPing getHostAddress queue", DISPATCH_QUEUE_CONCURRENT);
    }

    dispatch_async(self->queue_getHostAddress, ^{
        CFHostRef hostRef = CFHostCreateWithName(kCFAllocatorDefault, (__bridge CFStringRef)host);
        Boolean hostRefResolved;

        if(hostRef) {
            hostRefResolved = CFHostStartInfoResolution(hostRef, kCFHostAddresses, NULL);
        } else {
            hostRefResolved = false;
        }

        if(!hostRefResolved) {
            resolve(nil);
            CFRelease(hostRef);
            return;
        }

        NSArray *addresses = (__bridge NSArray *)CFHostGetAddressing(hostRef, NULL);
        if(addresses == nil || addresses.count == 0) {
            resolve(nil);
            CFRelease(hostRef);
            return;
        }

        NSString *hostAddress = @"";

        for (NSData *address in addresses) {
            const struct sockaddr *anAddrPtr = (const struct sockaddr *)[address bytes];

            if ([address length] >= sizeof(struct sockaddr) &&
                (anAddrPtr->sa_family == AF_INET || anAddrPtr->sa_family == AF_INET6)) {

                struct sockaddr_in *sin = (struct sockaddr_in *)anAddrPtr;
                char str[INET6_ADDRSTRLEN];
                inet_ntop(anAddrPtr->sa_family, &(sin->sin_addr), str, INET6_ADDRSTRLEN);
                hostAddress = [[NSString alloc] initWithUTF8String:str];
                break;
            }
        }

        if(hostAddress.length == 0) {
            resolve(nil);
            CFRelease(hostRef);
            return;
        }

        resolve(hostAddress);
        CFRelease(hostRef);
    });
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNPingSpecJSI>(params);
}

#else

- (NSArray<NSString *> *)supportedEvents {
    return @[@"PingListener"];
}

- (void)startObserving {
    self->pingListening = YES;
}

- (void)stopObserving {
    self->pingListening = NO;
}

- (void)emitPingListener:(NSDictionary *)dictionary {
    if(self->pingListening) {
        [self sendEventWithName:[[self supportedEvents] objectAtIndex:0] body:dictionary];
    }
}

#endif

@end
