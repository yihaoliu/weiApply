import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import Section from 'kr-ui/Section';
import Calendar from 'kr-ui/Calendar';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionInvertColors from 'material-ui/svg-icons/action/invert-colors';
import ImageAssistantPhoto from 'material-ui/svg-icons/image/assistant-photo';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionSpeakerNotes from 'material-ui/svg-icons/action/speaker-notes';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';

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
	Paper,
	Avatar,
} from 'material-ui';

import {List, ListItem} from 'material-ui/List';

import './index.less';

class PlanManage extends Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount() {

		const {actions} = this.props;
		actions.createPlan().then(function(response){
		});
	}

	render(){

		const style = {
			height: 90,
			width: 90,
			margin: 10,
			textAlign: 'center',
		};

		return(
			<div>

					<Section title="我的常用" description=""

							leftIcon= {
								<Avatar icon={<ActionInvertColors />} backgroundColor={pink500} size={25}/>
							}
							rightMenu = {
								<Menu>
									  <MenuItem primaryText="新增" />
									  <MenuItem primaryText="其他" />
								</Menu>
							} >

							<div className="list">

									<Paper style={style} zDepth={1} circle={true}  >
										<Avatar icon={<ActionInvertColors />} backgroundColor={red500} className="item" />
									</Paper>

									<Paper style={style} zDepth={1} circle={true}  >
										<Avatar icon={<ActionDateRange />} backgroundColor={pink500} className="item" />
									</Paper>

									<Paper style={style} zDepth={1} circle={true}  >
										<Avatar icon={<ActionSpeakerNotes />} backgroundColor={purple500} className="item" />
									</Paper>

									<Paper style={style} zDepth={1} circle={true}  >
										<Avatar icon={<ActionAssignment />} backgroundColor={blue500} className="item" />
									</Paper>

									<Paper style={style} zDepth={1} circle={true}  >
										<Avatar icon={<ImageAssistantPhoto />}   backgroundColor={yellow600}   className="item" />
									</Paper>
							</div>
					</Section>


			</div>
		);

	}

}



function mapStateToProps(state){

	return {
		calendar:state.plan,
		now_date:state.plan.now_date
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(PlanManage);
