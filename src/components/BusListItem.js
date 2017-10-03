import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Constants from '../Constants';


class BusListItem extends Component {
	render(){
		const { Destination, DistanceBus, TimeLeftBus, idLine } = this.props.arrive; 
		var dest = Destination[0];
		var distance = DistanceBus[0];
		var timeLeft = TimeLeftBus[0];
		var lineId = idLine[0];

	
		var timeString = "";
		if (timeLeft > 9999){
			timeString = "> 20 minutos";
		}else{
			var myTime = parseInt(timeLeft/60);
			if (myTime == 1){
				timeString = "1 minuto";
			}else if (myTime == 0){
				timeString = "Autobús cerca de parada";
			}else{
				timeString = ""+myTime+" minutos";
			}
		}


		return (
			<View style={styles.cellStyle}>
				<Text style={styles.destStyle}>Destino: {dest}</Text>
				<Text style={styles.timeStyle}>{timeString}</Text>
			</View>
		);
	}
}

const styles = {
	cellStyle: {
		borderBottomColor: 'grey',
		borderBottomWidth: 1
	},
	destStyle: {
		fontWeight: 'bold',
		paddingLeft: 10,
		paddingTop: 10,
		fontSize: 16
	},
	timeStyle: {
		color: Constants.blueColor,
		fontWeight: 'bold',
		fontSize: 15,
		paddingLeft: 10,
		paddingTop: 10,
		paddingBottom: 15
	}
};

export default BusListItem;