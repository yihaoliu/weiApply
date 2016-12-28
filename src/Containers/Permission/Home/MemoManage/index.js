import React,{Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import Section from 'kr-ui/Section';
import Calendar from 'kr-ui/Calendar';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionInfo from 'material-ui/svg-icons/action/info';

import {blue500, yellow600,red500,pink500,purple500} from 'material-ui/styles/colors';


import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	IconButton,
	RaisedButton,
	Avatar,
	Divider,
	FontIcon,
	DatePicker
} from 'material-ui';

import {List, ListItem} from 'material-ui/List';

import './index.less';

class MemoManage extends Component{

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

	constructor(props,context){

		super(props, context);

		this.toMore = this.toMore.bind(this);


	}

	componentDidMount() {

	}

	toMore(){
		this.context.router.push('memo');
	}
	render(){

		return(
						<div>

						<Section title="我的备忘" 
							description="" 
							leftIcon= {
								<Avatar icon={<ActionAssignment />} backgroundColor={yellow600} size={25}/>
							}
							rightMenu = {
								<Menu>
									  <MenuItem primaryText="新增" />
									  <MenuItem primaryText="更多" onTouchTap={this.toMore}/>
								</Menu>
							} >

							<List>
								{this.props.items.map((item,index)=>{
									return <ListItem primaryText={item.title} key={index}  rightIcon={<ActionInfo />} />
								})}
							</List>
						</Section>

						</div>

		);

	}

}



function mapStateToProps(state){

	return {
		items:state.plan.items
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(MemoManage);










