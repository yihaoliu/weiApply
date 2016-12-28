import {fetch} from '../../Utils';
import * as Types from './types';

export function loadPlan(companyId){

	return {
		types:[Types.LOAD_PLAN_REQUEST,Types.LOAD_PLAN_SUCCESS,Types.LOAD_PLAN_FAILURE],
		//shouldCallAPI:(state)=>state.companys
		callAPI:()=>fetch.get('demo'),
		payload:{}
	}

}


export function createPlan(request){
	return {
		types:[Types.CREATE_PLAN_REQUEST,Types.CREATE_PLAN_SUCCESS,Types.CREATE_PLAN_FAILURE],
		//shouldCallAPI:(state)=>state.companys
		callAPI:()=>fetch.get('demo'),
		payload:{
			...request
		}
	}

}

export function setNowDate(nowDate){
	return {
		type:Types.SET_NOW_DATE,
		response:nowDate
	}
}











