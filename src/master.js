import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';

import {Actions,Store,connect} from 'kr/Redux';

import  './Styles/index.less';

import Header from './Components/Global/Header';
import Footer from './Components/Global/Footer';

class Master extends Component {


	static childContextTypes =  {
          params: React.PropTypes.object.isRequired,
          //router: React.PropTypes.object.isRequired
  }

	getChildContext() {
				return {
					params:this.props.params,
					//router:this.props.router
				};
	 }


	constructor(props,context){
		super(props, context);

		Store.dispatch(Actions.callAPI('getSelfMenuInfo',{})).then(function(response){
			Store.dispatch(Actions.setUserNavs(response.navcodes));
			Store.dispatch(Actions.setUserBasicInfo(response.user));
		}).catch(function(err){

	   	});
	}

	componentWillMount() {


	}

	componentDidMount(){
	}

	componentWillReceiveProps(nextProps, nextContext) {

	}

	render() {



		var styles = {};

		var {switch_value} = this.props.sidebar_nav;

		if(switch_value){
			styles = {
				marginLeft:180,
			}
		}

		if(!this.props.header_nav.switch_value){
			styles.marginTop = 0;
		}

		return (
			<div className="app-container">
			<Header/>

			<div className="container" style={styles}>
			{this.props.children}
			</div>
					<Footer/>
			<div id="nowtify-wrapper"></div>

			</div>
		);
	}
}

export default connect((state)=>{
	return {
		header_nav:state.header_nav,
		sidebar_nav:state.sidebar_nav
	};
})(Master);
