import Darwin

@objc(BitcoinHelpers)
class BitcoinHelpers: NSObject {
    @objc
    func getAddress(_ seed: NSString, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
     
        return resolve("Hi from native")
    }
    
}