import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	KrField,
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
	Dialog,
	ListGroup,
	ListGroupItem,
	Title,
	Tooltip
} from 'kr-ui';
import './index.less'

import NewCreateForm from './NewCreateForm';
import SearchForm from './SearchForm';
import ItemDetail from './ItemDetail';
import CompareBillForm from './CompareBillForm';



export default class AttributeSetting extends Component {

	constructor(props, context) {
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

		this.onNewCreateSubmit = this.onNewCreateSubmit.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onEditSubmit = this.onEditSubmit.bind(this);
		this.onLoaded = this.onLoaded.bind(this);

		this.openNewCreateDialog = this.openNewCreateDialog.bind(this);
		this.openViewDialog = this.openViewDialog.bind(this);
		this.openEditDetailDialog = this.openEditDetailDialog.bind(this);
		this.onOperation = this.onOperation.bind(this);

		this.onExport = this.onExport.bind(this);



		this.state = {
			openNewCreate: false,
			openView: false,
			openEditDetail: false,
			itemDetail: {},
			item: {},
			list: {},
			searchParams: {
				page: 1,
				pageSize: 15
			}

		}
	}

	componentDidMount() {
		var _this = this;
		Store.dispatch(Actions.callAPI('getFinaDataByList')).then(function(response) {
			_this.setState({
				item: response,
				loading: false
			});
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}

	onExport(values) {
		var searchParams = this.state.searchParams;
		let idList = [];
		if (values.length != 0) {
			values.map((item, value) => {
				idList.push(item.id)
			});
		}
		var url = `/api/krspace-finance-web/finaccount/data/exportExcel?searchParams=${searchParams}&idList=${idList}`
		window.location.href = url;
	}

	//操作相关
	onOperation(type, itemDetail) {

		this.setState({
			itemDetail
		});

		if (type == 'view') {
			let orderId = itemDetail.id
				//window.location.href = `./#/finance/Manage/orderbill/${orderId}/detail`;
			window.open(`./#/finance/Manage/orderbill/${orderId}/detail`, orderId);
		} else if (type == 'edit') {
			this.openEditDetailDialog();
		}
	}

	//编辑
	openEditDetailDialog() {
		this.setState({
			openEditDetail: !this.state.openEditDetail
		});
	}

	//对账单的确定操作
	onEditSubmit() {
		this.openEditDetailDialog();
		this.openConfirmBillDetailDialog();
	}

	//查看
	openViewDialog() {
		this.setState({
			openView: !this.state.openView
		});
	}


	//搜索
	onSearchSubmit(searchParams) {
		let obj = {
			mainbillname: searchParams.content,
			pageSize:15
		}
		this.setState({
			searchParams: obj
		});
	}
	onSearchCancel() {
	}
	//新建
	openNewCreateDialog() {
		this.setState({
			openNewCreate: !this.state.openNewCreate,
			searchParams:{
				pageSize:'15'
			}
		});
	}

	onNewCreateSubmit(searchParams) {
		searchParams = Object.assign({}, this.state.searchParams, searchParams);
		this.setState({
			searchParams,
			openNewCreate: !this.state.openNewCreate
		});

	}

	onNewCreateCancel() {
		this.openNewCreateDialog();
	}

	onLoaded(response) {

		let list = response;
		this.setState({
			list
		})
	}



	render() {

		let {
			list
		} = this.state;

		if (!list.totalCount) {
			list.sumcome = 0;
		}
		if (!list.totalCount) {
			list.sumAmount = 0;
		}



		return (

			<div>
					<Title value="订单账单列表_财务管理"/>
					<Section title="订单账单列表" description="" style={{marginBottom:-5,minHeight:910}}>

					<div  className='ui-orderList'><Grid style={{marginTop:-5}}>
						<Row>
							<Col md={7} align="left">
								<ListGroup >
									<div className="list-name">
									<span className='ui-incomeMoney'>
									</span>
									<span className="font-width">收入总额:</span>
									<span className="font-width font-num">{list.sumcome}</span>
									</div>
									<div className="list-name">
									<span className='ui-receiveMoney'>
									</span>
									<span className="font-width">回款总额:</span>
									<span className="font-width font-num">{list.sumAmount}</span>
									</div>
									<div className="list-name">
									<span className='ui-selfMoney'></span>

									<span className="font-width">余额:</span>
									<span className="font-width font-num">{list.summount}</span>
									</div>


								</ListGroup>
							</Col>
							<Col md={5} align="right" style={{marginTop:7}}>
								<ListGroup>
									<ListGroupItem> <SearchForm onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
									<ListGroupItem> <Button searchClick={this.openNewCreateDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'5'}}/></ListGroupItem>
								</ListGroup>
							</Col>
						</Row>
					</Grid></div>



				<Table  style={{marginTop:10}}
						displayCheckbox={true}
						onLoaded={this.onLoaded}
						ajax={true}
						ajaxFieldListName="finaContractMainbillVOList"
						ajaxUrlName='getFinaDataByList'
						ajaxParams={this.state.searchParams}
						onOperation={this.onOperation}
						exportSwitch={true}
						onExport={this.onExport}
						  >

					<TableHeader>
					<TableHeaderColumn>订单名称</TableHeaderColumn>
					<TableHeaderColumn>订单类型</TableHeaderColumn>
					<TableHeaderColumn>所在社区</TableHeaderColumn>
					<TableHeaderColumn>工位</TableHeaderColumn>
					<TableHeaderColumn>起始日期</TableHeaderColumn>
					<TableHeaderColumn>结束日期</TableHeaderColumn>
					<TableHeaderColumn>收入总额</TableHeaderColumn>
					<TableHeaderColumn>回款总额</TableHeaderColumn>
					<TableHeaderColumn>余额</TableHeaderColumn>
					<TableHeaderColumn>定金/押金</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>

				<TableBody>
						 <TableRow displayCheckbox={true}>
						<TableRowColumn style={{width:160,overflow:"visible"}} name="mainbillname" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }} ></TableRowColumn>
						<TableRowColumn name="mainBillTypeName" options={[{label:'工位入驻订单',value:'STATION'}]}></TableRowColumn>
						<TableRowColumn style={{width:160,overflow:"visible"}} name="community" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
											}} ></TableRowColumn>
						<TableRowColumn name="stationnum"></TableRowColumn>
						<TableRowColumn name="contractEntrydate" type="date" format="yyyy-mm-dd"></TableRowColumn>
						<TableRowColumn name="contractLeavedate" type="date" format="yyyy-mm-dd"></TableRowColumn>
						<TableRowColumn name="come"></TableRowColumn>
						<TableRowColumn name="backMount"></TableRowColumn>
						<TableRowColumn name="mount"></TableRowColumn>
						<TableRowColumn name="rentOrDeposit"></TableRowColumn>
						<TableRowColumn>
							  <Button label="查看"  type="operation" operation="view"/>
							  {/*<Button label="生成对账单"  type="operation" operation="edit"/>*/}
						 </TableRowColumn>
					 </TableRow>
				</TableBody>

				<TableFooter></TableFooter>

				</Table>

					</Section>

					<Dialog
						title="高询"
						modal={true}
						open={this.state.openNewCreate}
						onClose={this.openNewCreateDialog}
						bodyStyle={{paddingTop:34}}
						contentStyle={{width:687}}
					>
						<NewCreateForm onSubmit={this.onNewCreateSubmit} onCancel={this.openNewCreateDialog} />

				  </Dialog>


					<Dialog
						title="生成对账单"
						modal={true}
						open={this.state.openEditDetail}
					>
						<CompareBillForm  detail={this.state.itemDetail} onSubmit={this.onEditSubmit} onCancel={this.openEditDetailDialog} />
				  </Dialog>

					<Dialog
						title="查看"
						modal={true}
						open={this.state.openView}
					>
						<ItemDetail  detail={this.state.itemDetail} onCancel={this.openViewDialog} />
				  </Dialog>


			</div>

		);

	}

}
