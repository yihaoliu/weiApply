import fetch from 'node-fetch';
import param from 'jquery-param';

export function loadCompanys(companyId){

	return {
		types:['LOAD_COMPANYS_REQUEST','LOAD_COMPANYS_SUCCESS','LOAD_COMPANYS_FAILURE'],
		//shouldCallAPI:(state)=>state.companys
		callAPI:()=>fetch('http://rong.36kr.com/api/company').then(function(response){
			return response.json();
		}),
		payload:{}
	}

}







