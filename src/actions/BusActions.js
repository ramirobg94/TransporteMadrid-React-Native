import {Actions} from 'react-native-router-flux';
import { parseTimeFromStopNumber } from '../parser/EMTParser';

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