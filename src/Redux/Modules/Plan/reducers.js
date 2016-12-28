import * as Types from './types';

export function plan(state = {},action){

	switch(action.type){

		case Types.SET_NOW_DATE:{
			const {items} = state;
			const nowDate = action.response;

			let nowTrip = [];
			nowTrip = items.filter(function(item){
				return  item.createAt == nowDate;
			});

			return {...state,...{now_date:+new Date(action.response.split('-').join()),now_trip:nowTrip}};
		}

	case Types.LOAD_PLAN_REQUEST:{
		return {...state};
	}

	case Types.LOAD_PLAN_SUCCESS:{
		return {...state,...action.response};
	}

	case Types.LOAD_PLAN_FAILURE:{
		//return action.error;
		return {...state};
	}

	case Types.CREATE_PLAN_REQUST:{
		return {...state};
	}

	case Types.CREATE_PLAN_SUCCESS:{
		const {items} = state;
		items.push(action.response);
		return {...state,...{items}};
	}

	case Types.CREATE_PLAN_FAILURE:{
		return {...state};
		//return action.error;
	}

	default:{
		return state;
	}

	}
}

