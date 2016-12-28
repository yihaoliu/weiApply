import React,{Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { Link } from 'react-router';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import Section from 'kr-ui/Section';
import Calendar from 'kr-ui/Calendar';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionSpeakerNotes from 'material-ui/svg-icons/action/speaker-notes';

import {blue500, yellow600,red500,pink500,purple500} from 'material-ui/styles/colors';

import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	IconButton,
	RaisedButton,
	Divider,
	FontIcon,
	DatePicker,
	Avatar,
} from 'material-ui';

import {List, ListItem} from 'material-ui/List';

import './index.less';

class PlanManage extends Component{


    static contextTypes = {
        router: PropTypes.object.isRequired
    };

	constructor(props,context){

		super(props, context);
		this.toNotifyPage = this.toNotifyPage.bind(this);


	}

	componentDidMount() {

		var {actions} = this.props;
		actions.loadNotify();

	}

	toNotifyPage(){
		this.context.router.push('/notify');
	}



	render(){


		return(
					<Section title="通知公告" description=""
							leftIcon= {
								<Avatar icon={<ActionSpeakerNotes />} backgroundColor={red500} size={25}/>
							}
							rightMenu = {
								<Menu>
									  <MenuItem primaryText="排序" />
									  <MenuItem primaryText="更多" onTouchTap={this.toNotifyPage} />
								</Menu>
							} >
							<List>

								{this.props.items.map((item,index)=>{
									return <ListItem primaryText={item.content} key={index} leftIcon={<ContentInbox />} />
								})}

								<ListItem primaryText="查看更多" onTouchTap={this.toNotifyPage} />

							</List>
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

export default connect(mapStateToProps,mapDispatchToProps)(PlanManage);







