#import "ICMP.h"
#import "PingConst.h"
#import "GBPing.h"

@implementation ICMP {
    NSInteger count;
    GBPing *pinger;
}

- (id)initICMP:(NSString *)host
         count:(NSUInteger)count
    packetSize:(NSUInteger)packetSize
           ttl:(NSUInteger)ttl
       timeout:(NSUInteger)timeout
      interval:(NSUInteger)interval
{
    self = [super init];
    if(self) {
        self->count = count;

        self->pinger = [[GBPing alloc] init];
        self->pinger.host = host;
        self->pinger.ttl = ttl;
        self->pinger.timeout = timeout / 1000.0;
        self->pinger.pingPeriod = interval / 1000.0;
        self->pinger.payloadSize = packetSize;

        self->pinger.delegate = self;
    }
    return self;
}

- (void)ping {
    if(self->pinger.isPinging) {
        self.onPing(PingConst_NO_ECHO_RTT, PingConst_NO_ECHO_TTL, PingConst_STATUS_ECHOING, NO);
    } else {
        [self->pinger setupWithBlock:^(BOOL success, NSError *error) {
            if(success) {
                [self->pinger startPinging];
            } else {
                [self pingHandler:NULL error:&error];
            }
        }];
    }
}

- (void)stop {
    if(self->pinger.isPinging) {
        [self->pinger stop];
        self->pinger = nil;
    }
}

- (void)pingHandler:(GBPingSummary *_Nullable *_Nullable)summary error:(NSError *_Nullable *_Nullable)error {
    double rtt      = -99.0;
    double ttl      = -99.0;
    BOOL isEnded    = NO;
    int status      = -99.0;

    if(summary != NULL && *summary != nil) {
        rtt = [*summary rtt] * MSEC_PER_SEC;
        ttl = [[NSNumber numberWithUnsignedInteger:[*summary ttl]] doubleValue];
        if([*summary status] == GBPingStatusSuccess) {
            status = PingConst_STATUS_ECHO;
        }
        if([*summary sequenceNumber] == self->count - 1) {
            isEnded = YES;
        }
    }

    if(error != NULL && *error != nil) {
        if(rtt == -99.0) {
            rtt = PingConst_NO_ECHO_RTT;
        }
        if(ttl == -99.0) {
            ttl = PingConst_NO_ECHO_TTL;
        }
        if([*error code] == kCFHostErrorUnknown || [*error code] == kCFHostErrorHostNotFound) {
            status = PingConst_STATUS_UNKNOWN_HOST;
        } else {
            status = PingConst_STATUS_UNKNOWN_FAILURE;
        }
        isEnded = YES;
    }

    self.onPing(rtt, ttl, status, isEnded);
}

#pragma mark GBPing Delegate Methods

- (void)ping:(GBPing *)pinger didFailToSendPingWithSummary:(GBPingSummary *)summary error:(NSError *)error {
    [self pingHandler:&summary error:&error];
}

- (void)ping:(GBPing *)pinger didFailWithError:(NSError *)error {
    [self pingHandler:NULL error:&error];
}

- (void)ping:(GBPing *)pinger didTimeoutWithSummary:(GBPingSummary *)summary {
    [self pingHandler:&summary error:NULL];
}

- (void)ping:(GBPing *)pinger didSendPingWithSummary:(GBPingSummary *)summary {
}

- (void)ping:(GBPing *)pinger didReceiveReplyWithSummary:(GBPingSummary *)summary {
    [self pingHandler:&summary error:NULL];
}

- (void)ping:(GBPing *)pinger didReceiveUnexpectedReplyWithSummary:(GBPingSummary *)summary {
    [self pingHandler:&summary error:NULL];
}

@end
