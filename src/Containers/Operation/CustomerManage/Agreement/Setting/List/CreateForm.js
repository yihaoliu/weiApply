import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import Param from 'jquery-param';
import { Fields } from 'redux-form';
import {Binder} from 'react-binding';
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import dateFormat from 'dateformat';


import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

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
} from 'kr-ui';

@ReactMixin.decorate(LinkedStateMixin)
class NewCreateForm  extends Component{

	 static contextTypes = {
	  	params: React.PropTypes.object.isRequired
    }

	static DefaultPropTypes = {
		initialValues:{
			customerName:'',
			communityName:'',
			lessorAddress:'',
			payTypeList:[],
			paymentList:[],
			fnaCorporationList:[],
		}
	}

	static PropTypes = {
		initialValues:React.PropTypes.object,
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props,context){
		super(props, context);


		//stationsRefs表单
		this.stationRefs = {};


		this.state = {
			stationVos:[],
			selectedStation:[],
			openStation:false,
			openStationUnitPrice:false,
		}
	}

	calcStationNum(){
		let {stationVos} = this.state;

		var stationnum = 0;
		var boardroomnum = 0;

		stationVos.forEach(function(item,index){
			if(item.stationType == 1){
				stationnum++;
			}else{
				boardroomnum++;
			}
		});

		Store.dispatch(change('joinCreateForm','stationnum',stationnum));
		Store.dispatch(change('joinCreateForm','boardroomnum',boardroomnum));
	}

	//修改租赁期限－开始时间
	onChangeLeaseBeginDate(value){

		value = dateFormat(value,"yyyy-mm-dd hh:MM:ss");

		let {stationVos} = this.state;

		if(!stationVos.length){
			return ;
		}

		this.setState({
			stationVos:[]
		});
	}

	//修改租赁期限-结束时间
	onChangeLeaseEndDate(value){
		value = dateFormat(value,"yyyy-mm-dd hh:MM:ss");
		let {stationVos} = this.state;

		if(!stationVos.length){
			return ;
		}

		this.setState({
			stationVos:[]
		});

	}

	onStationVosChange(index,value){

		let {stationVos} = this.state;
		 stationVos[index].unitprice = value;

	 	this.setState({stationVos});
	}

	openPreStationUnitPriceDialog(){
		let {selectedStation}  = this.state;
		if(!selectedStation.length){
			Notify.show([{
				message:'请先选择要录入单价的工位',
				type: 'danger',
			}]);
			return ;
		}
		this.openStationUnitPriceDialog();
	}


	//录入单价dialog
	openStationUnitPriceDialog(){
		this.setState({
			openStationUnitPrice:!this.state.openStationUnitPrice
		});
	}

	//录入单价
	onStationUnitPrice(form){

		var value = form.price;
		let {stationVos,selectedStation} = this.state;

		stationVos = stationVos.map(function(item,index){
			if(selectedStation.indexOf(index) != -1){
				item.unitprice= value;
			}
			return item;
		});

		this.setState({
			stationVos
		});

		this.openStationUnitPriceDialog();
	}

	//删除工位
	onStationDelete(){

		let {selectedStation,stationVos} = this.state;
		stationVos = stationVos.filter(function(item,index){
			if(selectedStation.indexOf(index) != -1){
				return false;
			}
			return true;
		});
		this.setState({
			stationVos,
		},function(){
			this.calcStationNum();
		});
	}

	onStationSelect(selectedStation){
		this.setState({
			selectedStation
		})
	}

	openStationDialog(){

		let {changeValues} = this.props;

		let {wherefloor,leaseBegindate,leaseEnddate} = changeValues;

		if(!wherefloor){
			Notify.show([{
				message:'请先选择楼层',
				type: 'danger',
			}]);
			return ;
		}

		if(!leaseBegindate){
			Notify.show([{
				message:'请选择租赁开始时间',
				type: 'danger',
			}]);
			return ;
		}

		if(!leaseEnddate){
			Notify.show([{
				message:'请选择租赁结束时间',
				type: 'danger',
			}]);
			return ;
		}

		this.setState({
			openStation:!this.state.openStation
		});
	}

	componentDidMount(){
		let {initialValues}= this.props;
		Store.dispatch(initialize('joinCreateForm',initialValues));
	}

	componentWillReceiveProps(nextProps){

	}

