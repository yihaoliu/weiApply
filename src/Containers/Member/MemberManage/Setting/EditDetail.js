import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	initialize
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
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Message
} from 'kr-ui';


class EditDetail extends Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.state = {
			detail:props.detail,
			mainbilltypeList: [],
			clearInterCodeStyle:{
				display:'none'
			}
		}
		const detail=props.detail;
		Store.dispatch(initialize('EditDetail',detail));
	}
	//提交按钮
	onSubmit(values) {
		if (navigator.onLine) 
		{ //正常工作
		} 
		else { //执行离线状态时的任务
		 		Message.error("网络已断开")
		 		return;
		} 
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(values);
	}
	//关闭与取消
	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	//卡内码输入框获取焦点
	InterCodeFocus=(values)=>{
		if(true){
			this.setState({
				clearInterCodeStyle:{
					display:'block'
				}
			})
		}
	}
	//卡内码输入框右侧X号的功能
	clearInterCode=()=>{
		const detail={};
		detail.interCode="";
		detail.foreignCode=this.props.detail.foreignCode;
		Store.dispatch(initialize('EditDetail',detail));
		this.setState({
				clearInterCodeStyle:{
					display:'none'
				}
			})
	}
	//卡内码的输入发生改变时
	cardChange=(value)=>{
		var cReg=new RegExp("[\\u4E00-\\u9FFF]+","g");

		if(cReg.test(value)){
			Message.error('卡内码内含有中文请切换英文输入法！');
			return;
		}
		
	}
	render() {
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:0}}>
				<KrField  right={27} style={{}} left={42} right={42} name="foreignCode" component="labelText" label="会员卡号" value={this.state.detail.foreignCode} inline={false} />
				<div className="clearInterCode">
					<KrField  right={27}  left={42} right={42} style={{marginTop:5}} name="interCode" component="input" type="text" label="会员卡内码" onFocus={this.InterCodeFocus} onChange={this.cardChange} />
					<div className="x" style={this.state.clearInterCodeStyle} onClick={this.clearInterCode}></div>
				</div>
				<Grid style={{marginTop:19,marginBottom:5}}>
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
	var foreignCode=values.foreignCode;
	var reg=/^[0-9a-fA-F]{8}$/;
	const errors = {}

	if(!values.foreignCode){
		errors.foreignCode = '请输入会员卡号';
	}
	if(foreignCode&&foreignCode.length!=10){
		errors.foreignCode = '请输入10位会员卡号';
	}
	if (isNaN(+foreignCode) ) {
		errors.foreignCode = '卡号由十位数字的卡号组成';

	}
	if(!values.interCode){
		errors.interCode = '请输入会员卡内码';

	}else if (!reg.test(values.interCode)) {

		errors.interCode = '内码为8位16进制数';
	}
	return errors

}
const selector = formValueSelector('EditDetail');



export default reduxForm({
	form: 'EditDetail',validate
})(EditDetail);
