import { StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../misc/colors';

const NoteItem = ({ item, onPress }) => {
	const { title, description } = item;

	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Text numberOfLines={2} style={styles.title}>
				{title}
			</Text>
			<Text numberOfLines={3}>{description}</Text>
		</TouchableOpacity>
	);
};
export default NoteItem;

const width = Dimensions.get('window').width - 40;
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.PRIMARY,
		width: width / 2 - 10,
		padding: 8,
		borderRadius: 10,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 16,
	},
});