	onSubmit(form){



		let {stationVos} = this.state;


		let {billList} = this.state;

		let {changeValues} = this.props;
		if(!stationVos.length){
			Notify.show([{
				message:"请选择工位",
				type: 'danger',
			}]);
			return ;
		};
        form.lessorAddress = changeValues.lessorAddress;

		form.firstpaydate = dateFormat(form.firstpaydate,"yyyy-mm-dd hh:MM:ss");
		form.signdate = dateFormat(form.signdate,"yyyy-mm-dd hh:MM:ss");
		form.leaseBegindate = dateFormat(form.leaseBegindate,"yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = dateFormat(form.leaseEnddate,"yyyy-mm-dd hh:MM:ss");


		var _this = this;
	console.log('form',form);

		form.stationVos = stationVos;
		const {onSubmit} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	getStationUrl(){

	    let url = "/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?mainBillId={mainBillId}&communityId={communityId}&floors={floors}&goalStationNum={goalStationNum}&goalBoardroomNum={goalBoardroomNum}&selectedObjs={selectedObjs}&startDate={startDate}&endDate={endDate}";

		let {changeValues,initialValues,optionValues} = this.props;
		let {stationVos} = this.state;

		stationVos = stationVos.map(function(item){
			var obj = {};
			obj.id = item.stationId;
			obj.type = item.stationType;
			return obj;
		});

		let params = {
			mainBillId:this.context.params.orderId,
			communityId:optionValues.mainbillCommunityId,
			floors:changeValues.wherefloor,
			//工位
			goalStationNum:changeValues.stationnum,
			//会议室
			goalBoardroomNum:changeValues.boardroomnum,
			selectedObjs:JSON.stringify(stationVos),
			startDate:dateFormat(changeValues.leaseBegindate,"yyyy-mm-dd"),
			endDate:dateFormat(changeValues.leaseEnddate,"yyyy-mm-dd")

		};


		if(Object.keys(params).length){
			for (let item in params) {
				if (params.hasOwnProperty(item)) {
					url = url.replace('{' + item + '}', params[item]);
					delete params[item];
				}
			}
		}

		return url ;
	}

	onIframeClose(billList){

		this.openStationDialog();

		console.log('data',billList);

		if(!billList){
			return ;
		}

		var _this = this;

		let {changeValues} = this.props;

		let {stationVos} = this.state;

		try{
			billList.map(function(item,index){
					item.leaseBeginDate = changeValues.leaseBegindate;
					item.leaseEndDate = changeValues.leaseEnddate;
					item.stationId = item.id;
					item.stationType = item.type;
					item.stationName = item.name;
					item.unitprice = '';
					item.whereFloor =  item.wherefloor;
			});
		}catch(err){
			console.log('billList 租赁明细工位列表为空');
		}

		this.setState({stationVos:billList},function(){
			this.calcStationNum();
		});
	}

	onChangeSearchPersonel(personel){
		Store.dispatch(change('joinCreateForm','lessorContacttel',personel.mobile));
		Store.dispatch(change('joinCreateForm','lessorContactName',personel.lastname));
	}


	render(){

		let { error, handleSubmit, pristine, reset, submitting,initialValues,changeValues,optionValues} = this.props;

		let {fnaCorporationList} = optionValues;

		fnaCorporationList && fnaCorporationList.map(function(item,index){
			if(changeValues.leaseId  == item.id){
				changeValues.lessorAddress = item.corporationAddress;
			}
		});

		let {billList,stationVos} = this.state;

		return (


			<div>

<form onSubmit={handleSubmit(this.onSubmit)} >

				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />

				<KrField grid={1}  name="stationnum" type="hidden" component="input" label="工位"/>
				<KrField grid={1}  name="boardroomnum" type="hidden" component="input" label="会议室"/>

				<KrField name="leaseId"  grid={1/2} component="select" label="出租方" options={optionValues.fnaCorporationList} requireLabel={true} />
				<KrField grid={1/2}  name="lessorAddress" type="text" component="labelText" label="地址" value={changeValues.lessorAddress}  defaultValue="无"/>
				<KrField grid={1/2}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} requireLabel={true} />
				<KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true} />

				<KrField grid={1/2}  component="labelText" label="承租方" value={optionValues.customerName}/>

				<KrField grid={1/2}  name="leaseAddress" type="text" component="input" label="地址" requireLabel={true} />

				<KrField grid={1/2}  name="leaseContact" type="text" component="input" label="联系人" requireLabel={true} />
				<KrField grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true} />

				<KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value={optionValues.communityName} />

				<KrField name="wherefloor"  grid={1/2} component="select" label="所在楼层" options={optionValues.floorList} multi={true} requireLabel={true}/>

				<KrField grid={1/2}  name="communityAddress" component="labelText" label="地址" value={optionValues.communityAddress}  />
				<KrField grid={1/2}  name="contractcode" type="text" component="input" label="合同编号"  requireLabel={true} />

				<KrField grid={1/1}  component="group" label="租赁期限">
					<KrField grid={1/2}  name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate} requireLabel={true}/>
					<KrField grid={1/2}  name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} requireLabel={true}/>
				</KrField>

				<KrField name="paymodel"  grid={1/2} component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true} />
				<KrField name="paytype"  grid={1/2} component="select" label="支付方式" options={optionValues.payTypeList} requireLabel={true} />

				<KrField grid={1/2}  name="signdate"  component="date" grid={1/2} label="签署时间" defaultValue={initialValues.signdate} requireLabel={true}/>

				<KrField name="firstpaydate" component="date" label="首付款时间"  />

				<KrField grid={1}  name="rentaluse" type="text" component="input" label="租赁用途" placeholder="办公使用"   requireLabel={true}  />

				<KrField grid={1/2}  name="totalrent" type="text" component="input" label="租金总额" placeholder="" requireLabel={true} />
				<KrField grid={1/2}  name="totaldeposit" type="text" component="input" label="押金总额" requireLabel={true} />
				<KrField grid={1/2}  name="contractmark" component="textarea" label="备注" />
				<KrField grid={1}  name="fileIdList" component="file" label="合同附件" requireLabel={true} defaultValue={[]} />

				<KrField grid={1/1} component="group" label="租赁项目" requireLabel={true}>
					<KrField grid={1/2}  name="stationnum" type="text" component="labelText" label="工位" value={changeValues.stationnum} defaultValue="0"/>
					<KrField grid={1/2}  name="boardroomnum" type="text" component="labelText" label="会议室" value={changeValues.station} defaultValue="0"/>
				</KrField>

				<Section title="租赁明细" description="" rightMenu = {
					<Menu>
						<MenuItem primaryText="录入单价"  onTouchTap={this.openPreStationUnitPriceDialog}/>
						<MenuItem primaryText="删除" onTouchTap={this.onStationDelete} />
						<MenuItem primaryText="租赁"  onTouchTap={this.openStationDialog} />
					</Menu>
				}>

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

						</Section>

						<Grid>
						<Row style={{marginTop:30}}>
						<Col md={2} align="right"> <Button  label="确定" type="submit" joinEditForm disabled={submitting} /> </Col>
						<Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
						</Grid>

						</form>


					<Dialog
						title="分配工位"
						autoScrollBodyContent={true}
						contentStyle ={{ width: '100%', maxWidth: 'none'}}
						open={this.state.openStation} >
							<IframeContent src={this.getStationUrl()} onClose={this.onIframeClose}/>
					  </Dialog>

					<Dialog
						title="录入单价"
						autoScrollBodyContent={true}
						open={this.state.openStationUnitPrice} >
								<UnitPriceForm  onSubmit={this.onStationUnitPrice} onCancel={this.openStationUnitPriceDialog}/>
					  </Dialog>

			</div>);
	}
	}

	const validate = values =>{

		const errors = {}

		if(!values.leaseId){
			errors.leaseId = '请输入出租方';
		}

		if (!values.lessorContactid) {
			errors.lessorContactid = '请输入出租方联系人';
		}

		if (!values.wherefloor) {
			errors.wherefloor = '请输入所在楼层';
		}

		if (!values.lessorContacttel) {
			errors.lessorContacttel = '请输入出租方联系电话';
		}

		if (!values.contractcode) {
			errors.contractcode = '请输入合同编号';
		}

		if (!values.leaseContact) {
			errors.leaseContact = '请输入承租方联系人';
		}

		if (!values.leaseAddress) {
			errors.leaseAddress = '请输入承租方电话';
		}

		if (!values.fileIdList) {
			errors.fileIdList = '请输入合同附件';
		}

		if (!values.rentaluse) {
			errors.rentaluse = '请输入租赁用途';
		}
		if (!values.totalrent) {
			errors.totalrent = '请输入租金总额';
		}

		if (!values.totaldeposit) {
			errors.totaldeposit = '请输入租金总额';
		}

		if (!values.paymodel) {
			errors.paymodel = '请输入付款方式';
		}

		if (!values.paytype) {
			errors.paytype = '请输入支付方式';
		}

		if (!values.signdate) {
			errors.signdate = '请输入签署时间';
		}

		if (!values.leaseBegindate) {
			errors.leaseBegindate = '请输入租赁开始时间';
		}

		if (!values.leaseEnddate) {
			errors.leaseEnddate = '请输入租赁结束时间';
		}

		return errors
	}

	const selector = formValueSelector('joinCreateForm');

	NewCreateForm = reduxForm({ form: 'joinCreateForm',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCreateForm);

export default connect()(NewCreateForm);
