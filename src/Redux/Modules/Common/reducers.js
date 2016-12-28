import * as Types from './types';

const initState = {

	fnaCorporationList:{
		items:[],
		page:'',
		pageSize:''
	}
}
export function common(state = initState,action){

	switch(action.type){

		case Types.LOAD_COMMON_REQUEST:{

			return {...state};
		}

		case Types.LOAD_COMMON_SUCCESS:{

			state[action.name] = action.response;
			return Object.assign({},state);
		}

		case Types.LOAD_COMMON_FAILURE:{
			return {...state};
		}

		default:{
			return state;
		}

	}
}















