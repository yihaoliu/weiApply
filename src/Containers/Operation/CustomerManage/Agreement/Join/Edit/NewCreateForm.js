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
import dateFormat from 'dateformat';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Immutable from 'immutable';

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
	KrDate,
	DotTitle,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Paper,
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

		this.isInit = false;
		this.state = {
			stationUrl: '',
			stationVos: this.props.stationVos,
			delStationVos: [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			HeightAuto: false,
		}
	}

	componentDidMount() {
		let {
			initialValues
		} = this.props;
		Store.dispatch(initialize('joinEditForm', initialValues));
	}

	componentWillReceiveProps(nextProps) {
		console.log('nextProps', nextProps);

		if (!this.isInit && nextProps.stationVos.length) {
			let stationVos = nextProps.stationVos;
			this.setState({
				stationVos
			}, function() {
				this.calcStationNum();
			});
			this.isInit = true;
		}
	}

	//修改租赁期限－开始时间
	onChangeLeaseBeginDate(value) {

		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}
		this.setState({
			stationVos: [],
			delStationVos: stationVos
		}, function() {
			this.getStationUrl();
			this.calcStationNum();
		});
	}

	//修改租赁期限-结束时间
	onChangeLeaseEndDate(value) {
		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}

		this.setState({
			stationVos: [],
			delStationVos: stationVos
		}, function() {
			this.getStationUrl();
			this.calcStationNum();
		});
	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('joinEditForm', 'lessorContacttel', personel.mobile));
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
			stationVos,
			delStationVos
		} = this.state;

		stationVos = stationVos.filter(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				delStationVos.push(item);
				return false;
			}
			return true;
		});

		this.setState({
			stationVos,
			delStationVos
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

		this.getStationUrl();

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

	onSubmit(form) {

		form = JSON.parse(JSON.stringify(form));

		let {
			stationVos,
			delStationVos
		} = this.state;
		let {
			changeValues
		} = this.props;

		form.lessorAddress = changeValues.lessorAddress;

		var _this = this;

		form.delStationVos = JSON.stringify(delStationVos);
		form.stationVos = JSON.stringify(stationVos);

		form.firstpaydate = dateFormat(form.firstpaydate, "yyyy-mm-dd hh:MM:ss");
		form.signdate = dateFormat(form.signdate, "yyyy-mm-dd hh:MM:ss");
		form.leaseBegindate = dateFormat(form.leaseBegindate, "yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = dateFormat(form.leaseEnddate, "yyyy-mm-dd hh:MM:ss");

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

		let url = "/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?mainBillId={mainBillId}&communityId={communityId}&floors={floors}&goalStationNum={goalStationNum}&goalBoardroomNum={goalBoardroomNum}&selectedObjs={selectedObjs}&startDate={startDate}&endDate={endDate}&contractId={contractId}";

		let {
			changeValues,
			initialValues,
			optionValues
		} = this.props;
		let {
			stationVos
		} = this.state;
		console.log('=-->>.', stationVos);
		stationVos = stationVos.map(function(item) {
			var obj = {};
			obj.id = item.stationId;
			obj.type = item.stationType;
			return obj;
		});

		let params = {
			contractId: this.context.params.id,
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

		this.setState({
			stationUrl: url
		});
	}

	onIframeClose(billList) {
		this.openStationDialog();
		if (!billList) {
			return;
		}
		var _this = this;
		let {
			changeValues
		} = this.props;

		var stationVos = [];

		try {
			billList.map(function(item, index) {
				var obj = {};
				obj.leaseBeginDate = changeValues.leaseBegindate;
				obj.leaseEndDate = changeValues.leaseEnddate;
				obj.stationId = item.id;
				obj.stationType = item.type;
				obj.stationName = item.name;
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

		Store.dispatch(change('joinEditForm', 'stationnum', stationnum));
		Store.dispatch(change('joinEditForm', 'boardroomnum', boardroomnum));
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

<form onSubmit={handleSubmit(this.onSubmit)}>
	<CircleStyle num="1" info="租赁明细">
			<KrField  name="wherefloor" style={{width:370,marginLeft:70}} component="select" label="所在楼层" options={optionValues.floorList} multi={true}  requireLabel={true} />
			<KrField style={{width:370,marginLeft:90}} left={10} component="group" label="租赁期限" requireLabel={true}>
					<ListGroup>
						<ListGroupItem style={{width:'47%',padding:0,marginLeft:'-10px',marginTop:'-10px'}}> <KrField   name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate} simple={true}/></ListGroupItem>
						<ListGroupItem style={{width:'6%',textAlign:'center',padding:0,marginLeft:10,marginTop:'-10px'}}><span style={{display:'inline-block',lineHeight:'58px'}}>至</span></ListGroupItem>
						<ListGroupItem style={{width:'45%',padding:0,marginTop:'-10px'}}> <KrField  name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} simple={true} /> </ListGroupItem>
					</ListGroup>
				</KrField>
				<div className="detail-list" style={{marginTop:"-35px"}}>
				<DotTitle title='租赁明细'>
				        <Grid style={{marginTop:"-40px"}}>
							<Row>
								<Col align="right">
									<ButtonGroup>
									    <Button label="录入单价"  onTouchTap={this.openPreStationUnitPriceDialog} />
										<Button label="删除"  onTouchTap={this.onStationDelete} />
										<Button label="选择工位"  onTouchTap={this.openStationDialog} />
								  </ButtonGroup>
								</Col>
							</Row>
						</Grid>
				<div  className={HeightAuto?'auto':'station-list'} style={{marginTop:"-10px"}}>
				<Table  displayCheckbox={true} onSelect={this.onStationSelect}>
				<TableHeader>
				<TableHeaderColumn>类别</TableHeaderColumn>
				<TableHeaderColumn>编号／名称</TableHeaderColumn>
				<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
					<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
						<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
						</TableHeader>
						<TableBody>
						{stationVos.map((item,index)=>{
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
						{stationVos.length>5?<div className="bottom-tip"  onTouchTap={this.showMore}> <p><span>{HeightAuto?'收起':'展开'}</span><span className={HeightAuto?'toprow':'bottomrow'}></span></p></div>:''}
						 </DotTitle>
						 </div>
					</CircleStyle>
					<CircleStyle num="2" info="合同文本信息" circle="bottom">
				<KrField  grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />

				<KrField grid={1}  name="stationnum" type="hidden" component="input" label="工位"/>
				<KrField grid={1}  name="boardroomnum" type="hidden" component="input" label="会议室"/>

				<KrField style={{width:370,marginLeft:70}} name="leaseId"   component="select" label="出租方" options={optionValues.fnaCorporationList}   requireLabel={true} />
				<KrField style={{width:370,marginLeft:90}}  name="lessorAddress" type="text" component="labelText" label="地址" inline={false} value={changeValues.lessorAddress}  defaultValue="无"/>
				<KrField style={{width:370,marginLeft:70}}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} placeholder={optionValues.lessorContactName}  requireLabel={true}  />

				<KrField style={{width:370,marginLeft:90}}  name="lessorContacttel" type="text" component="input" label="电话"  requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:370,marginLeft:70}}  component="labelText" label="承租方" inline={false} value={optionValues.customerName} />

				<KrField style={{width:370,marginLeft:90}}  name="leaseAddress" type="text" component="input" label="地址"  requireLabel={true}
				requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}} />

				<KrField style={{width:370,marginLeft:70}} name="leaseContact" type="text" component="input" label="联系人"  requireLabel={true}
				requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}} />
				<KrField style={{width:370,marginLeft:90}}  name="leaseContacttel" type="text" component="input" label="电话"  requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}} />

				<KrField style={{width:370,marginLeft:70}}  name="communityid" component="labelText" inline={false} label="所属社区" value={optionValues.communityName}  requireLabel={true} />



				<KrField style={{width:370,marginLeft:90}} name="communityAddress" component="labelText" label="地址" inline={false} value={optionValues.communityAddress} />
				<KrField style={{width:370,marginLeft:70}}  name="contractcode" type="text" component="input" label="合同编号"  requireLabel={true}
				requiredValue={true} pattern={/^.{0,50}$/} errors={{requiredValue:'合同为必填项',pattern:'合同编号最大50位'}} />



				<KrField style={{width:370,marginLeft:90}} name="paymodel"   component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true} />
				<KrField style={{width:370,marginLeft:70}} name="paytype"   component="select" label="支付方式" options={optionValues.payTypeList} requireLabel={true} />

				<KrField style={{width:370,marginLeft:90}}  name="signdate"  component="date" label="签署时间" defaultValue={initialValues.signdate} requireLabel={true} />

				<KrField style={{width:370,marginLeft:70}} name="firstpaydate" component="date" label="首付款时间"  requireLabel={true}/>


				<KrField style={{width:370,marginLeft:90}}  name="stationnum" type="text" component="labelText"  label="工位" value={changeValues.stationnum} defaultValue="0" requireLabel={true} inline={false}/>
				<KrField style={{width:370,marginLeft:70}}  name="boardroomnum" type="text" component="labelText" label="会议室" value={changeValues.boardroomnum} defaultValue="0" requireLabel={true} inline={false}/>
				<KrField style={{width:370,marginLeft:90}}  name="totalrent" type="text" component="input" label="租金总额" placeholder="" requireLabel={true}
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'租金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
				<KrField style={{width:370,marginLeft:70}}  name="totaldeposit" type="text" component="input" label="押金总额" requireLabel={true}
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'押金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
				<KrField style={{width:830,marginLeft:70}}  name="contractmark" component="textarea" label="备注" maxSize={200}/>
				</CircleStyle>
				<KrField style={{width:830,marginLeft:90,marginTop:'-20px'}}  name="fileIdList" component="file" label="合同附件" defaultValue={optionValues.contractFileList} requireLabel={true}/>

				<Grid style={{paddingBottom:50}}>
						<Row >
						<ListGroup>
							<ListGroupItem style={{width:'45%',textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" disabled={pristine || submitting} /></ListGroupItem>
							<ListGroupItem style={{width:'45%',textAlign:'left',paddingLeft:15}}> <Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/> </ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>

						</form>


					<Dialog
						title="分配工位"
						autoScrollBodyContent={true}
						contentStyle ={{ width: '100%', maxWidth: 'none'}}
						open={this.state.openStation} onClose={this.openStationDialog}>
							<IframeContent src={this.state.stationUrl} onClose={this.onIframeClose}/>
					  </Dialog>

					<Dialog
						title="录入单价"
						autoScrollBodyContent={true}
						open={this.state.openStationUnitPrice}
						onClose={this.openStationUnitPriceDialog} contentStyle={{width:430}}>
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

	if (!values.wherefloor) {
		errors.wherefloor = '请填写';
	}

	if (!values.lessorContacttel) {
		errors.lessorContacttel = '请填写出租方联系电话';
	}

	if (!values.contractcode) {
		errors.contractcode = '请填写合同编号';
	}

	if (!values.leaseContact) {
		errors.leaseContact = '请填写承租方联系人';
	}

	if (!values.leaseContacttel) {
		errors.leaseContacttel = '请填写承租方联系人';
	}

	if (!values.contractcode) {
		errors.leaseContacttel = '请填写承租方联系人';
	}

	if (!values.leaseAddress) {
		errors.leaseAddress = '请填写承租方地址';
	}

	if (values.leaseAddress && !isNaN(values.leaseAddress)) {
		errors.leaseAddress = '承租方地址不能为数字';
	}

	if (!values.fileIdList) {
		errors.fileIdList = '请填写合同附件';
	}



	if (!String(values.totalrent)) {
		errors.totalrent = '请输入租金总额';
	}

	if (values.totalrent && isNaN(values.totalrent)) {
		errors.totalrent = '租金总额必须为数字';
	}


	if (!String(values.totaldeposit)) {
		errors.totaldeposit = '请输入押金总额';
	}

	if (values.totaldeposit && isNaN(values.totaldeposit)) {
		errors.totaldeposit = '押金总额必须为数字';
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

	if (!values.leaseBegindatesigndate) {
		errors.signleaseBegindatedate = '请填写签署时间';
	}

	if (!values.firstpaydate) {
		errors.firstpaydate = '请输入首付款时间';
	}


	if (!values.stationnum && !values.boardroomnum) {
		errors.stationnum = '租赁项目必须填写一项';
	}

	return errors
}

const selector = formValueSelector('joinEditForm');

NewCreateForm = reduxForm({
	form: 'joinEditForm',
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
	changeValues.wherefloor = selector(state, 'wherefloor');


	return {
		changeValues
	}

})(NewCreateForm);