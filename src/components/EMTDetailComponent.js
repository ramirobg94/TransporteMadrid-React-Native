import React, {Component} from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import Constants from '../Constants';
import BusListItem from './BusListItem';


class EMTDetailComponent extends Component {

	componentWillMount() {
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2});
		this.dataSource = ds.cloneWithRowsAndSections(this.mapArrives());

	}

	mapArrives() {
		var myMap = {};
		var myArrives = this.props.arrives;
		myArrives.forEach(function(item){
			var myLine = item.idLine[0];
			if (!myMap[myLine]){
				myMap[myLine] = [];
			}
			myMap[myLine].push(item);
		});

		return myMap;

	}

	renderRow(arrive){
		return  <BusListItem arrive={arrive} />;
	}

	renderSectionHeader(data, id){
		return (
			<View>
				<Text style={styles.sectionHeaderStyle}>
					Línea {id}
				</Text>
			</View>
			
		);
	}

	render() {
		return (
			<ListView 
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
				renderSectionHeader={this.renderSectionHeader}
			/>
		);
	}
};

const styles = {
	sectionHeaderStyle: {
		fontSize: 18,
		padding: 5,
		fontWeight: 'bold',
		backgroundColor: Constants.blueColor,
		color: 'white'
	}
};


const mapStateToProps = (state) => {
	const { arrives } = state.bus;
	return { arrives };
};

export default connect(mapStateToProps, {})(EMTDetailComponent);