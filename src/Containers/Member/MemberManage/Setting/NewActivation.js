import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	Actions,
	Store
} from 'kr/Redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';

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


class NewActivation extends Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.state = {
			communityList: [],
			mainbilltypeList: [],
			clearInterCodeStyle:{
				display:'none'
			},
			foreignCode:""
		}

	}
	componentDidMount() {

		var _this = this;
		Store.dispatch(Actions.callAPI('getFinaDataCommunityAndMainBillType')).then(function(response) {

			const communityList = response.communityList
			const mainbilltypeList = response.mainbilltypeList



			communityList.map(function(item, index) {
				item.label = item.communityname;
				item.value = item.id
				return item;
			});

			mainbilltypeList.map(function(item, index) {
				item.label = item.mainBillTypeDesc;
				item.value = item.mainbilltype;
				return item;
			});

			_this.setState({
				communityList,
				mainbilltypeList
			});

		}).catch(function(err) {
			Notify.show([{
				message: '报错了',
				type: 'danger',
			}]);
		});


	}
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
		detail.foreignCode=this.state.foreignCode;
		Store.dispatch(initialize('NewActivation',detail));
		this.setState({
				clearInterCodeStyle:{
					display:'none'
				}
			})
	}
	//卡号输入框失去焦点
	foreignCodeBlur=(values)=>{
		this.setState({
				foreignCode:values
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

				<KrField  right={27}  left={42} right={42} name="foreignCode" type="text" label="会员卡号" onBlur={this.foreignCodeBlur}/>
				<div className="clearInterCode">
					<KrField  right={27}  left={42} right={42} style={{marginTop:5}} name="interCode" component="input" type="text" label="会员卡内码" onChange={this.cardChange} onFocus={this.InterCodeFocus}/>
					<div className="x" style={this.state.clearInterCodeStyle} onClick={this.clearInterCode}></div>
				</div>
				<Grid style={{marginTop:20,marginBottom:5}}>
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
const selector = formValueSelector('NewActivation');



export default reduxForm({
	form: 'NewActivation',validate
})(NewActivation);
