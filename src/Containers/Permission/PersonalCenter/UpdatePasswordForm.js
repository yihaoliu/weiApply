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


	}


	onSubmit = (form)=>{


		const {
			onSubmit
		} = this.props;

		onSubmit && onSubmit(form);
	}


	onCancel =()=> {
		const { onCancel } = this.props;
		onCancel && onCancel();
	}




	render() {
      const {handleSubmit} = this.props;
		return (
			<div className="revisePwd">

        <form onSubmit={handleSubmit(this.onSubmit)} style={{width:262,marginTop:20}}>

                  	<KrField requireLabel={true} label="当前登录密码" placeholder="请输入当前登录密码" name="old" type="password" component="input"/>
                  	<KrField requireLabel={true} label="新的登录密码" placeholder="请输入新的登录密码" name="new" type="password" component="input" notifys={['6-20位字符','只能包含大小写字母、数字以及标点符号（除空格）','大写字母、小写字母、数字和标点符号至少包含两种']}/>
                  	<KrField requireLabel={true} label="新的登录密码" placeholder="请确认新的登录密码" name="newagain" type="password" component="input"/>
            <Grid >
            <Row >
							<Col align="center">
            <ListGroup>

              <ListGroupItem style={{paddingLeft:17,paddingRight:30,paddingTop:20,paddingBottom:6}}><Button  label="确定" type="submit" width={90} height={36} fontSize={14} /></ListGroupItem>
              <ListGroupItem style={{paddingTop:20,paddingBottom:6}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}  width={90} height={34} fontSize={14}/></ListGroupItem>

            </ListGroup>
							</Col>
            </Row>
            </Grid>

        </form>

			</div>);
	}

}



const validate = values => {

	const errors = {}

	if (!values.old) {
		errors.old = '请填写当前密码';
	}

	if (!values.new) {
		errors.new = '请填写新密码';
	}

  if (!values.newagain) {
		errors.newagain = '请再次输入新的登录密码';
	}

  if (values.newagain && values.new && values.new !== values.newagain ) {
    errors.newagain = '两次密码输入不一致';
  }

	return errors
}

NewCreateForm = reduxForm({
	form: 'updatePasswordForm',
	validate,
})(NewCreateForm);


export default NewCreateForm;
