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
	change,
	initialize,
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
	DotTitle,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Paper,
	KrDate,
	CircleStyle
} from 'kr-ui';

@ReactMixin.decorate(LinkedStateMixin)
class NewCreateForm extends Component {


	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}

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

		//stationsRefs表单
		this.stationRefs = {};

		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onStationDelete = this.onStationDelete.bind(this);
		this.onStationSelect = this.onStationSelect.bind(this);

		this.getStationUrl = this.getStationUrl.bind(this);
		this.onIframeClose = this.onIframeClose.bind(this);
		this.openStationDialog = this.openStationDialog.bind(this);
		this.onStationUnitPrice = this.onStationUnitPrice.bind(this);
		this.openStationUnitPriceDialog = this.openStationUnitPriceDialog.bind(this);
		this.openPreStationUnitPriceDialog = this.openPreStationUnitPriceDialog.bind(this);

		this.onStationVosChange = this.onStationVosChange.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);

		this.onChangeLeaseBeginDate = this.onChangeLeaseBeginDate.bind(this);
		this.onChangeLeaseEndDate = this.onChangeLeaseEndDate.bind(this);
		this.calcStationNum = this.calcStationNum.bind(this);


		this.state = {
			stationVos: [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			HeightAuto: false,
		}
	}


	calcStationNum() {
		let {
			stationVos
		} = this.state;

		var stationnum = 0;
		var boardroomnum = 0;

		stationVos.forEach(function(item, index) {
			if (item.stationType == 1) {
				stationnum++;
			} else {
				boardroomnum++;
			}
		});

		Store.dispatch(change('increaseCreateForm', 'stationnum', stationnum));
		Store.dispatch(change('increaseCreateForm', 'boardroomnum', boardroomnum));
	}

	//修改租赁期限－开始时间
	onChangeLeaseBeginDate(value) {

		value = dateFormat(value, "yyyy-mm-dd hh:MM:ss");

		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}

		this.setState({
			stationVos: []
		});
	}

	//修改租赁期限-结束时间
	onChangeLeaseEndDate(value) {
		value = dateFormat(value, "yyyy-mm-dd hh:MM:ss");
		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}

		this.setState({
			stationVos: []
		});

	}

	onStationVosChange(index, value) {

		let {
			stationVos
		} = this.state;
		stationVos[index].unitprice = value;

		this.setState({
			stationVos
		});
	}

	openPreStationUnitPriceDialog() {
		let {
			selectedStation
		} = this.state;
		if (!selectedStation.length) {
			Notify.show([{
				message: '请先选择要录入单价的工位',
				type: 'danger',
			}]);
			return;
		}
		this.openStationUnitPriceDialog();
	}

	//录入单价dialog
	openStationUnitPriceDialog() {
		this.setState({
			openStationUnitPrice: !this.state.openStationUnitPrice
		});
	}

	//录入单价
	onStationUnitPrice(form) {

		var value = form.price;
		let {
			stationVos,
			selectedStation
		} = this.state;

		stationVos = stationVos.map(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				item.unitprice = value;
			}
			return item;
		});

		this.setState({
			stationVos
		});

		this.openStationUnitPriceDialog();
	}

	//删除工位
	onStationDelete() {

		let {
			selectedStation,
			stationVos
		} = this.state;
		stationVos = stationVos.filter(function(item, index) {

			if (selectedStation.indexOf(index) != -1) {
				return false;
			}
			return true;
		});
		this.setState({
			stationVos,
		}, function() {
			this.calcStationNum();
		});

	}

	onStationSelect(selectedStation) {
		this.setState({
			selectedStation
		})
	}

	openStationDialog() {

		let {
			changeValues
		} = this.props;

		let {
			wherefloor,
			leaseBegindate,
			leaseEnddate
		} = changeValues;

		if (!wherefloor) {
			Notify.show([{
				message: '请先选择楼层',
				type: 'danger',
			}]);
			return;
		}

		if (!leaseBegindate) {
			Notify.show([{
				message: '请选择租赁开始时间',
				type: 'danger',
			}]);
			return;
		}

		if (!leaseEnddate) {
			Notify.show([{
				message: '请选择租赁结束时间',
				type: 'danger',
			}]);
			return;
		}

		this.setState({
			openStation: !this.state.openStation
		});
	}

	componentDidMount() {
		let {
			initialValues
		} = this.props;
		Store.dispatch(initialize('increaseCreateForm', initialValues));
	}

	componentWillReceiveProps(nextProps) {

	}

	onSubmit(form) {


		let {
			stationVos
		} = this.state;
		if (!stationVos.length) {
			Notify.show([{
				message: '请选择工位',
				type: 'danger',
			}]);
			return;
		}
		let unitprice = true;
		stationVos.map(function(item, index) {
			if (!item.unitprice) {
				unitprice = false;
			}
			return unitprice;
		})
		if (!unitprice) {
			Notify.show([{
				message: '请输入工位单价!',
				type: 'danger',
			}]);
			return;
		}


		let {
			billList
		} = this.state;

		let {
			changeValues
		} = this.props;

		form.lessorAddress = changeValues.lessorAddress;
		form.list = stationVos;
		form.firstpaydate = dateFormat(form.firstpaydate, "yyyy-mm-dd hh:MM:ss");
		form.signdate = dateFormat(form.signdate, "yyyy-mm-dd hh:MM:ss");
		form.leaseBegindate = dateFormat(form.leaseBegindate, "yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = dateFormat(form.leaseEnddate, "yyyy-mm-dd hh:MM:ss");


		form.stationVos = stationVos;

		//form.stationVos = JSON.stringify(stationVos);

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

		let url = "/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?mainBillId={mainBillId}&communityId={communityId}&floors={floors}&goalStationNum={goalStationNum}&goalBoardroomNum={goalBoardroomNum}&selectedObjs={selectedObjs}&startDate={startDate}&endDate={endDate}";
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
			mainBillId: this.context.params.orderId,
			communityId: optionValues.mainbillCommunityId,
			floors: changeValues.wherefloor,
			//工位
			goalStationNum: changeValues.stationnum,
			//会议室
			goalBoardroomNum: changeValues.boardroomnum,
			selectedObjs: JSON.stringify(stationVos),
			startDate: dateFormat(changeValues.leaseBegindate, "yyyy-mm-dd"),
			endDate: dateFormat(changeValues.leaseEnddate, "yyyy-mm-dd")

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

	onIframeClose(billList) {

		this.openStationDialog();

		console.log('data', billList);

		if (!billList) {
			return;
		}

		var _this = this;

		let {
			changeValues
		} = this.props;

		let stationVos = [];

		try {
			billList && billList.map(function(item, index) {
				var obj = {};
				obj.leaseBeginDate = changeValues.leaseBegindate;
				obj.leaseEndDate = changeValues.leaseEnddate;
				obj.stationId = item.id;
				obj.stationName = item.name;
				obj.stationType = item.type;
				obj.unitprice = '';
				obj.whereFloor = item.wherefloor;
				stationVos.push(obj);
			});
		} catch (err) {
			console.log('billList 租赁明细工位列表为空');
		}

		this.setState({
			stationVos
		}, function() {
			this.calcStationNum();
		});

	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('increaseCreateForm', 'lessorContacttel', personel.mobile));
		Store.dispatch(change('increaseCreateForm', 'lessorContactName', personel.lastname));

	}
	showMore = () => {
		this.setState({
			HeightAuto: !this.state.HeightAuto
		})

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

		let {
			billList,
			stationVos,
			HeightAuto
		} = this.state;

		return (


			<Paper width={960}>

<form onSubmit={handleSubmit(this.onSubmit)}  >
				<CircleStyle num="1" info="租赁明细" >
					<KrField  name="wherefloor" style={{width:370,marginLeft:70,marginRight:15}} component="select" label="所在楼层" options={optionValues.floorList} multi={true} requireLabel={true} />
					<KrField style={{width:370,marginLeft:90}} left={20} component="group" label="租赁期限"  requireLabel={true}>
					<ListGroup>
						<ListGroupItem style={{width:'45%',padding:0,marginLeft:'-10px',marginTop:'-10px'}}> <KrField name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate} simple={true}/></ListGroupItem>
						<ListGroupItem style={{width:'5%',textAlign:'center',padding:0,marginLeft:10,marginTop:'-10px'}}><span style={{display:'inline-block',lineHeight:'58px'}}>至</span></ListGroupItem>
						<ListGroupItem style={{width:'45%',padding:0,marginTop:'-10px'}}> <KrField name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} simple={true}/> </ListGroupItem>
					</ListGroup>
				</KrField>
					<div className="detailList" style={{marginTop:'-35px'}}>	
					<DotTitle title='租赁明细'>

		<Grid style={{marginTop:'-40px'}}>
							<Row>
								<Col align="right">
									<ButtonGroup>
										<Button label="选择工位"  onTouchTap={this.openStationDialog} />
									    <Button label="批量录入单价"  width={100}  onTouchTap={this.openPreStationUnitPriceDialog} />
										<Button label="删除" height={27} cancle={true} type="button" onTouchTap={this.onStationDelete} />
								  </ButtonGroup>
								</Col>
							</Row>
						</Grid>

				<div  className={HeightAuto?'auto':'stationList'} style={{marginTop:"-10px"}}>
				<Table  displayCheckbox={true} onSelect={this.onStationSelect}>
				<TableHeader>
				<TableHeaderColumn>类别</TableHeaderColumn>
				<TableHeaderColumn>编号／名称</TableHeaderColumn>
				<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
					<TableHeaderColumn>开始时间</TableHeaderColumn>
						<TableHeaderColumn>结束时间</TableHeaderColumn>
						</TableHeader>
						<TableBody>
						{stationVos && stationVos.map((item,index)=>{
							var typeLink = {
								value: this.state.stationVos[index].unitprice,
								requestChange: this.onStationVosChange.bind(null, index)
							}
							return (
								<TableRow key={index}>
									<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
									<TableRowColumn>{item.stationName}</TableRowColumn>
									<TableRowColumn>
											<input type="text" name="age"  valueLink={typeLink} />
									</TableRowColumn>
									<TableRowColumn> <KrDate value={item.leaseBeginDate}/></TableRowColumn>
									<TableRowColumn><KrDate value={item.leaseEndDate}/></TableRowColumn>

									</TableRow>
							);
						})}
						</TableBody>
						</Table>
						</div>
						{stationVos.length>5?<div className="Btip"  onTouchTap={this.showMore}> <p><span>{HeightAuto?'收起':'展开'}</span><span className={HeightAuto?'Toprow':'Bottomrow'}></span></p></div>:''}

                   </DotTitle>
                   </div>
					</CircleStyle>
					<CircleStyle num="2" info="合同文本信息" circle="bottom" >
				
					<KrField  grid={1/2}  name="mainbillid" type="hidden" component="input" />
					<KrField  grid={1/2}  name="contractstate" type="hidden" component="input" />
					<KrField  grid={1/2}  name="contracttype" type="hidden" component="input" />
					<KrField  grid={1/2}  name="paymodelName" type="hidden" component="input" />
					<KrField  grid={1/2}  name="paytypeName" type="hidden" component="input" />

					<KrField  name="leaseId" style={{width:370,marginLeft:70}} component="select" label="出租方" options={optionValues.fnaCorporationList} requireLabel={true}  />
					<KrField  style={{width:370,marginLeft:90}}  name="lessorAddress" type="text" inline={false} component="labelText" label="地址" value={changeValues.lessorAddress}  defaultValue="无" />
					<KrField  style={{width:370,marginLeft:70}}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} requireLabel={true} />
					<KrField style={{width:370,marginLeft:90}}  name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}  

					requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

					<KrField  style={{width:370,marginLeft:70}} component="labelText" inline={false} label="承租方" value={optionValues.customerName} />

					<KrField  style={{width:370,marginLeft:90}}  name="leaseAddress" type="text" component="input" label="地址" requireLabel={true} 
					requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}} />

					<KrField  style={{width:370,marginLeft:70}}  name="leaseContact" type="text" component="input" label="联系人" requireLabel={true} 
					requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}} />
					<KrField  style={{width:370,marginLeft:90}}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true} 
					requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

					<KrField  style={{width:370,marginLeft:70}}  name="communityid" component="labelText" inline={false} label="所属社区" value={optionValues.communityName} />

					

					<KrField style={{width:370,marginLeft:90}} name="communityAddress" component="labelText" inline={false} label="地址" value={optionValues.communityAddress} />
					<KrField  style={{width:370,marginLeft:70}}  name="contractcode" type="text" component="input" label="合同编号" requireLabel={true} 
					requiredValue={true} pattern={/^.{0,50}$/} errors={{requiredValue:'合同为必填项',pattern:'合同编号最大50位'}} />


	                <KrField  name="paytype"  style={{width:370,marginLeft:90}} component="select" label="支付方式"  options={optionValues.payTypeList} requireLabel={true} onChange={(item)=>{
							Store.dispatch(change('increaseCreateForm','paytypeName',item.label));
					}} />
					<KrField  name="paymodel"  style={{width:370,marginLeft:70}} component="select" label="付款方式"  options={optionValues.paymentList} requireLabel={true} onChange={(item)=>{
							Store.dispatch(change('increaseCreateForm','paymodelName',item.label));
					}} />
					
					<KrField style={{width:370,marginLeft:90}}  name="mainbillid" type="hidden" component="input" />


					<KrField  style={{width:370,marginLeft:70}}  name="firstpaydate"  component="date"  label="首付款时间" requireLabel={true} />





					<KrField  style={{width:370,marginLeft:90}} name="signdate"  component="date"   label="签署时间" defaultValue={initialValues.signdate} requireLabel={true} />



					<KrField style={{width:370,marginLeft:70}}  name="stationnum"  component="labelText"  label="租赁工位" value={changeValues.stationnum} defaultValue="0" requireLabel={true} inline={false}/>
					<KrField style={{width:370,marginLeft:90}}  name="boardroomnum"  component="labelText"  label="租赁会议室" value={changeValues.station} defaultValue="0" requireLabel={true} inline={false}/>

					

					<KrField  style={{width:370,marginLeft:70}}  name="totalrent" type="text" component="input"  label="租金总额" placeholder="" requireLabel={true}
					requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'租金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}}  />
					<KrField  style={{width:370,marginLeft:90}}  name="totaldeposit" type="text" component="input"  label="押金总额" requireLabel={true}
					requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'押金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />

					<KrField  style={{width:830,marginLeft:70}}   name="contractmark" component="textarea"  label="备注" maxSize={200}/>


					</CircleStyle>
					<KrField  grid={1}  name="contractFileList" component="input"  type="hidden" label="合同附件"/>
					<KrField style={{width:830,marginLeft:80,marginTop:'-20px'}}  name="fileIdList" component="file" label="上传附件" requireLabel={true} defaultValue={[]} onChange={(files)=>{
						Store.dispatch(change('increaseCreateForm','contractFileList',files));
					}} />



             
						<Grid style={{padding:"10px 0 50px"}}>
						<Row>
						<ListGroup>
							<ListGroupItem style={{width:'45%',textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" disabled={pristine || submitting}  width={100} height={40} fontSize={16}/></ListGroupItem>
							<ListGroupItem style={{width:'45%',textAlign:'left',paddingLeft:15}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}  width={100} height={40} fontSize={16}/></ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>

						</form>


					<Dialog
						title="分配工位"
						autoScrollBodyContent={true}
						contentStyle ={{ width: '100%', maxWidth: 'none'}}
						open={this.state.openStation}
						onClose={this.openStationDialog}
						>
							<IframeContent src={this.getStationUrl()} onClose={this.onIframeClose}/>
					  </Dialog>

					<Dialog
						title="录入单价"
						autoScrollBodyContent={true}
						open={this.state.openStationUnitPrice} contentStyle={{width:430}}
						onClose={this.openStationUnitPriceDialog}>
								<UnitPriceForm  onSubmit={this.onStationUnitPrice} onCancel={this.openStationUnitPriceDialog}/>
					  </Dialog>

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

	if (!values.leaseContact) {
		errors.leaseContact = '请填写承租方联系人';
	}

	if (!values.leaseContacttel) {
		errors.leaseContacttel = '请填写承租方联系电话';
	}
	if (!values.whereFloor) {
		errors.whereFloor = '请填写所属楼层';
	}
	if (!values.contractcode) {
		errors.contractcode = '请填写合同编号';
	}

	if (!values.leaseBeginDate) {
		errors.leaseBeginDate = '请填写租赁期限';
	}
	if (!values.leaseEndDate) {
		errors.leaseEndDate = '请填写租赁期限';
	}

	if (!values.firstpaydate) {
		errors.firstpaydate = '请填写首付款时间';
	}

	if (!values.paymodel) {
		errors.paymodel = '请填写付款方式';
	}
	if (!values.paytype) {
		errors.paytype = '请填写支付方式';
	}

	if (!values.signdate) {
		errors.signdate = '请填写签署时间';
	}

	if (!values.leaseBegindate) {
		errors.leaseBegindate = '请输入租赁开始时间';
	}

	if (!values.leaseEnddate) {
		errors.leaseEnddate = '请输入租赁结束时间';
	}

	if (!String(values.totalrent)) {
		errors.totalrent = '请填写租金总额';
	}

	if (values.totalrent && isNaN(values.totalrent)) {
		errors.totalrent = '租金总额必须为数字';
	}

	if (!String(values.totaldeposit)) {
		errors.totaldeposit = '请填写押金总额';
	}

	if (values.totaldeposit && isNaN(values.totaldeposit)) {
		errors.totaldeposit = '押金总额必须为数字';
	}

	if (!values.fileIdList) {
		errors.fileIdList = '请填写合同附件';
	}

	if (!values.wherefloor) {
		errors.wherefloor = '请填写所属楼层';
	}


	return errors
}


const selector = formValueSelector('increaseCreateForm');

NewCreateForm = reduxForm({
	form: 'increaseCreateForm',
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
	changeValues.leaseBegindate = selector(state, 'leaseBegindate') || 0;
	changeValues.leaseEnddate = selector(state, 'leaseEnddate') || 0;
	changeValues.wherefloor = selector(state, 'wherefloor') || 0;

	return {
		changeValues
	}

})(NewCreateForm);