import fetch from 'node-fetch';
import * as Types from './types';

export function loadNotify(){

	return {
		types:[Types.LOAD_DEMO_REQUEST,Types.LOAD_DEMO_SUCCESS,Types.LOAD_DEMO_FAILURE],
		//shouldCallAPI:(state)=>state.companys
		callAPI:()=>fetch('http://rong.36kr.com/api/company').then(function(response){
			return response.json();
		}),
		payload:{}
	}

}









