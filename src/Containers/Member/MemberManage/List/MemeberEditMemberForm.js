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
	Notify,
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

export default class MemeberEditMemberForm extends Component {


	constructor(props, context) {
		super(props, context);
		this.detail = this.props.detail;

		this.state={
			status:true,
			jobList:[],
			itemData:{},
			initializeValues:{},
			open:'false',
			onsubmit:true,
			phoneSame:'true',
			onsubmitCode:true,
			code:'',
			email:'',
		}
	}
	//首次加载，只执行一次
	componentWillMount() {
		this.getBasicData(this.detail);
	}
	componentWillReceiveProps(nextProps){
		if(!ShallowEqual(this.state.initializeValues,nextProps.detail)){
			this.setState({
				initializeValues:nextProps.detail
			})
		}
	}

	onSubmit=(values)=>{
		this.communityChange(values.email);
		if(values.foreignCode){
			this.membersByForeignCode(values.foreignCode);
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
			communityId:'',
			companyId:'',
			memberId:memberId.id || ''
		}
		let _this = this;
		Store.dispatch(Actions.callAPI('getMemberBasicData', params)).then(function(response) {
			// response.memberInfoVO.jobId= 11411;
			response.jobList.forEach((item)=>{
				item.value = item.id;
				item.label = item.jobName;
			})
			Store.dispatch(initialize('memeberEditMemberForm', response.memberInfoVO));

			_this.setState({
				jobList:response.jobList,
				itemData:response.memberInfoVO,
				phone:response.memberInfoVO.phone,
				code:response.memberInfoVO.foreignCode,
			})


		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	communityChange=(mail)=>{
		let params = {
			email :mail
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
		 _this.setState({
			 onsubmit:true
		 })
		});
	}
	membersByForeignCode=(codes)=>{
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
			 _this.setState({
				 onsubmitCode:true
			 })
			});
		}

	}





	render() {
		let {detail,handleSubmit} = this.props;
		let {itemData,jobList} = this.state;
		let images = `./images/all.png`;
		// itemData.phone = '13314619606';
		return (
			<div className="edit-form" style={{paddingBottom:"3"}}>
				<form onSubmit={handleSubmit(this.onSubmit)} >
					<div className="person-info">
						<span className="person-name">{detail.name}</span>
						{detail.checkStatus?<span className="person-status-not">已验证</span>:<span className="person-status">未验证</span>}
						<span className="person-id">（员工UserID：{detail.id}）</span>
					</div>

					<KrField name="phone" grid={1/2} label="手机号" inline={false} component="labelText" value={detail.phone} />
					<div className="split-lines"></div>


					<KrField name="communityId" grid={1/2} label="社区" component="searchCommunity" right={30} requiredValue={true}  errors={{requiredValue:'请选择社区'}} requireLabel={true}/>

					<KrField name="foreignCode" grid={1/2} label="会员卡号"   type="text" left={30} onBlur={this.membersByForeignCode}/>

					<KrField name="companyId" grid={1/2} label="公司" component="searchCompany"  right={30} requiredValue={true} errors={{requiredValue:'请填选择公司'}} requireLabel={true}/>
					<KrField name="email" grid={1/2} label="邮箱:" type="text" left={30}  onBlur={this.communityChange}  requireLabel={true}/>

					<KrField name="name" grid={1/2}  label="姓名" type="text" right={30}  requireLabel={true} requiredValue={true} errors={{requiredValue:'请填写会员卡号'}}/>

					<KrField name="jobId" grid={1/2} label="职位" component="select" left={30} options={jobList}/>
					<Grid style={{margin:'20px 0',marginBottom:'0'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:'270px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"   width={90} height={34}/></ListGroupItem>
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
	if (!values.communityId) {
		errors.communityId = '请输入社区名称';
	}

	if (!values.email) {
		errors.email = '请输入邮箱';
	}
	if (!values.companyId) {
		errors.companyId = '请输入公司名称';
	}

	if (!values.name || /^\s+$/.test(values.name)) {
		errors.name = '请输入姓名';
	}
	if (values.email &&!email.test(values.email) ) {
        errors.email = '请输入正确邮箱';
    }
  if (values.phone && !phone.test(values.phone) ) {
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
MemeberEditMemberForm = reduxForm({
	form: 'memeberEditMemberForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(MemeberEditMemberForm);
