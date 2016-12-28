

export function companys(state = [],action){

	switch(action.type){

	case 'GET_COMPANYS_LOADING':{
		return state;
	}

	case 'SET_COMPANYS_DATA':{
		return action.data;
	}

	case 'LOAD_COMPANYS_REQUEST':{
		return {...state};
	}

	case 'LOAD_COMPANYS_SUCCESS':{
		console.log('------response',action.response);
		return {...state,...action.response};
	}

	case 'LOAD_COMPANYS_ERROR':{
		return action.error;
	}

	default:{
		return state;
	}

	}
}








