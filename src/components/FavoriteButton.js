import React, { Component } from 'react';
import { Text, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Constants from '../Constants';
import { addFavorite, checkFavorite, resetFavorite } from '../actions';

class FavoriteButton extends Component {
	
	onPressButton(){
		this.props.addFavorite(this.props.arrives);
	}

	componentWillMount(){
		console.log("component will mount with props: "+this.props.arrives);
		this.props.checkFavorite(this.props.arrives);
	}

	componentWillUnmount(){
		this.props.resetFavorite();
	}

	getImage(){
		console.log("getting image. Isfavorite: "+this.props.isFavorite);
		if (this.props.isFavorite){
			console.log("returning filled");
			return (
			  <Image
		        style={styles.button}
		        source={require('../images/star_filled.png')}
		      />
		    );
		}else{
			console.log("returning empty");
			return (
			  <Image
		        style={styles.button}
		        source={require('../images/star_empty.png')}
		      />
		    );
		}
	}

	render(){
		return (
			<TouchableHighlight onPress={this.onPressButton.bind(this)} underlayColor={Constants.blueColor}>
		      {
		      	this.getImage()
		      }
		    </TouchableHighlight>
		);
	}
}

const styles = {
	button: {
		height: 22,
		width: 22,
		marginRight: 10	
	}
}

const mapStateToProps = (state) => {
	const { arrives, isFavorite } = state.bus;
	return { arrives, isFavorite };
};

export default connect(mapStateToProps, { addFavorite, checkFavorite, resetFavorite })(FavoriteButton);