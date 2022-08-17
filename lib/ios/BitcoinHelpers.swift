import Darwin

@objc(BitcoinHelpers)
class BitcoinHelpers: NSObject {
    @objc
    func getAddress(_ seed: NSString, index: NSNumber, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        let index = 0
        
        do {
            let databaseConfig = DatabaseConfig.memory
            
            let key = try restoreExtendedKey(network: .regtest, mnemonic: String(seed), password: nil)
                        //p2wpkh
//            let desc = "wsh(multi(2,tprv8ZgxMBicQKsPePmENhT9N9yiSfTtDoC1f39P7nNmgEyCB6Nm4Qiv1muq4CykB9jtnQg2VitBrWh8PJU8LHzoGMHTrS2VKBSgAz7Ssjf9S3P/0/*,tpubDBYDcH8P2PedrEN3HxWYJJJMZEdgnrqMsjeKpPNzwe7jmGwk5M3HRdSf5vudAXwrJPfUsfvUPFooKWmz79Lh111U51RNotagXiGNeJe3i6t/1/*))"
//            let desc2 = "wpkh(\(key.xprv)/*)"
            
            
            let external_descriptor = "wpkh(\(key.xprv)/44'/0'/0'/\(index)/*)";
            let internal_descriptor = "wpkh(\(key.xprv)/44'/0'/0'/1/*)";
            
            let wallet = try Wallet.init(descriptor: external_descriptor, changeDescriptor: internal_descriptor, network: Network.regtest, databaseConfig: databaseConfig)
            let addressInfo = try wallet.getAddress(addressIndex: AddressIndex.lastUnused)
            return resolve("\(addressInfo.address) (\(addressInfo.index))")
            
//            return resolve("\(key.fingerprint) ----- \(key.xprv)")
        } catch {
            reject(error.localizedDescription, error.localizedDescription, error)
        }
    }
}
