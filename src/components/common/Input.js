import React from 'react';
import { Text, View, TextInput } from 'react-native';
import Constants from '../../Constants';


const Input = ({value, placeholder, onChangeText, onSubmitEditing, returnKeyType}) => {
	const { inputStyle, containerStyle } = styles;

	return (
		<View style={containerStyle}>
			<TextInput 
				placeholder={placeholder}
				autoCorrect={false}
				style={inputStyle}
				value={value}
				onChangeText={onChangeText}
				placeholderTextColor={Constants.blueColor}
				onSubmitEditing={onSubmitEditing}
				returnKeyType={returnKeyType}
			/>
		</View>
	);
};

const styles = {
	inputStyle: {
		color: Constants.blueColor,
		paddingRight: 70,
		paddingLeft: 70,
		fontSize: 18,
		height:40,
		textAlign: 'center',
		borderWidth: 2,
		borderColor: Constants.blueColor,
		borderRadius: 20,
		backgroundColor: 'white'
	},
	containerStyle: {
		flex: 1,
		alignItems: 'center'	
	}
};

export { Input };