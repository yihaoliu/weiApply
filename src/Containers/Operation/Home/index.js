import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';


import {List, ListItem} from 'material-ui/List';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ActionInfo from 'material-ui/svg-icons/action/info';


import Section from 'kr-ui/Section';
import './index.less';

import {
	AppBar,
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	IconButton,
	RaisedButton,
	Drawer,
	Divider,
	FontIcon,
	GridList,
	GridTile,
	DatePicker
} from 'material-ui';

class Home extends Component{

	constructor(props,context){
		super(props, context);

		this.state = {
			open:false
		}
	}


	componentDidMount() {

	}

	handleToggle(){

		this.setState({open: !this.state.open});

		var {actions,sidebar_nav} = this.props;

		actions.switchSidebarNav(!!!sidebar_nav.switch_value);

	}


	render() {

		return (

			<div>


			<div className="main">
				<div className="l-sidebar">
				hahahahah
			hhhhh
				</div>

			</div>


			
			
	</div> 

		);
	}
}


function mapStateToProps(state){

	return {
		sidebar_nav:state.sidebar_nav,
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);






