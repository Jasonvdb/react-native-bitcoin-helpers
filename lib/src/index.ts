import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { Result, ok, err } from '@synonymdev/result';

const LINKING_ERROR =
	"The package 'react-native-bitcoin-helpers' doesn't seem to be linked. Make sure: \n\n" +
	Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
	'- You rebuilt the app after installing the package\n' +
	'- You are not using Expo managed workflow\n';

const NativeBitcoinHelpers =
	NativeModules?.BitcoinHelpers ??
	new Proxy(
		{},
		{
			get(): void {
				throw new Error(LINKING_ERROR);
			},
		},
	);

export const getAddress = async (seed: string, index: number): Promise<Result<string>> => {
	try {
		const res = await NativeBitcoinHelpers.getAddress(seed, index);
		return ok(res);
	} catch (e: any) {
		return err(e);
	}
};
