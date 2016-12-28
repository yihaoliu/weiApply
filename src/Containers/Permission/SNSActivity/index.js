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

class Notify extends Component{

	constructor(props,context){

		super(props, context);


	}

	componentDidMount() {

	}

	render(){

		return(

					<Section title="通知公告" description=""
							rightMenu = {
								<Menu>
									  <MenuItem primaryText="排序" />
									  <MenuItem primaryText="更多" onTouchTap={this.toNotifyPage} />
								</Menu>
							} >

								<Table>

									<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
									  <TableRow>
										<TableHeaderColumn>公告标题</TableHeaderColumn>
										<TableHeaderColumn>发布人</TableHeaderColumn>
										<TableHeaderColumn>发布时间</TableHeaderColumn>
									  </TableRow>
									</TableHeader>
									<TableBody displayRowCheckbox={false}>

									{this.props.items.map((item,index)=>{

										return (
											<TableRow key={index}>
												<TableRowColumn>{item.content}</TableRowColumn>
												<TableRowColumn>{item.author}</TableRowColumn>
												<TableRowColumn>{item.createAt}</TableRowColumn>
											</TableRow>
										);

									})}
									</TableBody>
								  </Table>
					</Section>

				

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

export default connect(mapStateToProps,mapDispatchToProps)(Notify);















