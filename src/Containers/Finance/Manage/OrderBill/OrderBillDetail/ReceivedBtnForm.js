import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import {
	Actions,
	Store
} from 'kr/Redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {
	reduxForm,
	formValueSelector,
	initialize,
	change,
	arrayPush,
	arrayInsert,
	FieldArray,
	reset
} from 'redux-form';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Notify,
	List,
	ListItem,
	LabelText,
	Dialog,
	KrField,
	ButtonGroup
} from 'kr-ui';



var arr = [];
class ReceivedBtnForm extends Component {
	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
		optionList: React.PropTypes.object,
		typeList: React.PropTypes.object,

	}

	constructor(props, context) {
		super(props, context);
		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {

		}

		//Store.dispatch(reset('ReceivedBtnForm'));
	}

	componentDidMount() {


		let initialValues = {
			sumSign: '1',
			autoSplit: '0',
			mainbillid: this.context.params.orderId
		}

		Store.dispatch(initialize('ReceivedBtnForm', initialValues));

	}


	onSubmit(values) {
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



	render() {



		let {
			error,
			handleSubmit,
			pristine,
			reset,
			optionList,
			changeValues,
			typeList
		} = this.props;

		console.log('----',typeList);

		let heightStyle = {
			width: '546',
			height: '72'
		}


		return (

			<div className='ui-receive-money'>

					      <form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:45,marginLeft:'10px'}}>
                            <KrField  name="mainbillid" type="hidden" component="input"/>
		                    <KrField  label="代码名称" grid={1/2} right={30} name="accountId" style={{marginBottom:5}} type="select" options={optionList} requireLabel={true}/>
						     <KrField name="sumSign" grid={1/2} left={30} component="group" style={{marginBottom:5,marginLeft:-30}}  label="金额正负" requireLabel={true}>
				                <KrField name="sumSign" grid={1/2} right={30} label="正" component="radio" type="radio" value="0"/>
				                <KrField name="sumSign"  grid={1/2} left={30}label="负" component="radio" type="radio" value="1"/>
			                </KrField>

						    <KrField component="date" grid={1/2} right={30} style={{marginTop:'-5px'}}  label="回款日期" name="receiveDate" requireLabel={true}/>
						     <KrField label="上传附件" grid={1/2} left={30}  style={{marginTop:'-5px',marginLeft:-30}} name="fileids" component="file" />
                             <KrField label="交易编号" grid={1/2} right={30} style={{marginBottom:5}}  placeholder='请输入交易编号'   name="dealCode"  component="input" type="text" requireLabel={true}/>
                             <KrField label="是否自动拆分" grid={1/2} left={30} style={{marginBottom:5,marginLeft:-30}} name="autoSplit" component="select" options={
						    	[{label:"是",value:"1"},{label:"否",value:"0"}]
						    } requireLabel={true}/>

						    {parseInt(changeValues.autoSplit)?<div>
						    	 <KrField label="金额（元） " grid={1/2} style={{marginBottom:5}} right={30} name="sum" component="input" type="text" requireLabel={true} placeholder='请输入金额'/>
						    </div>:<div>
						      {typeList.map((item,index)=>{
						      	if(index%2==0){
									return <KrField key={index} style={{marginBottom:5}}  grid={1/2}  right={30} label={item.label} component="input" name={item.value} type="text"/>
						      	}else{
						      		return <KrField key={index} style={{marginBottom:5}}  grid={1/2} style={{marginLeft:-30}} left={30} label={item.label} component="input" name={item.value} type="text"/>
						      	}

						      }

						       )}
						    </div>}








                            <KrField label="备注" grid={1}  heightStyle={heightStyle} name="remark" component="textarea" type="text" placeholder='请输入备注，输入字数不能超过100字' maxSize={100} lengthClass='ui-length-textarea'/>


						   <Grid style={{marginTop:0,marginBottom:5}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
									<Button  label="取消" type="button" cancle={true}  onTouchTap={this.onCancel} />
								</ButtonGroup>
							</Col>
						</Row>
					</Grid>



                   </form>
			  </div>

		);

	}

}

const validate = values => {

	const errors = {}



	if (!values.accountId) {
		errors.accountId = '请填写代码名称';
	}

	if (!values.receiveDate) {
		errors.receiveDate = '请填写回款日期';
	}

	if (!values.dealCode) {
		errors.dealCode = '请填写交易编号';
	}
	if (!values.sum) {
		errors.sum = '请填写金额';
	}

	if (values.sum && isNaN(values.sum)) {
		errors.sum = '金额必须为数字';
	}

	return errors
}

const selector = formValueSelector('ReceivedBtnForm');

ReceivedBtnForm = reduxForm({
	form: 'ReceivedBtnForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(ReceivedBtnForm);

export default connect((state) => {

	let changeValues = {};

	changeValues.autoSplit = selector(state, 'autoSplit');

	return {
		changeValues
	}

})(ReceivedBtnForm);
