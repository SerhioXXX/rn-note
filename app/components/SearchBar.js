import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../misc/colors';

const SearchBar = ({ containerStyle, value, onChangeText, onClear }) => {
	return (
		<View style={[styles.container, { ...containerStyle }]}>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				style={styles.searchBar}
				placeholder='Search notes...'
			/>
			{value ? (
				<MaterialCommunityIcons
					name='broom'
					size={30}
					color={colors.PRIMARY}
					onPress={onClear}
					style={styles.clearIcon}
				/>
			) : null}
		</View>
	);
};
export default SearchBar;
const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},
	searchBar: {
		borderWidth: 0.5,
		borderColor: colors.PRIMARY,
		height: 40,
		borderRadius: 40,
		paddingLeft: 15,
		fontSize: 20,
	},
	clearIcon: {
		position: 'absolute',
		right: 10,
	},
});
