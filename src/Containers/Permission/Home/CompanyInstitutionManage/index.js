import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import Section from 'kr-ui/Section';
import Calendar from 'kr-ui/Calendar';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ImageAssistantPhoto from 'material-ui/svg-icons/image/assistant-photo';

import {blue500, yellow600,red500,pink500,purple500,deepPurple500} from 'material-ui/styles/colors';

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

class CompanyInstitutionManage extends Component{

	constructor(props,context){

		super(props, context);


	}

	componentDidMount() {

	}

	render(){

		return(
					<Section title="公司制度" description="" 

						leftIcon= {
							<Avatar icon={<ImageAssistantPhoto />} backgroundColor={deepPurple500}size={25}/>
						}
						rightMenu = {
							<Menu>
								  <MenuItem primaryText="其他" />
							</Menu>
						} >
							<List>
							<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
							<ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
							<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
							</List>
					</Section>


		);

	}

}







function mapStateToProps(state){

	return {
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(CompanyInstitutionManage);















