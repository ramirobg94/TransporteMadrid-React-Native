import React, {Component} from 'react';
import { Text, View } from 'react-native';
import {connect} from 'react-redux';


class EMTComponent extends Component {
	render(){
		return(
			<View>
				<Text>Hola</Text>
			</View>
		);
	}
}

export default connect(null, {})(EMTComponent);