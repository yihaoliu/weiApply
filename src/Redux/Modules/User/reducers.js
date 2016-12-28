import * as Types from './types';

export function user(state = {},action){

	switch(action.type){

	case Types.SET_USER_BASIC_INFO:{
		return {...state,...action.response};
	}


	default:{
		return state;
	}

	}
}

