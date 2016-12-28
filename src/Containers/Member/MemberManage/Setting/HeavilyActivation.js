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
	Message
} from 'kr-ui';
import './index.less';

 class HeavilyActivation extends Component{

	 static defaultProps = {
	 		stage:'importNum'
	 	}
	 //节点的暴露
	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
		 detail:React.PropTypes.object,
		 /**
		  * stage表示批量修改所处的阶段
		  * 允许填入的值为 importNum|| activeCard
		  */
		 stage:React.PropTypes.string,
	 }
	//数据的初始化设定
	constructor(props){
		super(props);
		var detail= props.detail;
		var startNum = props.detail.startNum||'';
		var endNum = props.detail.endNum||'';

		var cardNum=0;

		if(startNum&&endNum){
			cardNum=endNum-startNum;
		}
		if(props.path=="index"){
			startNum='';
			endNum='';
			endNum=0;

		}
		this.state={
			startNum:startNum,
			endNum:endNum,
			cardNum:cardNum
		}
	}
	
	//提交按钮被点击
	 onSubmit=(values)=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	 }
	 //关闭与取消按钮被点击
	 onCancel=()=>{
		 const {onCancel} = this.props;
		onCancel && onCancel();
	 }

	 //起始卡号输入框失去焦点
	 handleStartBlur=(event)=>{

		 var _this=this;
		
		 if(this.isCard(event)){

			 this.setState({
					startNum:event,
					 endNum:this.state.endNum,
					 cardNum:this.state.cardNum
				 },function(){
					 _this.calCard();
				 })
		 }

	 }

	 //终止卡号输入框失去焦点
	 handleEndBlur=(value)=>{

		 var _this=this;
		 if(this.isCard(value)){
			 this.setState({
					 startNum:this.state.startNum,
					 endNum:value,
					 cardNum:this.state.cardNum
				 },function(){

					 _this.calCard();
				 })
		 }
	 }
	 //计算卡的多少
	 calCard=()=>{
	 	var {startNum,endNum} = this.state;
		 if(startNum&&endNum){
		 	if(endNum-startNum<0){
		 		Message.error('起始号码不能大于终止号码！');
		 		return;
		 	}
			this.setState({
				cardNum:endNum-startNum
			})
		 }
	 }

	 //卡号的校验
	 isCard=(card)=>{
	 
		if(!card){
			return false;
		}
		if(isNaN(card)){
			return false;
		}
		if(card.length!=10){
			return false;
		}
		return true;
	 }

	render(){
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		//下面的代码是卡号张数的控制
		//一遍情况是（终止卡号-起始卡号）+1
		//终止卡号等于起始卡号时有0张卡
		//如果起始号码大于终止号码是显示为0
		var cardNum=this.state.cardNum+1;
		if(!this.state.startNum||!this.state.endNum){
			cardNum=0;
		}
		if(this.state.startNum-this.state.endNum>0){
			cardNum=0;
		}


		return (
			<form className="HeavilyActivation" onSubmit={handleSubmit(this.onSubmit)}>
				<div className="stageImg" ></div>
				<KrField style={{marginTop:20}} left={71} right={71} name="startNum" component="input" type="text" label="起始号码" onChange={this.handleStartBlur} />
				<KrField style={{marginTop:5}} left={71} right={71} name="endNum" component="input" type="text" label="终止号码" onChange={this.handleEndBlur} />
				<KrField style={{height:36,marginTop:-5}} left={71} right={71} component="labelText" label="会员卡数量:" value={cardNum+"张"}/>
				<Grid style={{marginTop:15,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div style={{marginLeft:"30"}} className='ui-btn-center'><Button  label="开始激活" type="submit" joinEditForm /></div>
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

		if(!values.startNum){
			errors.startNum = '请输入起始号码';
		}
		if(!isNaN(+values.startNum)&&values.startNum&&values.startNum.length!=10){
			errors.startNum='请输入10位会员卡号'
		}
		if(values.startNum&&isNaN(+values.startNum)){
			errors.startNum = '卡号由十位数字的卡号组成';
		}
		if (!values.endNum) {
			errors.endNum = '请输入终止号码';
		}
		if(!isNaN(+values.endNum)&&values.endNum&&values.endNum.length!=10){
			errors.endNum='请输入10位会员卡号'
		}
		if(values.endNum&&isNaN(+values.endNum)){
			errors.endNum = '卡号由十位数字的卡号组成';
		}
		return errors
	}
const selector = formValueSelector('HeavilyActivation');



export default reduxForm({ form: 'HeavilyActivation', validate})(HeavilyActivation);
