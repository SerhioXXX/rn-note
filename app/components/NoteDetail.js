import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../context/Provider';
import NoteCreateModal from './NoteCreateModal';
import { useState } from 'react';

const formatDate = (ms) => {
	const date = new Date(ms);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const hours = date.getHours();
	const min = date.getMinutes();
	const sec = date.getSeconds();

	return `${hours}:${min}:${sec} - ${day}/${month}/${year}`;
};

const NoteDetail = (props) => {
	const [note, setNote] = useState(props.route.params.note);
	const headerHeight = useHeaderHeight();
	const { setNotes } = useNotes();
	const [showModal, setShowModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const deleteNote = async () => {
		const res = await AsyncStorage.getItem('notes');
		let notes = [];
		if (res !== null) notes = JSON.parse(res);

		const newNotes = notes.filter((n) => n.id !== note.id);
		setNotes(newNotes);
		await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
		props.navigation.goBack();
	};

	const handlerDelete = () => {
		Alert.alert(
			'Are You Sure?',
			'This action will delete your note permanently!',
			[
				{
					text: 'Delete',
					onPress: deleteNote,
				},
				{
					text: 'Cancel',
					onPress: () => {},
				},
			],
			{ cancelable: true },
		);
	};

	const handleUpdate = async (title, description, time) => {
		const res = await AsyncStorage.getItem('notes');
		let notes = [];
		if (res !== null) notes = JSON.parse(res);

		const newNotes = notes.filter((n) => {
			if (n.id === note.id) {
				(n.title = title), (n.description = description);
				n.isUpdated = true;
				n.time = time;

				setNote(n);
			}
			return n;
		});

		setNotes(newNotes);
		await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
	};

	const handleOnClose = () => {
		setShowModal(false);
	};

	const openEditModal = () => {
		setIsEdit(true);
		setShowModal(true);
	};

	return (
		<>
			<ScrollView
				contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
			>
				<Text style={styles.time}>
					{note.isUpdated
						? `Update At ${formatDate(note.time)}`
						: `Created At ${formatDate(note.time)}`}
				</Text>
				<Text style={styles.title}>{note.title}</Text>
				<Text>{note.description}</Text>
			</ScrollView>
			<View style={styles.btnContainer}>
				<RoundIconBtn
					antIconName='delete'
					onPress={handlerDelete}
					size={48}
					style={{ backgroundColor: colors.ERROR, marginBottom: 24 }}
				/>
				<RoundIconBtn antIconName='edit' onPress={openEditModal} size={48} />
			</View>
			<NoteCreateModal
				isEdit={isEdit}
				note={props.route.params.note}
				onClose={handleOnClose}
				onSubmit={handleUpdate}
				visible={showModal}
			/>
		</>
	);
};
export default NoteDetail;
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
	},
	title: {
		fontSize: 30,
		color: colors.PRIMARY,
		fontWeight: 'bold',
	},
	description: {
		fontSize: 20,
		opacity: 0.6,
	},
	time: {
		textAlign: 'right',
		fontSize: 15,
		opacity: 0.5,
	},
	btnContainer: {
		position: 'absolute',
		right: 15,
		bottom: 50,
	},
});
