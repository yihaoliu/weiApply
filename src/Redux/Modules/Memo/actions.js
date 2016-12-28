import fetch from 'node-fetch';
import * as Types from './types';

export function loadMemo(companyId){

	return {
		types:[Types.LOAD_MEMO_REQUEST,Types.LOAD_MEMO_SUCCESS,Types.LOAD_MEMO_FAILURE],
		//shouldCallAPI:(state)=>state.companys
		callAPI:()=>fetch('demo').then(function(response){
			return response.json();
		}),
		payload:{}
	}

}









