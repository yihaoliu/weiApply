import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {Binder} from 'react-binding';

import {reduxForm,formValueSelector,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
} from 'kr-ui';

class UnitPriceForm  extends Component{

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func
	}

	constructor(props,context){
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

	}

	onSubmit(form){
		const {onSubmit} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel(){
		const {onCancel} = this.props;
		onCancel  && onCancel();
	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting} = this.props;

		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField grid={1}  name="price" component="input" type="text" label="单价"/>
					<Grid>
						<Row style={{marginTop:30}}>
							<Col md={2} align="right"> <Button  label="确定" type="submit" /> </Col>
						  <Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
					</Grid>
				</form>
			</div>);
	}
}

export default reduxForm({form:'unitPriceForm',enableReinitialize:true,keepDirtyOnReinitialize:true})(UnitPriceForm);
