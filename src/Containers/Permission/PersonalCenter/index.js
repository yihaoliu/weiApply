import React,{Component} from 'react';
import './index.less';
import {
	Dialog,
	Button,
	ButtonGroup,
	KrForm,
	KrField,
	Grid,
	Row,
	Col,
	Input,
	Field,
	FieldControl,
	ListGroup,
	ListGroupItem,
	Message,
	Section,
} from 'kr-ui';
import {
	Actions,
	Store
} from 'kr/Redux';

import UpdatePasswordForm from './UpdatePasswordForm';

export default class PersonalCenter extends Component{
	static displayName = 'PersonalCenter';
  constructor(props, context){
    super(props,context)
		this.state={
			openVerifyId:false,
			PwdOrMobile:'',
			mmContent:true,
			titleClass:true,
			togetMobiletest:true,
			togetMailtest:true,
			MobileTimeDisabledState:false,
			MailTimeDisabledState:false,
			timeminMobile:60,
			timeminMail:60,
			timedisabled:'秒后,重新获取验证码',
			regettestMobileState:false,
			regettestMailState:false,
			regettest:'重新获取验证码',
			pwdStrengthClass:'',
			pwdLetter:'',
			name:'',
			mail:'',
			mobile:'',
			gettingMobile:false,
			gettingMail:false,
			gettingNewMobile:false,
			pwdStrength:'',
			pwdLevel:'',
			VerifyCodeSuccessOrFail:'',
			VerifyIdSuccessOrFail:'',
			VerifyIdSuccessOrFailMessage:'',
			openPwdRevise:false,
			openMobileRevise:false,
			ceshi:"1",
			isLegal:false,
			testSuccess:false,
			regettestNewMobileState:false,
			togetNewMobiletest:true,
		}
		this.timer = null;
		this.timerMail = null;
		this.timerNewMobile = null;
  }
	// 加载基本信息
	initBasicInfo = ()=>{
		var _this = this;
		_this.setState({
			isLegal:false
		})
		Store.dispatch(Actions.callAPI('PersonalCenterData', {
		})).then(function(response) {
			if (response.pwdStrength<3) {
				_this.setState({
					pwdStrengthClass:'low',
					pwdLevel:'低',
					pwdLetter:'red',
					})
				}else if (response.pwdStrength==3) {
					_this.setState({
						pwdStrengthClass:'middle',
						pwdLevel:'中',
						pwdLetter:'yellow',
					})
				}else if (response.pwdStrength==4) {
					_this.setState({
						pwdStrengthClass:'high',
						pwdLevel:'高',
						pwdLetter:'green',
					})
				}
			_this.setState({
				name: response.loginName,
				mail: response.email,
				mobile: response.mobile,
				pwdStrength: response.pwdStrength,
			});
		}).catch(function(err) {
       //    			console.log(err);
		});
	}
	componentDidMount() {
		this.initBasicInfo();
		Store.dispatch(Actions.switchSidebarNav(false));
	}
	componentWillReceiveProps(){
		//console.log(this.state.isLegal);
		//console.log("111",document.getElementsByClassName("code")[0].value);
	}
	mobileTitleClick =()=>{
		this.setState({
			titleClass:true,
			mmContent:true,
		})
	}
	mailTitleClick =()=>{
		this.setState({
			titleClass:false,
			mmContent:false,
		})
	}
	//点击修改密码时打开验证窗口
	openPwdVerifyIdFunc = ()=>{
		if (this.state.isLegal==true) {
			this.setState({
				openPwdRevise:true,
				openVerifyId:false,
				togettest:false,
			});

			return ;
		}
			this.setState({
				openVerifyId:true,
				togetMobiletest:true,
				togetMailtest:true,
				togettest:false,
				gettingMobile:false,
				gettingMail:false,
				gettingNewMobile:false,
				MobileTimeDisabledState:false,
				MailTimeDisabledState:false,
				regettestMobileState:false,
				regettestMailState:false,
				timeminMobile:60,
				timeminMail:60,
				PwdOrMobile:'pwd',
				regettestNewMobileState:false,
			});

	}
	//点击修改手机号时打开验证窗口
	openMobileVerifyIdFunc = ()=>{
		if(this.state.isLegal==true){
			this.setState({
				openMobileRevise:true,
				openVerifyId:false,
				togetNewMobiletest:true,
				gettingNewMobile:false,
				MobileTimeDisabledState:false,
				timeminMobile:60,
				togettest:false,
				regettestMobileState:false,
				regettestNewMobileState:false,
			});
			return ;
		}
			this.setState({
				openVerifyId:true,
				togetMobiletest:true,
				togetMailtest:true,
				gettingMobile:false,
				gettingMail:false,
				gettingNewMobile:false,
				MobileTimeDisabledState:false,
				MailTimeDisabledState:false,
				regettestMobileState:false,
				regettestMailState:false,
				timeminMobile:60,
				timeminMail:60,
				regettestNewMobileState:false,
				togettest:false,
				//timeminMobile:"",//
				//timeminMail:"",//
				PwdOrMobile:'mobile',
			});

	}
	//关闭验证身份窗口
	closeVerifyIdFunc = ()=>{
		this.setState({
			openVerifyId:false,
			regettestMobileState:false,
			regettestMailState:false,
			//timeminMobile:"",//
			togettest:false,
			//timeminMail:"",//
		})
	}
	//test手机验证身份点击获取验证码
	togetMobiletestCode=()=>{
		this.refs.MobileCode.value='';
		this.setState({
			regettestMobileState:false,
			gettingMobile:true,
			togetMobiletest:false,
		},function(){
			var _this = this;
			Store.dispatch(Actions.callAPI('PersonalCenterGetMobileVerificationCode', {
			})).then(function(response) {
				_this.togetMobiletest()
			}).catch(function(err) {
				//_this.togetMobiletest()
				if(err.code<0){
					Message.error(err.message)
		//        			console.log(err)
				}
				_this.setState({
					gettingMobile:false,
					togetMobiletest:true,
				})
			});
		})
	}
	//手机验证点击获取验证码函数old
	togetMobiletest =()=>{
		window.clearTimeout(this.timer);
		var _this = this;
		this.setState({
			togettest:true,
			gettingMobile:false,
			MobileTimeDisabledState:true,
			regettestMobileState:false,
			timeminMobile:60,
		},function(){
			time()
		})
		function time() {
		//	            console.log(_this.state.timeminMobile)
        if (_this.state.timeminMobile == 0) {
            _this.setState({
							regettestMobileState:true,
							MobileTimeDisabledState:false,
							togetMobiletest:false,
							//timeminMobile:"",//
						})
        } else {
					_this.setState({
						timeminMobile:--_this.state.timeminMobile,
					})
            _this.timer = window.setTimeout(function() {
                time()
            },
            1000)
        }
    }
	}
	//test邮箱验证身份点击获取验证码
	togetMailtestCode=()=>{
		this.refs.MailCode.value='';
		this.setState({
			gettingMail:true,
			regettestMailState:false,
			togetMailtest:false,
		},function(){
			var _this = this;
			Store.dispatch(Actions.callAPI('PersonalCenterGetMailVerificationCode', {
			})).then(function(response) {
				_this.togetMailtest()
			}).catch(function(err) {
				if(err.code<0){
					Message.error(err.message)
					//                 console.log(err)
				}
				_this.setState({
					gettingMail:false,
					togetMailtest:true,
				})
			});
		})
	}
	//邮箱验证点击获取验证码函数
	togetMailtest =()=>{
		window.clearTimeout(this.timerMail);
		var _this = this;
		this.setState({
		//   togettest:true,
			//togetMailtest:false,
			MailTimeDisabledState:true,
			regettestMailState:false,
			timeminMail:60,
			gettingMail:false,
		},function(){
			time()
			//this.getMailVerificationCode()
		})
		function time() {
				if (_this.state.timeminMail == 0) {
						_this.setState({
							regettestMailState:true,
							MailTimeDisabledState:false,
							togetMailtest:false,
						})
				} else {
					_this.setState({
						timeminMail:--_this.state.timeminMail,
					})
					_this.timerMail =	window.setTimeout(function() {
								time()
						},
						1000)
				}
		}
	}
	//身份验证By手机点击确认后
	submitIdByMobile=()=>{

		if(this.refs.MobileCode.value){
			//console.log("111",document.getElementsByClassName("code")[0].value);
			this.submitVerifyIDbyMobile()
		}else{
			Message.error("请填写验证码")
		}
	}
	//身份验证By邮箱点击确认后
	submitIdByMail=()=>{
		if(this.refs.MailCode.value){
			this.submitVerifyIDbyMail()
		}else{
			Message.error("请填写验证码")
		}
	}
	//手机身份验证点击确定
	submitVerifyIDbyMobile =()=>{
			var _this = this;
			//console.log("1",this.state.regettestMobileState);
				Store.dispatch(Actions.callAPI('PersonalCenterVerifyIdByMobile', {
					verifyCode:_this.refs.MobileCode.value,
				})).then(function(response) {
					_this.setState({
						isLegal:true,
						//timeminMobile:"",//
						//timeminMail:"",//
					},function(){
					//	console.log("2",this.state.regettestMobileState);
						if(_this.state.PwdOrMobile=="pwd"){
							_this.setState({
								openPwdRevise:true,
								openVerifyId:false,
							})
						}else if (_this.state.PwdOrMobile=="mobile") {
							_this.setState({
								openMobileRevise:true,
								openVerifyId:false,
								togettest:false,
								MobileTimeDisabledState:false,
								togetNewMobiletest:true,
								//regettestMailState:false,
							//	regettestMobileState:false,
								regettestNewMobileState:false,
							})
						}
						//console.log("3",this.state.regettestMobileState);
					})
				}).catch(function(err) {
					if(err.code<0){
						Message.error(err.message)
					//           	console.log(err)
				//          	console.log(err);
					}
				});
	}
	//邮箱身份验证点击确定
	submitVerifyIDbyMail =()=>{
			var _this = this;
				Store.dispatch(Actions.callAPI('PersonalCenterVerifyIdByMail', {
					verifyCode:_this.refs.MailCode.value,
				})).then(function(response) {
					_this.setState({
						isLegal:true,
						//timeminMobile:"",//
						//timeminMail:"",//
					},function(){
						if (_this.state.PwdOrMobile=="pwd") {
							_this.setState({
								openPwdRevise:true,
								openVerifyId:false,
							})
						}else if (_this.state.PwdOrMobile=="mobile") {
							_this.setState({
								openMobileRevise:true,
								openVerifyId:false,
								togettest:false,
								togetNewMobiletest:true,
								MobileTimeDisabledState:false,
								//regettestMailState:false,
								//regettestMobileState:false,
								regettestNewMobileState:false,
							})
						}
					})
				}).catch(function(err) {
					if(err.code<0){
						Message.error(err.message)
					//           	console.log(err)

					}
				});
	}
	//test修改手机号获取验证码
	testrevisemobile =()=>{
		var _this = this;
		_this.refs.reviseMobileCode.value='';

		if(_this.refs.newMobile.value){
			_this.setState({
				gettingNewMobile:true,
				regettestNewMobileState:false,
				togetNewMobiletest:false,
			},function(){
				Store.dispatch(Actions.callAPI('PersonalCenterGetNewMobileVerificationCode', {
					mobile:_this.refs.newMobile.value,
				})).then(function(response) {
					_this.reviseMobileGetVerify()
				}).catch(function(err) {
					//本地测试	_this.reviseMobileGetVerify()
					if(err.code<0){
						Message.error(err.message)
					//            	console.log(err)
					}
					_this.setState({
						gettingNewMobile:false,
						togetNewMobiletest:true,
					})
				});
			})
		}else{
			Message.error("请填写手机号")
		}
	}
	//修改手机号时新手机点击获取验证码函数old
	reviseMobileGetVerify =()=>{
		window.clearTimeout(this.timerNewMobile);
		var _this = this;
		_this.setState({
			gettingNewMobile:false,
			MobileTimeDisabledState:true,
			regettestNewMobileState:false,
			togettest:true,
			timeminMobile:60,
		},function(){
				time()
		})
		function time() {
			//console.log(_this.state.timeminMobile)
        if (_this.state.timeminMobile == 0) {
            _this.setState({
							regettestNewMobileState:true,
							MobileTimeDisabledState:false,
							//timeminMobile:"",//
							togetNewMobiletest:false,
						})
        } else {
					_this.setState({
						timeminMobile:--_this.state.timeminMobile,
					})
          _this.timerNewMobile = window.setTimeout(function() {
                time()
            },
            1000)
        }
    }
	}
	//修改手机号点击确定后的函数
	submitMobile =()=>{
		if(this.refs.newMobile.value){
			this.submitReviseMobile()
		}else{
			Message.error("请填写手机号")
		}
	}
	//验证修改手机号api
	submitReviseMobile =()=>{
		var _this = this;
			//      console.log(document.getElementById("reviseMobile_code").value)
			Store.dispatch(Actions.callAPI('PersonalCenterVerifyReviseMobileVerificationCode', {},{
				mobile:_this.refs.newMobile.value,
				verifyCode:_this.refs.reviseMobileCode.value,
			})).then(function(response) {
			//	console.log(response)
				Message.success("修改成功")
				_this.setState({
					openMobileRevise:false,
					isLegal:false,
				},function(){
					_this.initBasicInfo()
				})
			}).catch(function(err) {
				if(err.code<0){
					Message.error(err.message)
				//        	console.log(err)
				}
			});
	}

