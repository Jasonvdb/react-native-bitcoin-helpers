import '../shim';
import React, { ReactElement, useEffect, useState } from 'react';
import {
	Button,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import {getAddress} from 'react-native-bitcoin-helpers';
import { generateMnemonic, getAddressJS, mnemonicToSeed } from './bitcoin';
import { timeString } from './helpers';

const App = (): ReactElement => {
	const [result, setResult] = useState('');
	const [max, setMax] = useState(20);
	const [addresses, setAddresses] = useState<string[]>([]);
	const [seed, setSeed] = useState('');
	const [randomUI, setRandomUI] = useState(0);

	const updateRandomUI = () => setRandomUI(Math.floor(Math.random() * (100 - 50 + 1) + 50));

	useEffect(() => {
		setInterval(updateRandomUI, 100);
	}, []) 
 
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={styles.scrollView}>
				<Text style={styles.text}>react-native-bitcoin-helpers</Text>
				<View style={styles.messageContainer}>
				<Text style={styles.text}>{seed}</Text>
				<Text style={styles.text}>{result}</Text>
				{addresses.map(a => <Text key={a} style={styles.addresss}>{a}</Text>)}
				<Text style={styles.text}>Test addresses: {max}</Text>
				</View>
				<View style={styles.container}>
					<Button
						title={'Generate seed (bitcoinJS)'}
						onPress={async (): Promise<void> => {
							try {
								var startTime = performance.now();
								const words = generateMnemonic();								
								var endTime = performance.now();

								setResult(timeString(startTime, endTime));
								setSeed(words);
								setAddresses([]);
							} catch (e) {
								console.error(e);
							}		
						}}
					/>

					<Button
						title={'+10 test addresses'}
						onPress={(): void => {
							setMax(max + 10);
						}}
					/>

					<Button
						title={'-10 test addresses'}
						onPress={(): void => {
							setMax(Math.max(max - 10, 10));
						}}
					/>

					<Button
						title={'Test (bitcoinJS)'}
						onPress={async (): Promise<void> => {
							if (!seed) {
								return alert("Generate seed first");
							}

							setResult('Testing...');

							try {
								setAddresses(['']);
								const root = await mnemonicToSeed(seed, undefined);

								var startTime = performance.now();

								for (let index = 0; index < max; index++) {
									const {address} = getAddressJS(root, `m/44'/0'/0'/0/${index}`);
									setAddresses((list) => [...list, address || '']);
								}

								var endTime = performance.now();

								setResult(timeString(startTime, endTime));
							} catch (e) {
								console.error(e);
							}	
						}}
					/>

					<Button
						title={'Test (BDK)'}
						onPress={async (): Promise<void> => {
							if (!seed) {
								return alert("Generate seed first");
							}

							setResult('Testing...');

							try {
								setAddresses([]);
								var startTime = performance.now();

								for (let index = 0; index < max; index++) {
									const res = await getAddress(seed, index);

									if (res.isErr()) {
										return console.error(res.error);
									}

									setAddresses((list) => [...list, res.value]);
								}
								
								var endTime = performance.now();

								setResult(timeString(startTime, endTime));
							} catch (e) {
								console.error(e);
							}		
						}}
					/>

					<View style={[styles.randomUI, {height: randomUI, backgroundColor: `rgb(${randomUI},${randomUI},255)`}]}><Text>Random UI update ({randomUI})</Text></View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollView: {
		flex: 1,
	},
	messageContainer: {
		minHeight: 120,
		marginHorizontal: 20,
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
		fontSize: 13,
		marginBottom: 10
	},
	addresss: {
		textAlign: 'center',
		fontSize: 10,
	},
	randomUI: {
		width: 200,
		height: 50,
	}
});

export default App;
