import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	StatusBar,
	Dimensions,
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from '../components/RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding = ({ onFinish }) => {
	const [password, setPassword] = useState('');

	const handlerOnChangeText = (text) => setPassword(text);

	const handleSubmit = async () => {
		const jsonValue = JSON.stringify(password);
		await AsyncStorage.setItem('password', jsonValue);
		if (onFinish) onFinish();
	};

	return (
		<>
			<StatusBar hidden />
			<View style={styles.container}>
				<Text style={styles.inputTitle}>Слава Україні!</Text>
				<TextInput
					value={password}
					onChangeText={handlerOnChangeText}
					placeholder='???'
					style={styles.textInput}
				/>
				{password.toLowerCase().replaceAll(' ', '') === 'героямслава' ? (
					<RoundIconBtn
						onPress={() => handleSubmit()}
						antIconName={'login'}
						size={48}
					/>
				) : null}
			</View>
		</>
	);
};
export default Onboarding;

const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputTitle: {
		alignSelf: 'center',
		paddingLeft: 25,
		marginBottom: 5,
		opacity: 0.5,
	},
	textInput: {
		borderWidth: 2,
		borderColor: colors.PRIMARY,
		width,
		height: 40,
		borderRadius: 10,
		paddingLeft: 10,
		fontSize: 20,
		marginBottom: 15,
	},
});
