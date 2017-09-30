import { combineReducers } from 'redux';
import BusReducer from './BusReducer';

export default combineReducers({
	//add here.
	bus: BusReducer
});