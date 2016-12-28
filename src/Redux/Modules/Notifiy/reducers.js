import * as Types from './types';


export function notify(state = [],action){

	switch(action.type){

		case Types.LOAD_DEMO_REQUEST:{
			return {...state};
		}

		case Types.LOAD_DEMO_SUCCESS:{
			return {...state,...action.response};
		}

		case Types.LOAD_DEMO_FAILURE:{
			return {...state};
			//return action.error;
		}

		default:{
			return state;
		}

	}
}













