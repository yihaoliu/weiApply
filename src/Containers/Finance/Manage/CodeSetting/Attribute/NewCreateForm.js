
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

	}
	 componentDidMount(){
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

				<KrField grid={1/2} name="propcode" component="input" label="属性编码" requireLabel={true}/> 
				<KrField grid={1/2} name="propname" component="input" label="属性名称" requireLabel={true}/>
				<KrField grid={1/2} name="proptype" component="select" label="属性类别" options={[
						{value:'PAYMENT',label:'回款'},
					   {value:'INCOME',label:'收入'},
				]} requireLabel={true}>
				</KrField>
				<KrField grid={1/2} name="ordernum" type="text" label="排序号" requireLabel={true}/>
				<KrField grid={1/2} name="enableflag" component="group" label="是否启用" requireLabel={true}>
                	<KrField name="enableflag" label="是" type="radio" value="ENABLE" checked={true}/>
               		 <KrField name="enableflag" label="否" type="radio" value="DISENABLE" />
              </KrField>
				<KrField name="propdesc" component="textarea" label="描述"  />

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

		if(!values.propcode){
			errors.propcode = '请填写属性编码';
		}

		if (!values.propname) {
			errors.propname = '请填写属性名称';
		}

		if (!values.proptype) {
			errors.proptype = '请填写属性类别';
		}

		if (!values.ordernum) {
			errors.ordernum = '请填写排序号';
		}



		return errors
	}
export default reduxForm({ form: 'newCreateForm',validate, enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCreateForm);
