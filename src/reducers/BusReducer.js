const INITIAL_STATE = { busStopNumber: '', loading: false, arrives: {}, isFavorite: false};

export default (state = INITIAL_STATE, action) => {
	switch (action.type){
		case 'BUS_NUMBER_CHANGED':
			return {...state, busStopNumber: action.payload};
		case 'SEARCH_STOP_NUMBER':
			return {...state, loading: true};
		case 'GOT_STOP_RESULTS':
			return {...state, arrives: action.payload, loading:false};
		case 'ERROR_RESULTS':
			//TODO!
			return {...state};
		case 'ADD_FAVORITE':
			return {...state, isFavorite: true};
		case 'REMOVE_FAVORITE':
			return {...state, isFavorite: false};
		default:
			return state;
	}
};