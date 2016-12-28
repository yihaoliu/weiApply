import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change,submit} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	SnackTip,
	Message
} from 'kr-ui';
import './index.less';

 class StartCardActivation extends Component{

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
	    this.state={
					detail:props.detail,
					accomplish:false,
					startNum:props.detail.endNum-props.detail.startNum,
					oldNum:props.detail.endNum-props.detail.startNum,
					closeMessageBar:{
						title:'',
						open:false,
						style:{},
						className:''
					},
					clearInterCodeStyle:{
						display:'none'
					},
					num:0,
	    }
	}
	onSubmit=(values)=>{
		var _this = this;
		//判断网络是否畅通
	 	if (navigator.onLine) 
		{} else { //执行离线状态时的任务
	 		Message.error("网络已断开")
	 		return;
		} 
		var isErr=false;
		const params={};
		params.foreignCode=this.state.detail.startNum;
		params.interCode=values.interCode;

		if(!values.interCode){
			return;
		}
		if(this.state.accomplish){
			return;
		}
		var reg=/^[0-9a-fA-F]{8}$/;
		if (values.interCode&&!reg.test(values.interCode)) {
			Message.error('内码为8位16进制数');
			return;
		}

		Store.dispatch(Actions.callAPI('CardActivation', {}, params)).then(function(response) {
			const detail={};
			detail.interCode="";
			Store.dispatch(initialize('StartCardActivation',detail));
			_this.props.onFlush();
			var title="会员卡"+values.interCode+"激活成功";
			_this.props.openMessageBar(title,"ok");
			if (_this.state.detail.startNum <= _this.state.detail.endNum) {
				_this.cardNumAdd(4);
			}
			setTimeout(function(){
				_this.props.closeMessageBar();
			},1000)
		}).catch(function(err) {
		 	if (err.message=="该会员卡已被录入") {
		 		err.message="卡号"+_this.state.detail.startNum+"已存在请跳过！"
		 	}else if(err.message=="该卡已被激活,请重刷"){
		 		err.message="会员卡"+values.interCode+"已被激活，请换卡重刷！"
		 	}
		 	if(err.message=="Failed to fetch"){
		 		err.message="连接不到服务器!";
		 		Message.error(err.message);
		 		return;
		 	}
		 	_this.props.openMessageBar(err.message,"error");
		 	setTimeout(function(){
				_this.props.closeMessageBar();
			},3000)
		})
	}

	//截取一串数字某一部分数字
	numhandle=(num,start,end)=>{
	 	num=num.toString();
		num=num.substring(start,end);
		return num
	}
	 //卡号增加
	 cardNumAdd=(len)=>{
		let detail = Object.assign({},this.props.detail);
		var start=this.state.detail.startNum.substring(0,6).toString();
		var num=parseInt(this.state.detail.startNum.substring(6,10));
		 		num=num+1;
		 		num=num.toString();
				if (num.length<len) {
				 	for (var i = num.length; i < len; i++) {
						num='0'+num;
				 	}
				}

				if (this.state.detail.startNum==this.state.detail.endNum) {
				 	
				 	var oldNum=this.state.oldNum+1;
				 	if(this.state.startNum==this.state.num){
				 		oldNum=0;
				 	}
					this.setState({
	 				 	accomplish:true
	 			 	})
	 			 	Message.success(oldNum+"张会员卡激活成功！")
	 			 	this.onCancel();
					detail.startNum=detail.endNum="0000000000"

				}else{
				 	detail.startNum=start+num;
					detail.endNum=this.state.detail.endNum;
				}
				
				this.setState({
					detail:detail
				})
	}
	//跳过号码操作
	kipCard=()=>{
	 	if (+this.state.detail.endNum!=0) {
	 		const detail={};
			detail.interCode="";
			var num=this.state.num+1;
			Store.dispatch(initialize('StartCardActivation',detail));
	 		this.setState({
	 		 	oldNum:(+this.state.oldNum)-1,
	 		 	num:num
	 		})
		 	this.cardNumAdd(4);
		}
	}
	//关闭窗口
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	InterCodeFocus=(values) => {
		if(true){
			this.setState({
				clearInterCodeStyle:{
					display:'block'
				}
			})
		}
	}

	clearInterCode=()=>{
		const detail={};
		detail.interCode="";
		Store.dispatch(initialize('StartCardActivation',detail));
		this.setState({
			clearInterCodeStyle:{
				display:'none'
			}
		})
	}
	cardChange=(value)=>{
		//判断是否存在中文
		var cReg=new RegExp("[\\u4E00-\\u9FFF]+","g");
		//判断是否是16进制数
		var reg=/^[0-9a-fA-F]{8}$/;
		if(value.length>8){
			value=value.slice(8,value.length+1);
			const detail={};
			detail.interCode=value;
			Store.dispatch(initialize('StartCardActivation',detail));
			return;
		}

		if(value.length==8&&reg.test(value)){
			var params={};
			params.foreignCode=this.state.detail.startNum;
			params.interCode=value;
			
			this.onSubmit(params);
		}
		if(cReg.test(value)){
			Message.error('卡内码内含有中文请切换英文输入法！');
			return;
		}
	}

	render(){
		const {
			error,
			handleSubmit,
			pristine,
			reset,
			throwBack
		} = this.props;
		var numbers=+this.state.detail.endNum==0?0:(+this.state.detail.endNum)-(+this.state.detail.startNum)+1;
		return (
			<form className="HeavilyActivation" onSubmit={handleSubmit(this.onSubmit)}>
				<div className="activeImg" ></div>
				<div style={{textAlign:"right",width:340,margin:"auto",marginTop:10,marginLeft:52}}>
						<label >{"会员卡数量:"+numbers+"张"}</label>
						<div style={{height:'60px',marginTop:"15px"}}>
								<span className="cardNum">{this.numhandle(this.state.detail.startNum,0,4)}</span>
								<span className="cardNum" style={{padding:"0 10px"}}>{this.numhandle(this.state.detail.startNum,4,6)}</span>
								<span className="cardNum normal">{this.numhandle(this.state.detail.startNum,6,10)}</span>
						</div>
						<label className="jump" onClick={this.skipCard} style={{fontSize:"14px"}} >跳过该号码</label>
				</div>
				<div className="clearInterCode" style={{marginLeft:"-4px",marginRight:"4px"}}>
					<KrField  left={71} right={71} name="interCode"  type="text" onFocus={this.InterCodeFocus} onChange={this.cardChange} autoFocus={true}/>
					<div className="startX" style={this.state.clearInterCodeStyle} onClick={this.clearInterCode}></div>
				</div>


				<Grid style={{marginTop:18,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
							{this.state.accomplish&&<div  className='ui-btn-center' style={{marginLeft:27}}><Button  label="完成" type="submit" backgroundColor={this.state.accomplish?"#499df1":"#cccccc"} onTouchTap={this.onCancel} /></div>}
							{!this.state.accomplish&&<Button  label="返回" type="button" cancle={true} onTouchTap={throwBack} />}
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
		var reg=/^[0-9a-fA-F]{8}$/;
		console.log("1233")
		if (!reg.test(values.interCode)) {
			errors.interCode='内码为8位16进制数';
		}
		
		return errors
	}
const selector = formValueSelector('StartCardActivation');



export default reduxForm({ form: 'StartCardActivation', validate,enableReinitialize:true, keepDirtyOnReinitialize:true })(StartCardActivation);
