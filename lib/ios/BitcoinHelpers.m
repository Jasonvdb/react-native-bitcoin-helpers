#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(BitcoinHelpers, NSObject)

//MARK: Startup methods
RCT_EXTERN_METHOD(getAddress:(NSString *)seed
                  index:(NSNumber *)index
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end
