import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import {
	Binder
} from 'react-binding';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray
} from 'redux-form';

import {
	Actions,
	Store
} from 'kr/Redux';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ListGroup,
	ListGroupItem
} from 'kr-ui';

class UnitPriceForm extends Component {

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func
	}

	constructor(props, context) {
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

	}

	onSubmit(form) {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	render() {

		let {
			error,
			handleSubmit,
			pristine,
			reset,
			submitting
		} = this.props;

		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:45}}>
					<KrField style={{width:250,marginLeft:60}}   name="price" component="input" type="text" label="单价" requireLabel={true}/><span style={{marginTop:35,marginLeft:10,display:'inline-block'}}> 元/月</span>
					<Grid style={{margin:'20px 0 6px'}}>
						<ListGroup>
							<ListGroupItem style={{width:'47%',textAlign:'right',padding:0,paddingRight:10}}> <Button  label="确定" type="submit" /></ListGroupItem>
							<ListGroupItem style={{width:'46%',textAlign:'left',padding:0,paddingLeft:10}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/></ListGroupItem>
						</ListGroup>
					</Grid>
				</form>
			</div>);
	}
}

export default reduxForm({
	form: 'unitPriceForm',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(UnitPriceForm);