import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import Section from 'kr-ui/Section';
import Calendar from 'kr-ui/Calendar';

import ContentInbox from 'material-ui/svg-icons/content/inbox';

import ActionDateRange from 'material-ui/svg-icons/action/date-range';

import {blue500, yellow600,red500,pink500,purple500} from 'material-ui/styles/colors';

import HardwarekeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';


import Formsy from 'formsy-react';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';


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
	Dialog,
	FlatButton,
	TextField,
	TimePicker,
	SelectField,
	Paper,
	Avatar,
	Subheader,
} from 'material-ui';

import {List, ListItem} from 'material-ui/List';

import './index.less';

class PlanManage extends Component{


	constructor(props,context){

		super(props, context);

		this.calendarChange = this.calendarChange.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.confirmSubmit = this.confirmSubmit.bind(this);

		this.renderPlan = this.renderPlan.bind(this);

		var {actions} = this.props;

		this.state = {
			open:false,
		}

		this.styles =  {
			paperStyle: {
				width: 300,
				margin: 'auto',
				padding: 20,
			},
			switchStyle: {
				marginBottom: 16,
			},
			submitStyle: {
				marginTop: 32,
			},
		}


		this.errorMessages =  {
			wordsError: "Please only use letters",
			numericError: "Please provide a number",
			urlError: "Please provide a valid URL",
		}

	}



	componentDidMount() {

	}


	calendarChange(value){
		var {actions} = this.props;
		console.log('--->>>',value);
		actions.setNowDate(value);
	}

	openDialog(){

		this.setState({
			open:!this.state.open
		});

	}



	enableButton() {
		this.setState({
			canSubmit: true,
		});
	}

	submitForm(data) {
		console.log(data);
		this.setState({open: false});
		const {actions} = this.props;

		actions.createPlan(data);

	}

	confirmSubmit(){
		var form = this.refs.myForm;
		form.submit();
	}

	closeDialog(){
		this.setState({open: false});
	}

	renderPlan(){

		if(!this.props.plan.now_trip.length){
			return null;
		}

		return (
			<Paper zDepth={1} style={{marginTop:20}}>
				<List>
					<Subheader>日程</Subheader>
					<Divider />
					{this.props.plan.now_trip.map((item,index)=>{
						return <ListItem primaryText={item.title} key={index} 
						leftIcon={
							<Avatar icon={<ActionAssignment />} backgroundColor={yellow600}  color="#fff" size={25}/>
						}
						rightIcon={<HardwarekeyboardArrowDown />} 
						/>
					})}
				</List>
			</Paper>
		);
	}

	render(){

		let {paperStyle, switchStyle, submitStyle } = this.styles;
		let { wordsError, numericError, urlError } = this.errorMessages;

		const actions = [
			<FlatButton
			label="取消"
			joinEditForm
			onTouchTap={this.closeDialog}
			/>,
			<FlatButton
			label="提交"
			joinEditForm
			keyboardFocused={true}
			onTouchTap={this.confirmSubmit}
			/>
		];


		return(
			<div>
			<Section title="日程管理"
				description=""
				leftIcon= {
					<Avatar icon={<ActionDateRange  />}  backgroundColor={purple500} size={25}/>
				}
				rightMenu = {
					<Menu>
					<MenuItem primaryText="写备忘" onTouchTap={this.openDialog} />
					<MenuItem primaryText="其他" />
					</Menu>
				} >

			<Calendar value={this.props.now_date} onChange={this.calendarChange} active={true} items={this.props.items} />

			
			{this.renderPlan()}
			

			</Section>

			<Dialog
			title="写备忘"
			modal={false}
			open={this.state.open}
			onRequestClose={this.closeDialog}
			autoScrollBodyContent={true}
			actions={actions}
			>

			<div className="form">

			<Formsy.Form
			onValidSubmit={this.submitForm}
			ref="myForm"
			>

			<div className="form-group">
				<label for="" className="label-control">备忘内容</label>
				<div className="form-control">
					<FormsyText
						name="content"
						required
						fullWidth
						hintText="备忘内容" />
				</div>
			</div>

			<div className="form-group">
				<label for="" className="label-control">时间</label>
				<div className="form-control">
						<FormsyDate
						name="date"
						required
						hintText="日期"
						okLabel="确定"
						cancelLabel="取消"
						/>
				</div>

				<div className="item">
					<FormsyTime
					name="time"
					hintText="时间"
					required
					okLabel="确定"
					cancelLabel="取消"
					/>
				</div>

			</div>

				</Formsy.Form>
			</div>

				</Dialog>

				</div>

		);

	}

}







function mapStateToProps(state){

	return {
		plan:state.plan,
		items:state.plan.items,
		now_date:state.plan.now_date
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(PlanManage);

