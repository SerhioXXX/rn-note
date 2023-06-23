import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const RoundIconBtn = ({ antIconName, size, color, style, onPress }) => {
	return (
		<AntDesign
			onPress={onPress}
			name={antIconName}
			size={size || 24}
			color={color || colors.DARK}
			style={[styles.icon, { ...style }]}
		/>
	);
};
export default RoundIconBtn;
const styles = StyleSheet.create({
	icon: {
		backgroundColor: colors.PRIMARY,
		color: colors.LIGHT,
		borderRadius: 24,
		shadowColor: colors.DARK,
		padding: 4,
		shadowRadius: 12,
		overflow: 'hidden',
	},
});
