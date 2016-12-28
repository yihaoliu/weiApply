function callAPIMiddleware({dispatch,getState}){

	return function(next){

		return function(action){

			const {
				types,
				callAPI,
				shouldCallAPI = ()=>true,
				payload= {}
			} = action;

			if(!types){
				return next(action);
			}

			if(!Array.isArray(types) ||
				types.length !==3 ||
				!types.every(type => typeof type === 'string')){
					throw new Error('参数有问题');
			}

			if(!shouldCallAPI(getState())){
				return ;
			}

			const [requestType,successType,failureType] = types;

			dispatch(Object.assign({},payload,{
				type:requestType
			}));


			return new Promise((resolve, reject) => {

				callAPI().then(function(response){

					dispatch(Object.assign({},payload,{
						type:successType,
						response:response
					}));

				}).then(function(err){

					dispatch(Object.assign({},payload,{
						type:failureType,
						error:err
					}))

				});
				/*
				callAPI().then(

					response=>dispatch(Object.assign({},payload,{
						type:successType,
						response:response
					})),

					error=>dispatch(Object.assign({},payload,{
						type:failureType,
						error:error
					}))

				);
				*/

			});



		}

	}


}




module.exports = callAPIMiddleware;
