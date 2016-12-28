import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import Section from 'kr-ui/Section';
import Calendar from 'kr-ui/Calendar';

import ContentInbox from 'material-ui/svg-icons/content/inbox';

import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	IconButton,
	RaisedButton,
	Divider,
	FontIcon,
	DatePicker
} from 'material-ui';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {List, ListItem} from 'material-ui/List';

import './index.less';

class Order extends Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount() {

	}

	render(){

		return(

			<div>
					<Section title="帮助中心" description="" >

						遇到疑难杂症了？ok,@joneyphair,马上解决

					</Section>

			</div>
				

		);

	}

}




function mapStateToProps(state){
	return {
		notify:state.notify,
		items:state.notify.items
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Order);












