import fetch from 'node-fetch';
import param from 'jquery-param';

import Fetch from 'kr/Redux/Utils/fetch';

export function callAPI(apiName,request,payload){

	return {
		types:['LOAD_COMMON_REQUEST','LOAD_COMMON_SUCCESS','LOAD_COMMON_FAILURE'],
		apiName,
		request,
		payload
	}

}


export function callAjaxAPI(apiName,request,payload){
	return  Fetch.request(apiName,request,payload);
};


export function showModalDialog(url, width, height,param,windowname) {

	var dialogWidth = "350px";
	var dialogHeight = "450px";

	if (typeof(width) != "undefined") {
		dialogWidth = width;
	}

	if (typeof(height) != "undefined") {
		dialogHeight = height;
	}

	var result ;

	if(window.showModalDialog){
		result = window.parent.showModalDialog(url,param, "status:Modeless;edge:raised;unadorned:no;scroll=no;resizable:yes;center=yes;help:no;dialogwidth:" + dialogWidth + ";dialogheight:" + dialogHeight);
	}else {
		var winOption = "height="+dialogHeight+",width="+dialogWidth+",top=100,left=200,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,fullscreen=0";
		result =  window.open(url,windowname?windowname:'_blank', winOption);
		var loop = window.setInterval(function() {     
			if(result.closed) {    

				window.clearInterval(loop);    		  
			}    
		}, 50);
	}

	return result;

}










