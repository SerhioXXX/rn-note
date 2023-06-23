import {
	StyleSheet,
	View,
	Modal,
	StatusBar,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import colors from '../misc/colors';
import { useEffect, useState } from 'react';
import RoundIconBtn from './RoundIconBtn';
import { SafeAreaView } from 'react-native-safe-area-context';

const NoteCreateModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleModalClose = () => {
		Keyboard.dismiss();
	};

	const handleOnChangeText = (text, valuerFor) => {
		if (valuerFor === 'title') setTitle(text);
		if (valuerFor === 'description') setDescription(text);
	};

	const handleSubmit = () => {
		if (!title.trim() && !description.trim()) return onClose();
		if (isEdit) {
			onSubmit(title, description, Date.now());
		} else {
			onSubmit(title, description);
			setTitle('');
			setDescription('');
		}
		onClose();
	};

	const closeAndClearModal = () => {
		if (!isEdit) {
			setTitle('');
			setDescription('');
		}
		onClose();
	};

	useEffect(() => {
		if (isEdit) {
			setTitle(note.title);
			setDescription(note.description);
		}
	}, [isEdit]);

	return (
		<>
			<StatusBar hidden />
			<Modal visible={visible} animationType='fade'>
				<SafeAreaView style={styles.container}>
					<TextInput
						value={title}
						onChangeText={(text) => handleOnChangeText(text, 'title')}
						placeholder='Title'
						style={[styles.title, styles.input]}
					/>
					<TextInput
						value={description}
						onChangeText={(text) => handleOnChangeText(text, 'description')}
						multiline
						placeholder='Description'
						style={[styles.input, styles.description]}
					/>
					<View style={styles.btnContainer}>
						<RoundIconBtn
							antIconName='check'
							size={48}
							onPress={handleSubmit}
						/>
						{title.trim() || description.trim() ? (
							<RoundIconBtn
								antIconName='close'
								size={48}
								style={{ marginLeft: 36 }}
								onPress={closeAndClearModal}
							/>
						) : null}
					</View>
				</SafeAreaView>
				<TouchableWithoutFeedback onPress={handleModalClose}>
					<View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
				</TouchableWithoutFeedback>
			</Modal>
		</>
	);
};
export default NoteCreateModal;
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingTop: 56,
	},
	input: {
		borderBottomWidth: 2,
		borderBottomColor: colors.PRIMARY,
		fontSize: 20,
		color: colors.DARK,
	},
	title: {
		height: 40,
		marginBottom: 15,
		fontWeight: 'bold',
	},
	description: {},
	modalBG: {
		flex: 1,
		zIndex: -1,
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingVertical: 16,
	},
});
