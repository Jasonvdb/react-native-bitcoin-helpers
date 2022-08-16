import './shim';
import React, { ReactElement, useEffect, useState } from 'react';
import {
	Alert,
	Button,
	EmitterSubscription,
	Modal,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import bitcoinHelpers from 'react-native-bitcoin-helpers';

const App = (): ReactElement => {
	const [message, setMessage] = useState('...');

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={styles.scrollView}>
				<Text style={styles.text}>react-native-ldk</Text>
				<View style={styles.messageContainer}>
					<Text style={styles.text}>{message}</Text>
				</View>
				<View style={styles.container}>
					<Button
						title={'Test'}
						onPress={async (): Promise<void> => {
							try {
								const address = await bitcoinHelpers.getAddress("seed");
								setMessage(JSON.stringify(address));
							} catch (e) {
								console.error(e);
							}
							
						}}
					/>
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
	},
});

export default App;
