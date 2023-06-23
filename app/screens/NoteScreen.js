import {
	FlatList,
	Keyboard,
	StatusBar,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import colors from '../misc/colors';
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import NoteCreateModal from '../components/NoteCreateModal';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteItem from '../components/NoteItem';
import { useNotes } from '../context/Provider';
import NotFound from '../components/NotFound';
import { SafeAreaView } from 'react-native-safe-area-context';

const reverseData = (data) => {
	return data.sort((a, b) => {
		const aInt = parseInt(a.time);
		const bInt = parseInt(b.time);
		if (aInt < bInt) return 1;
		if (aInt === bInt) return 0;
		if (aInt > bInt) return -1;
	});
};

const NoteScreen = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const { notes, setNotes, findNotes } = useNotes();
	const [resultNotFound, setResultNotFound] = useState(false);

	const reverseNotes = reverseData(notes);

	const handleOnSubmit = async (title, description) => {
		const note = { id: Date.now(), title, description, time: Date.now() };
		const updatedNotes = [...notes, note];
		setNotes(updatedNotes);
		await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
	};

	const openNote = (note) => {
		navigation.navigate('NoteDetail', { note });
	};

	const handleOnSearchInput = async (text) => {
		setSearchQuery(text);
		if (!text.trim()) {
			setSearchQuery('');
			setResultNotFound(false);
			return await findNotes();
		}
		const filteredNotes = notes.filter((note) => {
			if (note.title.toLowerCase().includes(text.toLowerCase())) {
				return note;
			}
		});

		if (filteredNotes.length) {
			setNotes([...filteredNotes]);
		} else {
			setResultNotFound(true);
		}
	};

	const handleOnClear = async () => {
		setSearchQuery('');
		setResultNotFound(false);
		await findNotes();
	};

	return (
		<>
			<StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<SafeAreaView style={styles.container}>
					{notes.length ? (
						<SearchBar
							value={searchQuery}
							onChangeText={handleOnSearchInput}
							onClear={handleOnClear}
							containerStyle={{ marginVertical: 15 }}
						/>
					) : null}
					{resultNotFound ? (
						<NotFound />
					) : (
						<FlatList
							data={reverseNotes}
							numColumns={2}
							columnWrapperStyle={{
								justifyContent: 'space-between',
								marginBottom: 20,
							}}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<NoteItem onPress={() => openNote(item)} item={item} />
							)}
						/>
					)}
					{!notes.length ? (
						<View
							style={[
								StyleSheet.absoluteFillObject,
								styles.emptyHeaderContainer,
							]}
						>
							<Text style={styles.emptyHeader}>Add Notes</Text>
						</View>
					) : null}
				</SafeAreaView>
			</TouchableWithoutFeedback>
			<RoundIconBtn
				onPress={() => setModalVisible(true)}
				antIconName='plus'
				size={52}
				style={styles.addBtn}
			/>
			<NoteCreateModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				onSubmit={handleOnSubmit}
			/>
		</>
	);
};
export default NoteScreen;
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		flex: 1,
		zIndex: 1,
	},
	emptyHeaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: -1,
	},
	emptyHeader: {
		fontSize: 30,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		opacity: 0.2,
	},
	addBtn: {
		position: 'absolute',
		right: 26,
		bottom: 52,
		zIndex: 1,
	},
});
