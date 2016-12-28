import {fetch} from '../../Utils';
import * as Types from './types';

export function setUserBasicInfo(response){
	return {
		type:Types.SET_USER_BASIC_INFO,
		response:response
	}
}










