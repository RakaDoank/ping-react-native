#import "GBPing.h"

typedef void(^OnPing)(double rtt, double ttl, int status, BOOL isEnded);

@interface ICMP : NSObject <GBPingDelegate>

@property (nonatomic, copy) OnPing onPing;

- (id)initICMP:(NSString *)host
         count:(NSUInteger)count
    packetSize:(NSUInteger)packetSize
           ttl:(NSUInteger)ttl
       timeout:(NSUInteger)timeout
      interval:(NSUInteger)interval;

- (void)ping;

- (void)stop;

@end
