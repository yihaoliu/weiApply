import React, {
	Component,
	PropTypes
} from 'react';

import {
	connect,
	Actions,
	Store
} from 'kr/Redux';


import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import dateFormat from 'dateformat';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	Fields,
	change
} from 'redux-form';


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
	DotTitle,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
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
			billList: [],
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


		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);
		this.onStationVosChange = this.onStationVosChange.bind(this);
		this.onChangeLeaseBeginDate = this.onChangeLeaseBeginDate.bind(this);
		this.onChangeLeaseEndDate = this.onChangeLeaseEndDate.bind(this);
		this.calcStationNum = this.calcStationNum.bind(this);
		this.onCloseStation = this.onCloseStation.bind(this);

		this.state = {
			stationVos: [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			HeightAuto: false,
		}
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

	onCloseStation() {
		this.setState({
			openStation: !this.state.openStation
		});

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

		if (!wherefloor) {
			Notify.show([{
				message: '请先选择楼层',
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
		Store.dispatch(initialize('admitCreateForm', initialValues));
	}



	componentWillReceiveProps(nextProps) {

	}

	onSubmit(form) {

		form = Object.assign({}, form);
		let {
			stationVos
		} = this.state;
		form.list = stationVos;
		form.stationVos = JSON.stringify(stationVos);


		let {
			billList
		} = this.state;

		let {
			changeValues
		} = this.props;

		form.lessorAddress = changeValues.lessorAddress;

		var _this = this;

		// form.stationVos =  stationVos;
		if (!stationVos.length) {
			Notify.show([{
				message: '请选择工位',
				type: 'danger',
			}]);
			return;
		}

		// form.stationVos = JSON.stringify(form.stationVos);

		form.signdate = dateFormat(form.signdate, "yyyy-mm-dd hh:MM:ss");
		form.leaseBegindate = dateFormat(form.leaseBegindate, "yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = dateFormat(form.leaseEnddate, "yyyy-mm-dd hh:MM:ss");
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
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

		Store.dispatch(change('admitCreateForm', 'stationnum', stationnum));
		Store.dispatch(change('admitCreateForm', 'boardroomnum', boardroomnum));
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
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


		if (!billList) {
			return;
		}

		var _this = this;

		let {
			changeValues
		} = this.props;

		let {
			stationVos
		} = this.state;


		try {
			billList && billList.map(function(item, index) {
				item.leaseBeginDate = dateFormat(changeValues.leaseBegindate, "yyyy-mm-dd");
				item.leaseEndDate = dateFormat(changeValues.leaseEnddate, "yyyy-mm-dd");
				item.stationId = item.id;
				item.stationName = item.name;
				item.stationType = item.type;
				item.unitprice = '';
				item.whereFloor = item.wherefloor;
			});
		} catch (err) {
			console.log('billList 租赁明细工位列表为空');
		}

		this.setState({
			stationVos: billList
		}, function() {
			this.calcStationNum();
		});

	}
	showMore = () => {
		this.setState({
			HeightAuto: !this.state.HeightAuto
		})

	}
	onChangeSearchPersonel(personel) {
		Store.dispatch(change('admitCreateForm', 'lessorContacttel', personel.mobile));
		Store.dispatch(change('admitCreateForm', 'lessorContactName', personel.lastname));
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


			<div>


	<Paper width={968}>

	<form onSubmit={handleSubmit(this.onSubmit)} >
				<CircleStyle num="1" info="租赁明细">
				
					<KrField name="wherefloor" style={{width:370,marginLeft:70}}  component="select" label="所属楼层" options={optionValues.floorList} multi={true}  requireLabel={true}/>
					 <KrField style={{width:370,marginLeft:90}} left={20} component="group" label="租赁期限" requireLabel={true}>
										<ListGroup>
											<ListGroupItem style={{width:'45%',padding:0,marginLeft:'-10px',marginTop:'-10px'}}> <KrField simple={true}  name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate}/> </ListGroupItem>
											<ListGroupItem style={{width:'5%',textAlign:'center',padding:0,marginLeft:10,marginTop:'-10px'}}><span style={{display:'inline-block',lineHeight:'60px',width:'33px',textAlign:'center',left:'5px'}}>至</span></ListGroupItem>
											<ListGroupItem style={{width:'45%',padding:0,marginTop:'-10px'}}> <KrField simple={true}  name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} /> </ListGroupItem>
										</ListGroup>
					</KrField>
					<div className="detailList" style={{marginTop:"-35px"}}>
					<DotTitle title='租赁明细'>
						<Grid style={{marginTop:"-40px"}}>
							<Row>
								<Col align="right">
									<ButtonGroup>
										<Button label="选择工位"  onTouchTap={this.openStationDialog} />
										<Button label="删除" height={27} cancle={true} type="button" onTouchTap={this.onStationDelete} />
								  </ButtonGroup>
								</Col>
							</Row>
						</Grid>

						<div  className={HeightAuto?'auto':'stationList'} style={{marginTop:"-10px"}}>
							<Table onSelect={this.onStationSelect}>
									<TableHeader>
											<TableHeaderColumn>类别</TableHeaderColumn>
											<TableHeaderColumn>编号／名称</TableHeaderColumn>
											<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
											<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
									</TableHeader>
									<TableBody>
										{
											stationVos && stationVos.map((item,index)=>{
											return (
												<TableRow key={index}>
													<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
													<TableRowColumn>{item.stationName}</TableRowColumn>
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
					<CircleStyle num="2" info="合同文本信息" circle="bottom">
					
								<KrField grid={1/2}  name="stationnum" type="hidden" component="input" />
								<KrField grid={1/2}  name="boardroomnum" type="hidden" component="input" />

								 <KrField style={{width:370,marginLeft:70}} name="leaseId" component="select" label="出租方" options={optionValues.fnaCorporationList} requireLabel={true}/>

								 <KrField style={{width:370,marginLeft:90}} type="text" component="labelText" inline={false} label="地址" value={changeValues.lessorAddress} defaultValue="无"/>
								 <KrField style={{width:370,marginLeft:70}}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} requireLabel={true}/>

								 <KrField style={{width:370,marginLeft:90}} name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}
								 requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

								 <KrField style={{width:370,marginLeft:70}}  component="labelText" label="承租方" value={optionValues.customerName} inline={false}/>
								 <KrField style={{width:370,marginLeft:90}} name="leaseAddress" type="text" component="input" label="地址" requireLabel={true}
								 requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}} />

								 <KrField style={{width:370,marginLeft:70}}  name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}
								 requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}}  />
								 <KrField style={{width:370,marginLeft:90}}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true}
								 requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

								 <KrField style={{width:370,marginLeft:70}} component="labelText" label="所属社区" value={optionValues.communityName} inline={false}/>


								 


								 <KrField style={{width:370,marginLeft:90}}  name="signdate"  component="date" label="签署日期"  requireLabel={true}/>
								 <KrField style={{width:370,marginLeft:70}} name="contractcode" type="text" component="input" label="合同编号"  requireLabel={true}
								 requiredValue={true} pattern={/^.{0,50}$/} errors={{requiredValue:'地址为必填项',pattern:'合同编号最大50位'}}/>

                                 <KrField style={{width:370,marginLeft:90}}  name="totaldownpayment" type="text" component="input" label="定金总额"  requireLabel={true}
																 requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'定金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
								 <KrField style={{width:370,marginLeft:70}} name="paymentId" type="text" component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true}/>

								

                               <KrField  name="templockday" style={{width:370,marginLeft:90}} component="input" type="text" label="保留天数" requireLabel={true}
															 requiredValue={true} pattern={/^\d{0,3}$/} errors={{requiredValue:'保留天数为必填项',pattern:'请输入三位以内正整数'}} />

							 <KrField style={{width:830,marginLeft:70}}  name="contractmark" type="textarea" component="textarea" label="备注" maxSize={200}/>

							 <KrField style={{width:830,marginLeft:70}}  name="contractFileList" component="input" type="hidden" label="合同附件"/>
							<KrField style={{width:370,marginLeft:70}}  name="stationnum"  component="labelText" label="租赁工位" value={changeValues.stationnum} defaultValue="0" requireLabel={true} inline={false}/>
							 <KrField style={{width:370,marginLeft:90}}  name="boardroomnum"  component="labelText" label="租赁会议室" value={changeValues.boardroomnum} defaultValue="0" requireLabel={true} inline={false}/>
							 </CircleStyle>
							<KrField  style={{width:830,marginLeft:90,marginTop:'-20px'}} name="fileIdList" component="file" label="合同附件" requireLabel={true} defaultValue={[]} onChange={(files)=>{
								Store.dispatch(change('admitCreateForm','contractFileList',files));
							}} />
							 

							
						<Grid style={{paddingBottom:50}}>
						<Row>
						<ListGroup>
							<ListGroupItem style={{width:'47%',textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" disabled={pristine || submitting}  width={100} height={40} fontSize={16}/></ListGroupItem>
							<ListGroupItem style={{width:'47%',textAlign:'left',paddingLeft:15}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}  width={100} height={40} fontSize={16}/></ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>

			</form>
	</Paper>


					<Dialog
						title="分配工位"
						autoScrollBodyContent={true}
						contentStyle ={{ width: '100%', maxWidth: 'none'}}
						open={this.state.openStation}
						onClose={this.onCloseStation}
						 >
							<IframeContent src={this.getStationUrl()} onClose={this.onIframeClose}/>
					  </Dialog>

			</div>);
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
	if (!values.wherefloor) {
		errors.wherefloor = '请先选择楼层';
	}

	if (!values.leaseContacttel) {
		errors.leaseContacttel = '请填写承租方电话';
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

	if (!values.fileIdList) {
		errors.fileIdList = '请填写合同附件';
	}

	if (!values.paymodel) {
		errors.paymodel = '请填写付款方式';
	}

	if (!values.signdate) {
		errors.signdate = '请填写签署时间';
	}

	if (!values.leaseBegindate) {
		errors.leaseBegindate = '请填写租赁期限开始时间';
	}

	if (!values.leaseEnddate) {
		errors.leaseEnddate = '请填写租赁期限结束时间';
	}

	if (!values.templockday) {
		errors.templockday = '请填写保留天数';
	}

	if (!values.contractcode) {
		errors.contractcode = '请填写合同编号';
	}

	if (!values.paymentId) {
		errors.paymentId = '请填写付款方式';
	}

	if (!String(values.totaldownpayment)) {
		errors.totaldownpayment = '请填写定金总额';
	}

	if (values.totaldownpayment && isNaN(values.totaldownpayment)) {
		errors.totaldownpayment = '定金总额必须为数字';
	}

	return errors
}

const selector = formValueSelector('admitCreateForm');

NewCreateForm = reduxForm({
	form: 'admitCreateForm',
	// validate,
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