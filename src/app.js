import React from 'react';
import ReactDOM from 'react-dom';
import { Router,browserHistory,hashHistory,useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';


import typography from 'material-ui/styles/typography';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500, grey200, darkWhite} from 'material-ui/styles/colors';

import { Provider,connect } from 'react-redux';

import routes from './Configs/routes';

import store from './Redux/Store';

//document.domain = "krspace.cn";

injectTapEventPlugin({
	/*
	shouldRejectClick: function (lastTouchEventTimestamp, clickEventTimestamp) {
		return true;
	}
	*/
});


import * as actionCreators from 'kr-ui/../Redux/Actions';



ReactDOM.render((
	<MuiThemeProvider>
		<Provider store={store} key="provider">
			<Router
				routes={routes}
				history={useRouterHistory(createHashHistory)({queryKey: false})}
				onUpdate={() => {
					window.scrollTo(0, 0)
					store.dispatch(actionCreators.setCurrentNav(window.location.hash));
				}}
				/>
			{/*
			//<Router history={browserHistory} routes={routes} />
			<Router routes={routes} history={hashHistory} />
				*/}
		</Provider>
	</MuiThemeProvider>
), document.getElementById('app'))
