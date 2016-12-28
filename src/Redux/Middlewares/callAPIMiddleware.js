import http from 'kr/Redux/Utils/fetch';
import Promise from 'promise-polyfill';
import ES6Promise from 'es6-promise';

ES6Promise.polyfill();


function callAPIMiddleware({dispatch,getState}){

	return function(next){

		return function(action){

			const {
				types,
				apiName,
				request,
				payload= {}
			} = action;

			if(!types){
				return next(action);
			}

			if(!Array.isArray(types) ||
				types.length !==3 ||
				!types.every(type => typeof type === 'string')){
					//throw new Error('参数有问题');
			}

			if(!apiName){
				//throw new Error('参数有问题');
			}

			const [requestType,successType,failureType] = types;



			//获取数据

			dispatch(Object.assign({},payload,{
				type:requestType,
				name:apiName
			}));

			return new Promise((resolve, reject) => {


				http.request(apiName,request,payload).then(function(response){
					
					dispatch(Object.assign({},payload,{
						type:successType,
						response:response,
						name:apiName
					}));

					resolve(response);

				}).catch(function(err){

					dispatch(Object.assign({},payload,{
						type:failureType,
						error:err,
						name:apiName
					}))
					reject(err);
				});
			});

		}

	}


}

module.exports = callAPIMiddleware;
