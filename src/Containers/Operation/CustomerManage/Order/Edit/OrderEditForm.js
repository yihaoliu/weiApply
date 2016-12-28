import React, {
	Component,
	PropTypes
} from 'react';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';


import {
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Notify,
	Button,
	KrDate,
	DotTitle,
	ButtonGroup,
	Paper,
	ListGroup,
	ListGroupItem
} from 'kr-ui';

class OrderEditForm extends Component {
	static propTypes = {
		initialValues: React.PropTypes.object,
		communityOptions: React.PropTypes.array,
		orderTypeOptions: React.PropTypes.array,
	}

	constructor(props, context) {
		super(props, context);
	}

	onSubmit = (values) => {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(values);
	}
	onCancel = () => {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}



	render() {

		const {
			error,
			handleSubmit,
			submitting,
			initialValues,
			communityOptions,
			orderTypeOptions,
			changeValues
		} = this.props;
		let cityName = '';
		let dicName = '';
		communityOptions.map(function(item) {
			if (item.communityId == changeValues.communityid) {
				cityName = item.cityName;
			}
		});


		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{padding:20}}>

			<KrField name="customerName" grid={1} label="客户名称" component="labelText" disabled={true} value={initialValues.customerName} inline={false}/>

			 <KrField name="mainbilltype" grid={1/2} right={30} component="select" label="订单类型" requireLabel={true} inline={false} options={orderTypeOptions}/>

				 <KrField name="communityid" grid={1/2} left={30} component="select" label="所在社区" requireLabel={true} inline={false} options={communityOptions}/>
					<KrField label="所在城市" grid={1/2} right={30} value={cityName||'无'} component="labelText" inline={false}/>
					 <KrField name="mainbillname" grid={1/2} left={30} type="text" label="订单名称" requireLabel={true} component="text" inline={false}/>
					 <KrField name="mainbilldesc" type="textarea" label="订单描述" component="textarea" inline={false}  maxSize={200}/>

					<Grid >
						<ListGroup>
							<ListGroupItem style={{width:'45%',textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" disabled={submitting} /></ListGroupItem>
							<ListGroupItem style={{width:'45%',textAlign:'left',paddingLeft:15}}><Button  label="取消" cancle={true} type="button"  disabled={submitting} onClick={this.onCancel} /></ListGroupItem>
						</ListGroup>
					</Grid>
			</form>
		)
	}
}
const selector = formValueSelector('orderEditForm');
const validate = values => {

	const errors = {}

	if (!values.mainbilltype) {
		errors.mainbilltype = '请选择订单类型';
	} else if (!values.communityid) {
		errors.communityid = '请选择所在社区';
	} else if (!values.mainbillname) {
		errors.mainbillname = '订单名称不能为空';
	}


	return errors
}

OrderEditForm = reduxForm({
	form: 'orderEditForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(OrderEditForm);

export default connect((state) => {

	let changeValues = {};

	changeValues.communityid = selector(state, 'communityid');


	return {
		changeValues
	}

})(OrderEditForm);
