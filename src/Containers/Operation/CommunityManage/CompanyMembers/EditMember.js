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
	Message,
	Button,
	KrDate,
	DotTitle,
	ButtonGroup,
	Paper,
	ListGroup,
	ListGroupItem,
	Field,
	KrForm
} from 'kr-ui';
import './index.less';
import {ShallowEqual} from 'kr/Utils';

export default class CreateMemberForm extends Component {


	constructor(props, context) {
		super(props, context);
		this.detail = this.props.detail;

		this.state={
			jobList:[],
			itemData:{},
			initializeValues:{},
			onsubmit:true,
			onsubmitCode:true,
			baseInfo:{}
		}
	}
	//首次加载，只执行一次
	componentWillMount() {
		this.getBasicData(this.detail);
		let {detail,handleSubmit} = this.props;
		// Store.dispatch(initialize('createMemberForm', detail));
		// Store.dispatch(change('createMemberForm','foreignCode', detail));

	}
	componentWillReceiveProps(nextProps){
		if(!ShallowEqual(this.state.initializeValues,nextProps.detail)){
			this.setState({
				initializeValues:nextProps.detail
			});
			// Store.dispatch(initialize('createMemberForm', nextProps.detail));

		}
	}

	onSubmit=(values)=>{
	 	this.EmailonBlur(values.email);
		if(values.foreignCode){

		 	this.foreignCodeBlur(values.foreignCode);
		}
	 	let {onsubmit,onsubmitCode} = this.state;
	 	if(onsubmit && onsubmitCode){
	 		const {onSubmit} = this.props;
		 	onSubmit && onSubmit(values);
	 	}

	 }
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	getBasicData=(memberId)=>{
		let url = this.props.params;
		let params = {
			communityId:url.communityId,
			companyId:url.companyId,
			memberId:memberId.id || ''
		}
		let _this = this;
		Store.dispatch(Actions.callAPI('getMemberBasicData', params)).then(function(response) {
			response.jobList.forEach((item)=>{
				item.value = item.id;
				item.label = item.jobName;
			})


			_this.setState({
				jobList:response.jobList,
				itemData:response.memberInfoVO,
				baseInfo:response.memberInfoVO
			},function(){
				Store.dispatch(initialize('createMemberForm', response.memberInfoVO));
			})





		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	EmailonBlur=(phone)=>{
		 let params = {
			 email :phone
		 }
		 this.setState({
	 		open:true
	 	})
		 let {detail} = this.props;
		 let _this = this;

		 Store.dispatch(Actions.callAPI('isEmailRegistered',params)).then(function(response){
				//邮箱已注册
				if(detail.phone == response.phone){
					_this.setState({
							onsubmit:true
						})
					return;
				}else{
					Message.warn('该邮箱已被绑定','error');

						_this.setState({
							onsubmit:false
						})
				}


		 }).catch(function(err){
		 	//邮箱未注册
			// 	console.log('ddddd',err.message);
		 	_this.setState({
				onsubmit:true
			})
		 });
	 }
	 foreignCodeBlur=(codes)=>{
		 let params = {
			 code :codes
		 }
		 let _this = this;
		 this.setState({
	 		open:true
	 	})
		 let {detail} = this.props;
		 if(params.code !== undefined){
			 Store.dispatch(Actions.callAPI('membersByForeignCode',params)).then(function(response){
					//会员卡号已注册
					if(detail.phone == response.phone){
						_this.setState({
							onsubmitCode:true
						})
						return;
					}else if(response.phone == '-1'){
						Message.warn('会员卡号未录入','error');
						_this.setState({
							onsubmitCode:false
						})
					}else{
						Message.warn('会员卡号已注册','error');
						_this.setState({
							onsubmitCode:false
						})
					}


			 }).catch(function(err){
			 	//会员卡号未注册
				// 	console.log('ddddd',err.message);
			 	_this.setState({
					onsubmitCode:true
				})
			 });
		 }
	 }





	render() {


		let {detail,handleSubmit} = this.props;
		let {itemData,jobList,baseInfo} = this.state;
		let images = `./images/all.png`;


		return (
			<div className="edit-form">
				<form onSubmit={handleSubmit(this.onSubmit)} >
					<div className="person-info">
						<span className="person-name">{detail.name}</span>
						{detail.checkStatus?<span className="person-status-not">已验证</span>:<span className="person-status">未验证</span>}
						<span className="person-id">（员工UserID：{detail.id}）</span>

					</div>
					<KrField name="phone" grid={1/2} label="手机号" inline={false} component="labelText" value={detail.phone} />
					<div className="split-lines"></div>
					<KrField name="communityId" grid={1/2} label="社区" inline={false} component="labelText" right={20} defaultValue={baseInfo.communityName} requireLabel={true}/>
					<KrField name="foreignCode" grid={1/2} label="会员卡号" type="text" left={20} onBlur={this.foreignCodeBlur}  />
					<KrField name="companyId" grid={1/2} label="公司" inline={false} component="labelText" defaultValue={baseInfo.companyName}  right={20}  requireLabel={true}/>
					<KrField name="email" grid={1/2} label="邮箱:" type="text" left={20}  onBlur={this.EmailonBlur}  requireLabel={true}/>
					<KrField name="name" grid={1/2}  label="姓名" type="text" right={20}  requireLabel={true} />
					<KrField name="jobId" grid={1/2} label="职位" defaultValue={detail.jobName} component="select" left={20} options={jobList}/>
					<Grid style={{margin:'20px 0'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:'269px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"   width={90} height={34}/></ListGroupItem>
								<ListGroupItem style={{width:'240px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} width={90} height={34}/> </ListGroupItem>
							</ListGroup>
						  </Row>
					</Grid>



							 </form>
			</div>
)
	}
}
const validate = values => {

	const errors = {}
	let code = /^\d{10}$/;
	let phone = /(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/;
	let email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	if (!values.phone) {
		errors.phone = '请输入电话号码';
	}

	if (!values.communityId) {
		errors.communityId = '请输入社区名称';
	}

	if (!values.email) {
		errors.email = '请输入邮箱';
	}
	if (!values.companyId) {
		errors.companyId = '请输入公司';
	}

	// if (!values.jobId) {
	// 	errors.jobId = '请输入职位';
	// }

	if (!values.name) {
		errors.name = '请输入姓名';
	}
	if (!email.test(values.email) ) {
        errors.email = '请填写正确邮箱';
    }
    if (!phone.test(values.phone) ) {
        errors.phone = '请输入正确电话号';
    }
    if (values.foreignCode && !code.test(values.foreignCode) ) {
        errors.foreignCode = '会员卡号为10位纯数字';
    }
    if (!values.sendMsg ) {
        errors.sendMsg = '请选择是否发送验证短信';
    }
    // if (!values.foreignCode) {
    //     errors.foreignCode = '请输入会员卡号';
    // }

	return errors
}
CreateMemberForm = reduxForm({
	form: 'createMemberForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(CreateMemberForm);
