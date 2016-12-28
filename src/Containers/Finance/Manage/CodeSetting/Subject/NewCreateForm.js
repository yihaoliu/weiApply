
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
} from 'kr-ui';


 class NewCreateForm extends Component{

	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
	 }

	constructor(props){
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);


		Store.dispatch(reset('newCreateForm'));
		Store.dispatch(change('newCreateForm','enableflag','ENABLE'));
		
	}

	 onSubmit(values){
		 const {onSubmit} = this.props;
		 onSubmit && onSubmit(values);
	 }

	 onCancel(){
		 const {onCancel} = this.props;
		
		 onCancel && onCancel();
		 
	 }

	render(){

		const { error, handleSubmit, pristine, reset} = this.props;

		return (

			<form onSubmit={handleSubmit(this.onSubmit)}>

				<KrField grid={1/2} name="accountcode" type="text" label="科目编码" requireLabel={true}/> 
				<KrField grid={1/2} name="accountname" type="text" label="科目名称" requireLabel={true}/> 
				<KrField grid={1/2} name="accounttype" type="select" label="科目类别" options={[
						{value:'INCOME',label:'收入'},
						{value:'PAYMENT ',label:'回款'},
				]} requireLabel={true}>
				</KrField>
				<KrField grid={1/2} name="ordernum" type="text" label="排序号" requireLabel={true}/> 
				<KrField grid={1/2} name="enableflag" component="group" label="是否启用" requireLabel={true}>
						<KrField name="enableflag" grid={1/2} label="是" type="radio" value="ENABLE"/>
						<KrField name="enableflag" grid={1/2} label="否" type="radio" value="DISENABLE" />
              </KrField> 
				<KrField name="accountdesc" component="textarea" label="描述"  /> 

				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
							<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
							<Button  label="取消" type="button"  cancle={true}  onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>	

				</form>
		);
	}
}

const validate = values =>{

		const errors = {}

		if(!values.accountcode){
			errors.accountcode = '请填写科目编码';
		}

		if (!values.accountname) {
			errors.accountname = '请填写科目名称';
		}

		if (!values.accounttype) {
			errors.accounttype = '请填写科目类别';
		}

		if (!values.ordernum) {
			errors.ordernum = '请填写排序号';
		}

		return errors
	}
export default reduxForm({ form: 'newCreateForm',validate, enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCreateForm);
