import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector
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
	ButtonGroup,
	ListGroup,
	ListGroupItem
} from 'kr-ui';


class NewCreateForm extends Component {

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

	}

	onSubmit(values) {

		values = Object.assign({}, values);

		var _this = this;
		Store.dispatch(Actions.callAPI('addFnaCorporation', {}, values)).then(function(response) {
			Notify.show([{
				message: '新建成功！',
				type: 'success',
			}]);
			const {
				onSubmit
			} = _this.props;
			onSubmit && onSubmit();
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});


	}

	onCancel() {
		const {
			onCancel
		} = this.props;

		onCancel && onCancel();

	}

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		return (

			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:40}}>
							<KrField name="corporationName" grid={1/2} right={10} type="text" label="出租方名称" requireLabel={true}/>

							<KrField name="enableflag" component="group" grid={1/2} left={20} label="是否启用" requireLabel={true}>
							<div className="listRadio">
								<KrField name="enableflag" label="是" component="radio" type="radio" value='ENABLE'/>
								<KrField name="enableflag" label="否" component="radio" type="radio" value='	DISENABLE'/>
							</div>
							</KrField>

							<KrField name="corporationAddress" grid={1/2} right={10} component="text" type="text" label="详细地址" requireLabel={true}/>
							 <KrField name="corporationDesc" component="textarea" label="备注"  placeholder="备注信息"/>


							<Grid style={{marginBottom:10}}>
								<Row>
								<Col md={12}>
									<ListGroup>
										<ListGroupItem style={{width:'45%',textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" joinEditForm height={34}/></ListGroupItem>
										<ListGroupItem style={{width:'45%',textAlign:'left',paddingLeft:15}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} height={34}/></ListGroupItem>
									</ListGroup>
								</Col>

								</Row>
							</Grid>

				</form>
		);
	}
}

const validate = values => {

	const errors = {}

	if (!values.corporationName) {
		errors.corporationName = '请填写出租方名称';
	}
	if (!values.corporationAddress) {
		errors.corporationAddress = '请填写详细地址';
	}

	return errors
}

export default reduxForm({
	form: 'newCreateForm',
	initialValues: {
		enableflag: 'ENABLE'
	},
	validate
})(NewCreateForm);
