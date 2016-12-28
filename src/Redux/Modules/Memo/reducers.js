import * as Types from './types';

export function memo(state = {},action){

	switch(action.type){

	case Types.LOAD_MEMO_REQUEST:{
		return {...state};
	}

	case Types.LOAD_MEMO_SUCCESS:{
		return {...state,...action.response};
	}

	case Types.LOAD_MEMO_ERROR:{
		return {...state};
	}

	default:{
		return state;
	}

	}
}













