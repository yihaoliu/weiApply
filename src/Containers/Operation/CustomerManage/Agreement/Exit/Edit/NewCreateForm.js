import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import Param from 'jquery-param';
import {
	Fields
} from 'redux-form';
import {
	Binder
} from 'react-binding';
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import dateFormat from 'dateformat';

import {
	reduxForm,
	formValueSelector,
	initialize,
	change,
	arrayPush,
	arrayInsert,
	FieldArray
} from 'redux-form';

import {
	Actions,
	Store
} from 'kr/Redux';

import UnitPriceForm from './UnitPriceForm';

import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Dialog,

	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	IframeContent,
	Date,
	Paper,
	ListGroup,
	ListGroupItem,
	CircleStyle
} from 'kr-ui';

@ReactMixin.decorate(LinkedStateMixin)
class NewCreateForm extends Component {

	static DefaultPropTypes = {
		initialValues: {
			customerName: '',
			communityName: '',
			lessorAddress: '',
			payTypeList: [],
			paymentList: [],
			fnaCorporationList: [],
		}
	}

	static PropTypes = {
		initialValues: React.PropTypes.object,
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props, context) {
		super(props, context);

		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);

	}


	componentDidMount() {
		let {
			initialValues
		} = this.props;
		Store.dispatch(initialize('exitEditForm', initialValues));
	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('exitEditForm', 'lessorContacttel', personel.mobile));
	}

	onSubmit(form) {

		let {
			changeValues
		} = this.props;

		form = Object.assign({}, form);

		form.lessorAddress = changeValues.lessorAddress;
		form.signdate = dateFormat(form.signdate, "yyyy-mm-dd hh:MM:ss");
		form.leaseBegindate = dateFormat(form.leaseBegindate, "yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = dateFormat(form.leaseEnddate, "yyyy-mm-dd hh:MM:ss");
		form.withdrawdate = dateFormat(form.withdrawdate, "yyyy-mm-dd hh:MM:ss");

		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	getStationUrl() {

		let url = "/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?communityId={communityId}&floors={floors}&goalStationNum={goalStationNum}&goalBoardroomNum={goalBoardroomNum}&selectedObjs={selectedObjs}";

		let {
			changeValues,
			initialValues,
			optionValues
		} = this.props;
		let {
			stationVos
		} = this.state;

		stationVos = stationVos.map(function(item) {
			var obj = {};
			obj.id = item.stationId;
			obj.type = item.stationType;
			return obj;
		});

		let params = {
			communityId: optionValues.mainbillCommunityId,
			floors: changeValues.wherefloor,
			//工位
			goalStationNum: changeValues.stationnum,
			//会议室
			goalBoardroomNum: changeValues.boardroomnum,
			selectedObjs: JSON.stringify(stationVos)
		};

		if (Object.keys(params).length) {
			for (let item in params) {
				if (params.hasOwnProperty(item)) {
					url = url.replace('{' + item + '}', params[item]);
					delete params[item];
				}
			}
		}
		return url;
	}

	render() {

		let {
			error,
			handleSubmit,
			pristine,
			reset,
			submitting,
			initialValues,
			changeValues,
			optionValues
		} = this.props;

		let {
			fnaCorporationList
		} = optionValues;

		fnaCorporationList && fnaCorporationList.map(function(item, index) {
			if (changeValues.leaseId == item.id) {
				changeValues.lessorAddress = item.corporationAddress;
			}
		});

		return (


			<Paper width={968}>

<form onSubmit={handleSubmit(this.onSubmit)}  style={{marginTop:50}}>
				<CircleStyle num='1' info='合同文本信息' circle="bottom">
				<KrField   name="mainbillid" type="hidden" component="input" />
				<KrField   name="contractstate" type="hidden" component="input" />
				<KrField   name="contracttype" type="hidden" component="input" />

				<KrField name="leaseId" style={{width:370,marginLeft:70}} component="select" label="出租方" options={optionValues.fnaCorporationList}  requireLabel={true}/>
				<KrField style={{width:370,marginLeft:90}} name="lessorAddress" type="text" component="labelText" label="地址" inline={false}  value={changeValues.lessorAddress}  defaultValue="无"/>
				<KrField style={{width:370,marginLeft:70}} name="lessorContactid" component="search" label="联系人" onChange={this.onChangeSearchPersonel}  placeholder={optionValues.lessorContactName} requireLabel={true}/>
				<KrField style={{width:370,marginLeft:90}} name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:370,marginLeft:70}} component="labelText" label="承租方" inline={false} value={optionValues.customerName}/>

				<KrField style={{width:370,marginLeft:90}} name="leaseAddress" type="text" component="input" label="地址" requireLabel={true}
				requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}}  />

				<KrField style={{width:370,marginLeft:70}} name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}
				requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}} />
				<KrField style={{width:370,marginLeft:90}} name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:370,marginLeft:70}} name="communityid" component="labelText" label="所属社区" inline={false} value={optionValues.communityName} />

				<KrField style={{width:370,marginLeft:90}} name="communityAddress" component="labelText" label="地址" inline={false} value={optionValues.communityAddress} />
				<KrField style={{width:370,marginLeft:70}} name="contractcode" type="text" component="input" label="合同编号"  requireLabel={true}
				requiredValue={true} pattern={/^.{0,50}$/} errors={{requiredValue:'合同为必填项',pattern:'合同编号最大50位'}} />
				<KrField name="totalreturn" style={{width:370,marginLeft:90}} type="text" component="input" label="退租金总额" requireLabel={true}
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'退租金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}}/>
				<KrField name="depositamount" style={{width:370,marginLeft:70}} type="text" component="input" label="退押金总额" requireLabel={true}
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'退押金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}}/>

				<KrField style={{width:370,marginLeft:90}} name="withdrawdate" component="date" label="撤场日期" requireLabel={true}/>
				<KrField style={{width:370,marginLeft:70}} name="signdate"  component="date" grid={1/2} label="签署时间" requireLabel={true}/>
				<KrField style={{width:830,marginLeft:70}} name="contractmark" component="textarea" label="备注" maxSize={200}/>
				</CircleStyle>
				<KrField style={{width:830,marginLeft:90,marginTop:'-20px'}} name="fileIdList" component="file" label="上传附件" defaultValue={optionValues.contractFileList} requireLabel={true}/>

						<Grid style={{paddingBottom:50}}>
						<Row >
						<ListGroup>
							<ListGroupItem style={{width:'45%',textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" disabled={pristine || submitting} width={100} height={40} fontSize={16}/></ListGroupItem>
							<ListGroupItem style={{width:'45%',textAlign:'left',paddingLeft:15}}> <Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel} width={100} height={40} fontSize={16}/> </ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>

						</form>

			</Paper>);
	}
}
const validate = values => {

	const errors = {}

	if (!values.leaseId) {
		errors.leaseId = '请填写出租方';
	}

	if (!values.lessorContactid) {
		errors.lessorContactid = '请填写出租方联系人';
	}

	if (!values.lessorContacttel) {
		errors.lessorContacttel = '请填写出租方联系电话';
	}
	if (!values.leaseAddress) {
		errors.leaseAddress = '请填写承租方地址';
	}

	if (values.leaseAddress && !isNaN(values.leaseAddress)) {
		errors.leaseAddress = '承租方地址不能为数字';
	}


	if (!values.leaseContact) {
		errors.leaseContact = '请填写承租方联系人';
	}

	if (!values.leaseContacttel) {
		errors.leaseContacttel = '请填写承租方联系电话';
	}
	if (!values.leaseContacttel) {
		errors.leaseContacttel = '请填写承租方联系电话';
	}
	if (!values.contractcode) {
		errors.contractcode = '请填写合同编号';
	}

	if (!String(values.totalreturn)) {
		errors.totalreturn = '请填写退租金总额';
	}

	if (!String(values.depositamount)) {
		errors.depositamount = '请填写退押金总额';
	}

	if (!values.withdrawdate) {
		errors.withdrawdate = '请填写撤场日期';
	}

	if (!values.signdate) {
		errors.signdate = '请填写签署时间';
	}

	if (!values.fileIdList) {
		errors.fileIdList = '请填写合同附件';
	}



	return errors
}

const selector = formValueSelector('exitEditForm');

NewCreateForm = reduxForm({
	form: 'exitEditForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(NewCreateForm);

export default connect((state) => {

	let changeValues = {};

	changeValues.lessorId = selector(state, 'lessorId');
	changeValues.leaseId = selector(state, 'leaseId');
	changeValues.stationnum = selector(state, 'stationnum') || 0;
	changeValues.boardroomnum = selector(state, 'boardroomnum') || 0;
	changeValues.leaseBegindate = selector(state, 'leaseBegindate');
	changeValues.leaseEnddate = selector(state, 'leaseEnddate');
	changeValues.wherefloor = selector(state, 'wherefloor') || 0;
	changeValues.withdrawdate = selector(state, 'withdrawdate');


	return {
		changeValues
	}

})(NewCreateForm);