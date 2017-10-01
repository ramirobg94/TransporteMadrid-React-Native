import React, {Component} from 'react';
import { Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Input } from './common';
import Constants from '../Constants';
import { busNumberChanged, searchStop } from '../actions';
import Spinner from 'react-native-loading-spinner-overlay';


class EMTComponent extends Component {

	onTextChange(text){
		this.props.busNumberChanged(text);
	}

	submit() {
		this.props.searchStop(this.props.busStopNumber);
	}

	render(){
		return(
			<View style={styles.mainContainerStyle}>
				<Spinner visible={this.props.loading} textContent={"Cargando..."} textStyle={{color: 'white'}} />
				<View>
					<Input 
					placeholder="Número de parada" 
					onChangeText={this.onTextChange.bind(this)}
					value={this.props.busStopNumber}
					onSubmitEditing={this.submit.bind(this)}
					returnKeyType="done"/>
				</View>
			</View>
			
		);
	}
}

const styles={
	mainContainerStyle: {
		backgroundColor: Constants.blueColor, 
		flex: 1
	}
};

const mapStateToProps = (state) => {
	const { busStopNumber, loading } = state.bus;
	return { busStopNumber, loading };
};

export default connect(mapStateToProps, { busNumberChanged, searchStop })(EMTComponent);