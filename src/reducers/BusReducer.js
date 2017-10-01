const INITIAL_STATE = { busStopNumber: '', loading: false, arrives: {}};

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
		default:
			return state;
	}
};