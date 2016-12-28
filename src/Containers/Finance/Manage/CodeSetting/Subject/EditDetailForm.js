import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup
} from 'kr-ui';


 class NewCreateForm extends Component{

	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
		 detail:React.PropTypes.object,
	 }

	constructor(props){
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	 componentDidMount(){

		const {detail}= this.props;

		let initialValues = {};
		 initialValues.id = detail.id;
		 initialValues.accountcode = detail.accountcode;
		 initialValues.accountname = detail.accountname;
		 initialValues.accounttype = detail.accounttype;
		 initialValues.enableflag  = detail.enableflag;
		 initialValues.ordernum = detail.ordernum;
		 initialValues.accountdesc = detail.accountdesc;


		Store.dispatch(initialize('newCreateForm',initialValues));
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

				<KrField name="id" type="hidden" label="id"/>
				<KrField grid={1/2} name="accountcode" type="text" label="科目编码" requireLabel={true} disabled={true}/>
				<KrField grid={1/2} name="accountname" type="text" label="科目名称" requireLabel={true}/>
				<KrField grid={1/2} name="accounttype" type="select" label="科目类别" options={[ {value:'PAYMENT',label:'回款'}, {value:'INCOME',label:'收入'}, ]} requireLabel={true} />
				<KrField grid={1/2} name="ordernum" type="text" label="排序号" requireLabel={true}/>
				<KrField grid={1/2} name="enableflag" component="group" label="是否启用" requireLabel={true}>
						<KrField name="enableflag" label="是" component="radio" type="radio" value="ENABLE"/>
						<KrField name="enableflag" label="否"  component="radio"  type="radio" value="DISENABLE" />
			  </KrField>

			<KrField name="accountdesc" component="textarea" label="描述"  />

				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
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
		if (!values.enableflag) {
			errors.enableflag = '请先选择是否启用';
		}


		return errors
	}
const selector = formValueSelector('newCreateForm');



export default reduxForm({ form: 'newCreateForm', validate,enableReinitialize:true, keepDirtyOnReinitialize:true })(NewCreateForm);
