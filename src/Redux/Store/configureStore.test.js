import { createStore,combineReducers,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import {Reducers} from '../Modules';

import initState from '../State';

import  callAPIMiddleware from '../Middlewares/callAPIMiddleware';


const loggerMiddleware = createLogger();


function configureStore(initialState) {

	let store = createStore(combineReducers(Reducers), initState, applyMiddleware(
		thunkMiddleware,callAPIMiddleware
	));

		//thunkMiddleware, loggerMiddleware ,callAPIMiddleware

    return store
}

  
module.exports = configureStore(initState);
