import {Actions} from 'react-native-router-flux';
import { parseTimeFromStopNumber } from '../parser/EMTParser';
import {AsyncStorage} from 'react-native';
import Constants from '../Constants';

export const busNumberChanged = (text) => {
	return {
		type: 'BUS_NUMBER_CHANGED',
		payload: text
	};
};


export const searchStop = (text) => {
	return (dispatch) => {
		dispatch({type: 'SEARCH_STOP_NUMBER'});

		parseTimeFromStopNumber(text, function(results){
			if (results.status){
				dispatch({
					type: 'GOT_STOP_RESULTS',
					payload: results.payload
				});
				//GO TO DETAIL SCENE.
				Actions.busTimes();
			}else{
				console.log(results.payload.error);
				dispatch({
					type: 'ERROR_RESULTS'
				});
			}

		});
	};
};

export const resetFavorite = () => {
	return {
		type: 'REMOVE_FAVORITE'
	};
};

export const checkFavorite = (arrives) => {
	return (dispatch) => {
		var stopNumber = arrives[0].IdStop[0];
		AsyncStorage.getItem(Constants.favoritesKey).then((object) => { 
			if (object != "null" && object){
				//lets check.

				var myArray = JSON.parse(object);
				console.log(myArray);
				var finished = false;
				myArray.forEach((value) => {
					var myStop = value.stopNumber;
					if (stopNumber == myStop){
						console.log("stopNumber "+stopNumber+" is equal to: "+myStop);
						dispatch({type: 'ADD_FAVORITE'});
						finished = true;
					}
				});
				
				if (!finished){
					console.log("REMOVE FAV");
					dispatch({type: 'REMOVE_FAVORITE'});
				}
				
			}else{
				//not favorited.
				console.log("REMOVE FAV not favorited");
				dispatch({type: 'REMOVE_FAVORITE'});
			}
		});
	}
}


export const addFavorite = (arrives) => {

	//fav: {stopNumber:'XX', lines: 'XX,XX,XX', customName:''}
	return (dispatch) => {
		var stopNumber = arrives[0].IdStop[0];
		//We have an array of favorites. [{...}, {....}]
		AsyncStorage.getItem(Constants.favoritesKey).then((object) => {
			if (object != "null" && object){
				var myArray = JSON.parse(object);

				//is it new or is it a delete?
				var isADelete = false;
				var index = 0;
				myArray.forEach((value) => {
					var copyArray = myArray;
					var myStop = value.stopNumber;
					if (stopNumber == myStop){
						isADelete = true;
						//it's a delete.
						copyArray.splice(index, 1);
						if (copyArray.length == 0){
							AsyncStorage.setItem(Constants.favoritesKey, "null").then(() => {
								dispatch({type: 'REMOVE_FAVORITE'});
								return;
							});
						}else{
							AsyncStorage.setItem(Constants.favoritesKey, JSON.stringify(copyArray)).then(() => {
								dispatch({type: 'REMOVE_FAVORITE'});
								return;
							});
						}	
					}
					index += 1;
				});
				//it's new.
				if (!isADelete){
					var myLinesArray = [];
					arrives.forEach((value) => {
						var idLine = value.idLine[0];
						if (myLinesArray.indexOf(idLine) <= -1){
							myLinesArray.push(idLine);
						}
					});
					var myFav = {stopNumber: stopNumber, lines: myLinesArray.join(), customName: ''};

					myArray.push(myFav);
					AsyncStorage.setItem(Constants.favoritesKey, JSON.stringify(myArray));
					dispatch({type: 'ADD_FAVORITE'});
				}
				

			}else{
				var myLinesArray = [];
				arrives.forEach((value) => {
					var idLine = value.idLine[0];
					if (myLinesArray.indexOf(idLine) <= -1){
						myLinesArray.push(idLine);
					}
				});
				var myFav = {stopNumber: stopNumber, lines: myLinesArray.join(), customName: ''};

				var array = [];
				array.push(myFav);
				AsyncStorage.setItem(Constants.favoritesKey, JSON.stringify(array));
				dispatch({type: 'ADD_FAVORITE'});
			}
		});
	}
	

	
};