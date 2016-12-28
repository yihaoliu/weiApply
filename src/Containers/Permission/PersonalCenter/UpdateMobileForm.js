import React, {
	Component,
	PropTypes
} from 'react';

import {
	connect,
	Actions,
	Store
} from 'kr/Redux';



import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';



import {



	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	IframeContent,
	Date,
	Paper,
	DotTitle,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	KrDate
} from 'kr-ui';


class NewCreateForm extends Component {


	constructor(props, context) {
		super(props, context);
		const {
			detail,fn
		} = this.props;





	}



	render() {
      //const {handleSubmit} = this.props;
		return (
			<div className="reviseMobile">
				<span>
					手机号

				</span>
				<input className="input" placeholder="请输入手机号" type="text" />
				<span>
					验证码
				</span>
				<div className="test">
					<input className="code" id="reviseMobile_code" placeholder="6位验证码" type="text" />
					<span className="alltest">
						{ detail.togetNewMobiletest && <span onTouchTap={fn.testrevisemobile} className="gettest">点此获取验证码</span>}
						{ detail.MobileTimeDisabledState && <span className="timeout">{detail.timeminMobile+detail.timedisabled}</span>}
						{ detail.regettestNewMobileState && <span onTouchTap={fn.testrevisemobile} className="regettest">{detail.regettest}</span>}
					</span>
					{ detail.togettest && <span className="geted">&emsp;&ensp;验证码已发送到你的手机，30分钟内输入有效，验证 码等同于密码，打死也不能告诉别人。</span>}
				</div>
				<Grid>
					<Row >
						<Col align="center">
								<ListGroup>
									<ListGroupItem style={{paddingRight:30,paddingTop:30}}><Button label="确定" width={90} height={36} fontSize={16} onTouchTap={fn.submitMobile} /></ListGroupItem>
									<ListGroupItem  style={{paddingTop:30}}><Button  label="取消" width={90} height={34} fontSize={16} type="button" cancle={true} onTouchTap={fn.closeMobileRevise} /></ListGroupItem>
								</ListGroup>
						</Col>
					</Row>
				</Grid>
			</div>


			);
	}
}

NewCreateForm = reduxForm({
	form: 'UpdateMobileForm',
	detail,
	fn
})(NewCreateForm);

export default connect()(NewCreateForm);
