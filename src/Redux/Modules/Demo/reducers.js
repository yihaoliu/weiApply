import fetch from 'node-fetch';

export function sidebar_nav (state={},action){

	switch(action.type){

		case 'SWITCH_SIDEBAR_NAV':{
			return Object.assign({},state,{switch_value:action.data});
		}

		default:{
			return state;
		}
	}
}

export function header_nav (state={},action){

	switch(action.type){

		case 'SWITCH_HEADER_NAV':{
			return Object.assign({},state,{switch_value:action.data});
		}

		default:{
			return state;
		}
	}
}

export function bottom_nav (state={},action){

	switch(action.type){

		case 'SWITCH_BOTTOM_NAV':{
			return Object.assign({},state,{...action.data});
		}

		default:{
			return state;
		}
	}
}






