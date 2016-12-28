import fetch from 'node-fetch';
import param from 'jquery-param';



export function switchHeaderNav(value){
	return{
		type:'SWITCH_HEADER_NAV',
		data:value
	}
}


export function switchSidebarNav(value){
	return{
		type:'SWITCH_SIDEBAR_NAV',
		data:value
	}
}

export function switchBottomNav(value){

	return{
		type:'SWITCH_BOTTOM_NAV',
		data:value
	}

}



















