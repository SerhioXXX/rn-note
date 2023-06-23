import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const NoteContext = createContext();

const Provider = ({ children }) => {
	const [notes, setNotes] = useState([]);

	const findNotes = async () => {
		const res = await AsyncStorage.getItem('notes');
		if (res !== null) setNotes(JSON.parse(res));
	};

	useEffect(() => {
		findNotes();
	}, []);

	return (
		<NoteContext.Provider value={{ notes, setNotes, findNotes }}>
			{children}
		</NoteContext.Provider>
	);
};

export const useNotes = () => useContext(NoteContext);

export default Provider;
