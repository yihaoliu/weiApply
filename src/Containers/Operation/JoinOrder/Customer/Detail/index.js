import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {reduxForm } from 'redux-form';
import Section from 'kr-ui/Section';
import {KrField} from 'kr-ui';


import {Grid,Row,Col} from 'kr-ui/Grid';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';



var JoinForm = (props) => {

  const { error, handleSubmit, pristine, reset, submitting,submit} = props;

  return (

    <form onSubmit={handleSubmit(submit)}>


				<Grid style={{marginTop:30}}>

					<Row>
						<Col md={12} > <KrField name="username" type="text" label="客户名称" /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="username" type="text" label="订单类型" /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="username" type="text" label="所在社区" /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="username" type="text" label="所在城市" /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="username" type="text" label="订单名称" /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="username" type="text" label="订单编号" /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="username" type="textarea" label="订单描述" /> </Col>
					</Row>



				</Grid>



				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={10}></Col>
						<Col md={1}> <RaisedButton  label="确定" type="submit" joinEditForm /> </Col>
						<Col md={1}> <RaisedButton  label="取消" type="submit"  /> </Col>
					</Row>
				</Grid>


		  {/*
			<FlatButton label="重置" joinEditForm onTouchTap={reset} disabled={pristine || submitting} />
		  */}

    </form>

  )
}

JoinForm = reduxForm({
  form: 'joinForm'
})(JoinForm);




var SubmitValidationForm = (props) => {

  const { error, handleSubmit, pristine, reset, submitting,submit,cancel } = props;

  return (

    <form onSubmit={handleSubmit(submit)}>

      <KrField name="username" type="text" label="用户名" />
      <KrField name="name" type="text" label="hahah" />



				<Grid style={{marginTop:30}}>

					<Row>

						<Col md={8}></Col>
						<Col md={2}> <RaisedButton  label="确定" type="submit" joinEditForm /> </Col>
						<Col md={2}> <FlatButton label="取消"  onTouchTap={cancel} /> </Col>

					</Row>

				</Grid>


		  {/*
			<FlatButton label="重置" joinEditForm onTouchTap={reset} disabled={pristine || submitting} />
		  */}

    </form>

  )
}

SubmitValidationForm = reduxForm({
  form: 'submitValidation'
})(SubmitValidationForm);


export default class JoinEdit extends Component {

	constructor(props,context){
		super(props, context);


		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.confirmJoinSubmit = this.confirmJoinSubmit.bind(this);

		this.state = {
			open:false,
		}

	}

	confirmJoinSubmit(values){
		console.log('---',values);
	}

	confirmSubmit(values){
		console.log('---',values);
		this.setState({open: false});
	}
	handleOpen(){
		this.setState({open: true});
	}

	handleClose(values){
		console.log('---',values);
		this.setState({open: false});
	}

  render() {

			 const actions = [
				  <FlatButton
					label="Cancel"
					joinEditForm
					onTouchTap={this.handleClose}
				  />,
				  <FlatButton
					label="Submit"
					joinEditForm
					onTouchTap={this.handleClose}
				  />,
				];

    return (

      <div>
			<Section title="客户信息编辑" description="">
				<JoinForm  submit={this.confirmJoinSubmit}/>
			</Section>

			<RaisedButton label="Modal Dialog" onTouchTap={this.handleOpen} />

			<Dialog
				title="表单提交"
				modal={true}
				open={this.state.open}
			>
				<SubmitValidationForm ref="formdata" submit={this.confirmSubmit} cancel={this.handleClose}/>


			</Dialog>


			</div>
	);
  }
}