	//修改密码点击确定后的函数ing
	submitPwd =(values)=>{
			var _this = this;
			Store.dispatch(Actions.callAPI('PersonalCenterVerifyRevisePwd', {},{
				newPwd:values.new,
				newPwds:values.newagain,
				oldPwd:values.old,
			})).then(function(response) {
				Message.success("修改成功")
				window.setTimeout(function(){
					window.location.href="/login/login"
				}
					,1000)
			}).catch(function(err) {
				if(err.code<0){
					Message.error(err.message)
				}
			});

	}
	closePwdRevise=()=>{
		this.setState({
			openPwdRevise:false,
			//timeminMobile:"",//
			//timeminMail:"",//
			// togettest:false,
			// gettingMobile:false,
			// gettingNewMobile:false,
			// regettestMobileState:false,
			// MobileTimeDisabledState:false,
			// regettestNewMobileState:false,
		})
	}
	closeMobileRevise=()=>{
		this.setState({
			openMobileRevise:false,
			//timeminMobile:"",//
		//	timeminMobile:"",//
			// togettest:false,
			// gettingMobile:false,
			// gettingNewMobile:false,
			// regettestMobileState:false,
			// MobileTimeDisabledState:false,
			// regettestNewMobileState:false,
		})
	}

	render(){
		let {settle_mobile,settle_password}=this.state;
		return (
      <div className="g-personal-center">
				<Section title="个人中心" />
          <div className="personal-data">
						<div className="left_box">
								<div className="left">
										<div className="head">

										</div>
								</div>
								<div className="middle">
									<div className="line">

									</div>
									<div className="circle">

									</div>
									<div className="circle">

									</div>
								</div>
						</div>
								<div className="right_box">
									<ul className="data">
											<li>登录账号：{this.state.name}</li>
											<li>邮&emsp;&emsp;箱：{this.state.mail}</li>

									</ul>
								</div>
          </div>
					<div className="safe">

							<dl className="row level">
								<dt>
									您当前的账号安全程度
								</dt>
								<dd>
									<div id="bar" className={this.state.pwdStrengthClass}>

									</div>
									<p>
										安全级别：
										<span className={this.state.pwdLetter}>{this.state.pwdLevel}</span>
									</p>
								</dd>
							</dl>
							<dl className="row password">
								<dt>
									密码
								</dt>
								<dd>
									安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。
								  <p className="setted">&ensp;已设置&ensp;<span className="bl">|</span>&ensp;<span onTouchTap={this.openPwdVerifyIdFunc} className="revise">修改</span></p>
								</dd>

							</dl>
							<dl className="row mobile">
								<dt>
									手机号
								</dt>
								<dd>
									<span>您已绑定了手机 <span className="mobileSettle">{this.state.mobile}</span>。（您的手机为安全手机，可以找回密码）</span>
									<p className="setted">&ensp;已设置&ensp;<span className="bl">|</span>&ensp;<span onTouchTap={this.openMobileVerifyIdFunc} className="revise">修改</span></p>
								</dd>

							</dl>

					</div>
					<Dialog title="验证身份" open={this.state.openVerifyId} onClose={this.closeVerifyIdFunc} contentStyle={{width:444}}>
						<div className="verifyId">
							<div className="m_mTitle">
								<span onTouchTap={this.mobileTitleClick} className={this.state.titleClass?'activeTitle':'normalTitle'}>
									<span className="arrow"></span>
									手机号
								</span>
								<span onTouchTap={this.mailTitleClick} className={!this.state.titleClass?'activeTitle':'normalTitle'}>
									<span className="arrow"></span>
									邮箱
								</span>
							</div>
							{ this.state.mmContent && <div className="mobile_test"><span className="m_m">{this.state.mobile}</span>
									<span className="testTitle">验证码</span>
									<div className="test">
										<input className="code" ref="MobileCode" placeholder="6位验证码" type="text" />
										<span className="alltest">{ this.state.togetMobiletest && <span onTouchTap={this.togetMobiletestCode} className="gettest">点此获取验证码</span>}
											{ this.state.gettingMobile && <span className="timeout">正在发送...</span>}
											{ this.state.MobileTimeDisabledState && <span className="timeout">{this.state.timeminMobile+this.state.timedisabled}</span>}
											{this.state.regettestMobileState && <span onTouchTap={this.togetMobiletestCode} className="regettest">{this.state.regettest}</span>}
										</span>
									</div>

									{ this.state.togettest && <span className="geted">&ensp;&emsp;&ensp;验证码已发送到你的手机，30分钟内输入有效，验证码等同于密码，打死也不能告诉别人。</span>}
								 </div>}
							{ !this.state.mmContent && <div className="mail_test"><span className="m_m">{this.state.mail}</span>
								<span className="testTitle">验证码</span>
								<div className="test"><input className="code" ref="MailCode" placeholder="6位验证码" type="text" />
									<span className="alltest">{ this.state.togetMailtest && <span onTouchTap={this.togetMailtestCode} className="gettest">点此获取验证码</span>}
										{ this.state.gettingMail && <span className="timeout">正在发送...</span>}
										{ this.state.MailTimeDisabledState && <span className="timeout">{this.state.timeminMail+this.state.timedisabled}</span>}
										{this.state.regettestMailState && <span onTouchTap={this.togetMailtestCode} className="regettest">{this.state.regettest}</span>}
									</span>

								</div>

								</div>}

							 {/* this.state.togettest && <span className="geted">&emsp;&ensp;验证码已发送到你的手机，30分钟内输入有效，验证 码等同于密码，打死也不能告诉别人。</span>*/}
								{ this.state.mmContent && <Grid>
		            <Row >
									<Col align="center">

										<ListGroup >
											<ListGroupItem style={{paddingRight:30,paddingTop:25}}><Button width={90} height={36} fontSize={14} label="确定" onTouchTap={this.submitIdByMobile}  /></ListGroupItem>

											<ListGroupItem style={{paddingTop:25}}><Button  label="取消" type="button" width={90} height={34} fontSize={14} cancle={true} onTouchTap={this.closeVerifyIdFunc} /></ListGroupItem>
										</ListGroup>
									</Col>
		            </Row>
		            </Grid>}
								{ !this.state.mmContent && <Grid>
									<Row >
										<Col align="center">

											<ListGroup>
												<ListGroupItem style={{paddingRight:30,paddingTop:25}}><Button label="确定" width={90} height={36} fontSize={14} onTouchTap={this.submitIdByMail}  /></ListGroupItem>
												<ListGroupItem style={{paddingTop:25}}><Button  label="取消" type="button" width={90} height={34} fontSize={14} cancle={true} onTouchTap={this.closeVerifyIdFunc} /></ListGroupItem>
											</ListGroup>
										</Col>
									</Row>
							</Grid>}
						</div>
					</Dialog>
					<Dialog title="修改手机号" open={this.state.openMobileRevise} onClose={this.closeMobileRevise} contentStyle={{width:444}}>
							<div className="reviseMobile">
								<span className="testTitle">
									手机号

								</span>
								<input ref="newMobile" className="input" placeholder="请输入手机号" type="text" />
								<span className="testTitle">
									验证码
								</span>
								<div className="test">
									<input className="code" ref="reviseMobileCode" placeholder="6位验证码" type="text" />
									<span className="alltest">
										{ this.state.togetNewMobiletest && <span onTouchTap={this.testrevisemobile} className="gettest">点此获取验证码</span>}
										{ this.state.gettingNewMobile && <span className="timeout">正在发送...</span>}
										{ this.state.MobileTimeDisabledState && <span className="timeout">{this.state.timeminMobile+this.state.timedisabled}</span>}
										{ this.state.regettestNewMobileState && <span onTouchTap={this.testrevisemobile} className="regettest">{this.state.regettest}</span>}
									</span>
								</div>
								{ this.state.togettest && <span className="geted">&emsp;&ensp;验证码已发送到你的手机，30分钟内输入有效,验证码等同于密码，打死也不能告诉别人。</span>}

								<Grid>
									<Row >
										<Col align="center">
												<ListGroup>
													<ListGroupItem style={{paddingRight:30,paddingTop:25}}><Button label="确定" width={90} height={36} fontSize={14} onTouchTap={this.submitMobile} /></ListGroupItem>
												  <ListGroupItem  style={{paddingTop:25}}><Button  label="取消" width={90} height={34} fontSize={14} type="button" cancle={true} onTouchTap={this.closeMobileRevise} /></ListGroupItem>
												</ListGroup>
										</Col>
									</Row>
								</Grid>
							</div>

					</Dialog>
					<Dialog title="修改密码" open={this.state.openPwdRevise} onClose={this.closePwdRevise} contentStyle={{width:444}}>

						<UpdatePasswordForm onSubmit={this.submitPwd} onCancel={this.closePwdRevise}/>

					</Dialog>
    	</div>
		);
	}
}
