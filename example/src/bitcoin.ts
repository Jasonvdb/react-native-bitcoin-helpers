import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
// import * as bip32 from 'bip32';
const bip32 = require("bip32");

const network = bitcoin.networks.regtest;

export const generateMnemonic = (): string => {
    return bip39.generateMnemonic(256);
}

export const mnemonicToSeed = async (mnemonic: string, password: string | undefined) => {
    console.log(Object.keys(bip32));

    const seed = await bip39.mnemonicToSeed(mnemonic, password);
    const root = bip32.fromSeed(seed, network);
    return root;
}

export const getAddressJS = (root, path) => {
    const keyPair = root.derivePath(path);
    let address = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network }).address;
    
    const value = {
        address,
        path,
        publicKey: keyPair.publicKey.toString('hex'),
        privKey: keyPair.toWIF(),
    }

    return value;
}