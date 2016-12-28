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





 class SearchUpperForm extends Component{

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
				<KrField grid={1/2} right={25} style={{marginTop:-10}} name="groupName" type="text" label="分组名称"  />
				<KrField grid={1/2} right={25} style={{marginTop:-10}} name="enable" type="select" label="启用状态" options={[ {value:'ENABLE',label:'启用'}, {value:'DISABLE',label:'禁用'}, ]}  />





				<Grid style={{marginTop:15,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit"  /></div>
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
		



		return errors
	}
const selector = formValueSelector('newCreateForm');



export default reduxForm({ form: 'SearchUpperForm', validate,enableReinitialize:true, keepDirtyOnReinitialize:true })(SearchUpperForm);
