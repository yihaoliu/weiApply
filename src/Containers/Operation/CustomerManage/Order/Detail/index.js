import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';


import {
	reduxForm
} from 'redux-form';
import Section from 'kr-ui/Section';


import DelAgreementNotify from './DelAgreementNotify';

import {
	KrField,
	KrDate,
	Button,
	DotTitle,
	Dialog,
	Title,
} from 'kr-ui';


import {
	Grid,
	Row,
	Col
} from 'kr-ui/Grid';

import {
	Snackbar
} from 'material-ui';

import {
	BreadCrumbs,
	Loading,
	Notify
} from 'kr-ui';

import Circle from './circle';
import './active.less';

import {
	Menu,
	MenuItem,
	Divider,
	FontIcon,
	DatePicker,
	Paper,
} from 'material-ui';


import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter
} from 'kr-ui/Table';


import {
	List,
	ListItem
} from 'material-ui/List';


import {
	Actions,
	Store
} from 'kr/Redux';
import ReactTooltip from 'react-tooltip'

class NewCreatForm extends Component {
	static PropTypes = {
		contractStatusCount: React.PropTypes.object,
		params: React.PropTypes.object,

	}
	constructor(props, context) {
		super(props, context);
	}

	render() {
		let {
			contractStatusCount,
			params
		} = this.props;

		return (
			<Grid style={{paddingBottom:20}}>
				<Row>
				<Col md={4} align="center">
					{
					contractStatusCount.enterTotoal>0?<span className="createButton disabled">承租意向书</span>:<a className="createButton" href={"./#/operation/customerManage/"+params.customerId+"/order/"+this.props.params.orderId+"/agreement/admit/create"}>承租意向书</a>
					}
				</Col>
				<Col md={4} align="center">
				  {
					contractStatusCount.enterTotoal>0 ?<span className="createButton disabled">入驻协议书</span>:<a className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/join/create"}>入驻协议书</a>
				  }
				</Col>
				<Col md={4} align="center">
				{contractStatusCount.enterTotoal>0 && contractStatusCount.enterFlag?<a  className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/increase/create"}>增租协议书</a>:<span className="createButton disabled">增租协议书</span>}

				</Col>
				</Row>

				<Row style={{marginTop:10}}>
				<Col md={4} align="center" >
				  	{contractStatusCount.enterTotoal>0 && contractStatusCount.enterFlag ?<a className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/renew/create"}>续租协议书</a>:<span className="createButton disabled">续租协议书</span>}

				</Col>
				<Col md={4} align="center">
					{contractStatusCount.enterTotoal>0 && contractStatusCount.enterFlag ?<a className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/reduce/create"} >减租协议书</a>:<span className="createButton disabled">减租协议书</span>}

				</Col>
				<Col md={4} align="center">
					{contractStatusCount.enterTotoal>0 && contractStatusCount.enterFlag?<a  className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/exit/create"} >退租协议书</a>:<span className="createButton disabled">退租协议书</span>}

				</Col>
				</Row>

				</Grid>



		)
	}

}


class StaionInfo extends Component {
	static PropTypes = {
		detail: React.PropTypes.object,

	}

	constructor(props, context) {
		super(props, context);
		this.state = {
			isClassName: ''
		}
	}
	close = () => {
		this.setState({
			isClassName: 'leave'
		}, function() {
			const {
				onClose
			} = this.props;
			onClose && onClose()

		})



	}
	render() {
		var _this = this;
		let {
			detail,
			className,
			isShow
		} = this.props;
		let {
			isClassName
		} = this.state;
		var Name = isShow ? 'actives' : isClassName


		return (
			<div className={`${className} ${Name}`}>
				<div className="close-btn" onTouchTap={this.close} ></div>
				<div className="showHeader"><span className="icon"></span><span className="title">工位编号 :</span></div>
				<div className="info-con">
					{detail && detail.map((item,index)=>{
						return(
							<div className="infoList" key={index}>
								<div className="h-title"><span className="circle"></span>{item.detailName}</div>
								<div className="listCon">
									{item.stationIds.length>0 ?item.stationIds.map((v,i)=>{
										return(
											<div className="list" key={i}>工位编号：{v}</div>
										)
									}):<div className="list" >该客户的所有工位已退租</div>}

								</div>
							</div>

						)
							
						

					})}
					

				</div>
				<div className="close-btn-n" onTouchTap={this.close}>关闭</div>
			</div>

		)



	}


}

export default class OrderDetail extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.openCreateAgreementDialog = this.openCreateAgreementDialog.bind(this);
		this.getAgrementDetailUrl = this.getAgrementDetailUrl.bind(this);
		this.getAgrementEditUrl = this.getAgrementEditUrl.bind(this);
		this.renderTableItem = this.renderTableItem.bind(this);
		this.getAgrementType = this.getAgrementType.bind(this);


		this.confirmDelAgreement = this.confirmDelAgreement.bind(this);
		this.openDelAgreementDialog = this.openDelAgreementDialog.bind(this);


		this.state = {
			open: false,
			loading: true,
			delAgreementId: 0,
			openCreateAgreement: false,
			openDelAgreement: false,
			isShow: false,
			View: false,
			response: {
				orderBaseInfo: {},
				installment: {},
				earnest: {},
				contractList: [],
				antecedent: [],
			},
			staionsList: []
		}

	}

	openDelAgreementDialog() {
		this.setState({
			openDelAgreement: !this.state.openDelAgreement
		});
	}

	setDelAgreementId(delAgreementId) {
		this.setState({
			delAgreementId,
		}, function() {
			this.openDelAgreementDialog();
		});

	}

	confirmDelAgreement() {

		this.openDelAgreementDialog(0);

		let {
			delAgreementId
		} = this.state;
		Store.dispatch(Actions.callAPI('delete-enter-contract', {
			contractId: delAgreementId
		})).then(function(response) {
			Notify.show([{
				message: '删除成功!',
				type: 'success',
			}]);
			window.setTimeout(function() {
				window.location.reload();
			}, 100)
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});


	}

	componentDidMount() {
		const closeAll = this.props.location.query.closeAll;
		if (closeAll) {
			Store.dispatch(Actions.switchSidebarNav(false));
			Store.dispatch(Actions.switchHeaderNav(false));
		}

		var _this = this;

		Store.dispatch(Actions.callAPI('get-order-detail', {
			mainBillId: this.props.params.orderId
		})).then(function(response) {
			console.log('response----', response)
			_this.setState({
				response: response
			});


			setTimeout(function() {
				_this.setState({
					loading: false
				});
			}, 0);

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);

		});
		Store.dispatch(Actions.switchSidebarNav(false));

	}

	openCreateAgreementDialog() {

		const {
			contractStatusCount
		} = this.state.response;

		if (contractStatusCount.quitRentTotoal) {
			Notify.show([{
				message: '您已经签约了退租合同！',
				type: 'danger',
			}]);

			return;
		}


		this.setState({
			openCreateAgreement: !this.state.openCreateAgreement
		});
	}

	getAgrementEditUrl(customerId, orderId, typeId, agreementId) {

		var typeArray = [{
			label: 'INTENTION',
			value: 'admit'
		}, {
			label: 'ENTER',
			value: 'join'
		}, {
			label: 'RENEW',
			value: 'renew'
		}, {
			label: 'LESSRENT',
			value: 'reduce'
		}, {
			label: 'QUITRENT',
			value: 'exit'
		}, {
			label: 'ADDRENT',
			value: 'increase'
		}, ];
		var typeValue = '';
		typeArray.map((value) => {
			if (typeId === value.label) {
				typeValue = value.value;
			}
		});
		return './#/operation/customerManage/' + customerId + '/order/' + orderId + '/agreement/' + typeValue + '/' + agreementId + '/edit';
	}
	getAgrementDetailUrl(customerId, orderId, typeId, agreementId) {
		var typeArray = [{
			label: 'INTENTION',
			value: 'admit'
		}, {
			label: 'ENTER',
			value: 'join'
		}, {
			label: 'RENEW',
			value: 'renew'
		}, {
			label: 'LESSRENT',
			value: 'reduce'
		}, {
			label: 'QUITRENT',
			value: 'exit'
		}, {
			label: 'ADDRENT',
			value: 'increase'
		}, ];
		var typeValue = '';
		typeArray.map((value) => {
			if (typeId === value.label) {
				typeValue = value.value;
			}
		});
		return './#/operation/customerManage/' + customerId + '/order/' + orderId + '/agreement/' + typeValue + '/' + agreementId + '/detail';
	}

	getAgrementType(type) {
		var typeList = [{
			name: 'INTENTION',
			value: '意向书'
		}, {
			name: 'ENTER',
			value: '入驻协议'
		}, {
			name: 'ADDRENT',
			value: '增租协议'
		}, {
			name: 'LESSRENT',
			value: '减租协议'
		}, {
			name: 'QUITRENT',
			value: '退租协议'
		}, {
			name: 'RENEW',
			value: '续租协议'
		}];
		let name = ''
		typeList.map(function(value) {
			if (value.name === type) {
				name = value.value;
			}
		});
		return (
			<TableRowColumn>{name}</TableRowColumn>
		)
	}

	delArgument(id) {


	}

	renderTableItem(item) {
		var _this = this;
		if (item) {

			return (
				<Row>
				<Col md={3} align="left" className="ContractName"><Circle type={item.payStatus}></Circle>款项：{item.installmentName}</Col>
				<Col md={3} align="left" className="ContractName">计划付款日期：<KrDate value={item.installmentReminddate}/></Col>
				<Col md={3} align="left" className="ContractName">计划付款金额：{item.installmentAmount}</Col>
				{item.installmentBackamount > 0?<Col md={3} align="left"className="ContractName">实际付款金额：{item.installmentBackamount}</Col>:<Col md={3} align="left"  className="ContractName">实际付款金额：<span style={{color:'red'}}>{item.installmentBackamount}</span></Col>}
				</Row>
			)
		}

		return null;


	}
	change = (form) => {
		const {
			orderBaseInfo
		} = this.state.response;
		if (orderBaseInfo.mainbillname === form) {
			return;
		}
		if (form && orderBaseInfo.id) {
			Store.dispatch(Actions.callAPI('edit-order-name', {}, {
				mainbillName: form,
				mainBillId: orderBaseInfo.id
			})).then(function(response) {
				Notify.show([{
					message: '修改成功!',
					type: 'success',
				}]);
			}).catch(function(err) {
				Notify.show([{
					message: err.message,
					type: 'danger',
				}]);
			});
		} else {
			Notify.show([{
				message: '订单名称不能为空',
				type: 'danger',
			}]);
		}


	}
	onClose = () => {

		this.setState({
			isShow: !this.state.isShow
		})
	}

	onView = () => {
		var _this = this;
		const {
			orderBaseInfo,
		} = this.state.response;
		let {
			isShow,
			View
		} = this.state
		if (!isShow) {
			Store.dispatch(Actions.callAPI('get-order-station', {
				mainBillId: orderBaseInfo.id
			})).then(function(response) {
				_this.setState({
					staionsList: response
				})


			}).catch(function(err) {
				Notify.show([{
					message: err.message,
					type: 'danger',
				}]);
			});
		}

		this.onClose();
	}

	render() {

		const {
			orderBaseInfo,
			earnest,
			contractList,
			installmentPlan,
			contractStatusCount,

		} = this.state.response;
		let {
			isShow
		} = this.state
		if (this.state.loading) {
			return (<Loading/>);
		}


		return (
			<div>


			<Title value="客户订单详情_财务管理"/>

			<BreadCrumbs children={['系统运营','财务管理']} hide={!!this.props.location.query.closeAll}/>

			<Section title="客户订单详情" description="" hide={!!this.props.location.query.closeAll} bodyPadding={'20px 20px 50px 20px'}>
			
			<div className="content">
						{/*<StaionInfo onClose={this.onClose}  detail={this.state.staionsList} className='showCon' isShow={isShow} id={orderBaseInfo.id}/>*/}
			<Button label="新建合同"  onTouchTap={this.openCreateAgreementDialog} style={{width:160,height:40,fontSize:'18px !important'}}/>
						<span className="border-top" style={{marginTop:'20px !important'}}></span>
			<DotTitle title='合同列表' style={{marginTop:40,marginBottom:30}}/>

			<Table className="orders" pageSize={contractList.length} displayCheckbox={false} >
			<TableHeader>
			<TableHeaderColumn>合同类型</TableHeaderColumn>
			<TableHeaderColumn>租金金额</TableHeaderColumn>
			<TableHeaderColumn>工位个数</TableHeaderColumn>
			<TableHeaderColumn>会议室个数</TableHeaderColumn>
			<TableHeaderColumn>起始日期</TableHeaderColumn>
			<TableHeaderColumn>终止日期</TableHeaderColumn>
			<TableHeaderColumn>工位/会议室均价(月)</TableHeaderColumn>
			<TableHeaderColumn>销售员</TableHeaderColumn>
			<TableHeaderColumn>录入人</TableHeaderColumn>
			<TableHeaderColumn>操作</TableHeaderColumn>
			</TableHeader>
			<TableBody>

			{contractList.map((item,index)=>{
				
				return (
					<TableRow key={index}>
					{this.getAgrementType(item.contracttype)}
					<TableRowColumn>{item.totalrent}</TableRowColumn>
					<TableRowColumn>{item.stationnum}</TableRowColumn>
					<TableRowColumn>{item.boardroomnum}</TableRowColumn>
					<TableRowColumn><KrDate value={item.leaseBegindate}/></TableRowColumn>
					<TableRowColumn><KrDate value={item.leaseEnddate}/></TableRowColumn>
					<TableRowColumn>{item.staionOrMeetingPrice}</TableRowColumn>
					<TableRowColumn>{item.saler}</TableRowColumn>
					<TableRowColumn>{item.inputUser}</TableRowColumn>
					<TableRowColumn>
					<Button  type="link" label="查看" href={this.getAgrementDetailUrl(item.customerid,this.props.params.orderId,item.contracttype,item.id)} />
							{item.contractstate != 'EXECUTE' && item.editFlag && <Button  type="link" label="编辑" href={this.getAgrementEditUrl(item.customerid,this.props.params.orderId,item.contracttype,item.id)} disabled={item.contractstate == 'EXECUTE'}/> }

							{item.contracttype == 'ENTER' && item.contractstate != 'EXECUTE' && item.editFlag  && <Button  type="link" label="删除"  href="javascript:void(0)" onTouchTap={this.setDelAgreementId.bind(this,item.id)} disabled={item.contractstate == 'EXECUTE'}/> }
						{/*
							{item.contractstate != 'EXECUTE' && item.editFlag  && <Button  type="link" label="删除" onTouchTap={this.delArgument.bind(this,item.id)} disabled={item.contractstate == 'EXECUTE'}/> }

							*/}


					</TableRowColumn>
					</TableRow>
				);
			})}

			</TableBody>
			</Table>

			<DotTitle title='分期计划' style={{marginTop:40,marginBottom:30}}/>

			<div className='ui-remark'>
              <div className='ui-circle-remark'><span className='circle-color circle-color-top over-circle'></span><span className='remark-green-text'>已完成</span></div>
              <div className='ui-circle-remark'><span className='circle-color circle-color-top section-circle'></span><span className='remark-green-text'>付部分款</span></div>
              <div className='ui-circle-remark'><span className='circle-color circle-color-top no-pay'></span><span className='remark-green-text'>未付款</span></div>
			</div>

			<div className="planList">
				<div className="headerList">
					<div className="type">类型</div>
					<div className="fund">款项</div>
					<div className="Begindate">分期开始时间</div>
					<div className="Enddate">分期结束时间</div>
					<div className="planMoney">计划付款金额</div>
					<div className="actualMoney">实际付款金额</div>
					<div className="status">状态</div>
				</div>
				{installmentPlan && installmentPlan.map((item,index)=>{
					return(
						<div className="contentList"  key={index}>
							<div className="type">
								<div className="typeCon">
									<div className="p">{item.detailName}{item.detailStart}至{item.detailEnd}</div>
								</div>
								
							</div>
							<div className="conlist">
							{item.installment && item.installment.map((items,indexs)=>{
								return(
										<div className="list" key={indexs}>
											<div className="fund">{items.installmentName}</div>
											<div className="Begindate"><KrDate value={items.installmentBegindate}/></div>
											<div className="Enddate"><KrDate value={items.installmentEnddate}/></div>
											<div className="planMoney">{items.installmentAmount}</div>
											<div className="actualMoney">{items.installmentBackamount}</div>
											<div className="status">
												<Circle type={items.payStatus}></Circle>
											</div>
										</div>
								)

							})}
							</div>
							
						</div>


					)


				})}
					


			</div>
			
            <DotTitle title='订单描述' style={{marginTop:24}}/>
			<div className="orderList">
			<Grid style={{marginTop:40}} >
				<Row>
				<Col md={4}><KrField label="社区名称"component="labelText" value={orderBaseInfo.communityName} defaultValue="无" alignRight={true} tooltip={orderBaseInfo.communityName}/></Col>
				<Col md={4}><KrField label="客户名称" component="labelText" value={orderBaseInfo.customerName} alignRight={true} tooltip={orderBaseInfo.customerName}/></Col>
				<Col md={4}><KrField label="订单名称" oldText={orderBaseInfo.mainbillname} component="editLabelText" tooltip={orderBaseInfo.mainbillname}  alignRight={true} save={this.change}  /></Col>
				</Row>
				<Row>
				<Col  md={4} ><KrField label="当前工位数" component="labelText" value={orderBaseInfo.stationnum} defaultValue="0" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="订单编号"  component="labelText" value={orderBaseInfo.mainbillcode} defaultValue="无" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="起始日期" component="labelText" value={orderBaseInfo.contractEntrydate} type="date" defaultValue="无" alignRight={true}/></Col>
				</Row>
				<Row>
				<Col  md={4} ><KrField label="结束日期" component="labelText" value={orderBaseInfo.contractLeavedate} type="date" defaultValue="无" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="撤场日期" component="labelText" value={orderBaseInfo.actualLeavedate} type="date" defaultValue="无" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="订单总额" component="labelText" value={orderBaseInfo.contractTotalamount} defaultValue="0" alignRight={true}/></Col>
				</Row>

				<Row>
				<Col  md={4} ><KrField label="回款总额" component="labelText" value={orderBaseInfo.contractBackamount} defaultValue="0" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="未回款额" component="labelText" value={orderBaseInfo.unBackamount} defaultValue="0" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="工位回款" component="labelText" value={orderBaseInfo.paidrent} defaultValue="0" alignRight={true}/></Col>
				</Row>
				<Row>
				<Col  md={4} ><KrField label="实收押金" component="labelText" value={orderBaseInfo.realdeposit} defaultValue="0" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="实收定金" component="labelText" value={orderBaseInfo.realdownpayment} defaultValue="0" alignRight={true}/></Col>
				<Col  md={4} ><KrField label="其他回款" component="labelText" value={orderBaseInfo.refundamount} defaultValue="0" alignRight={true}/></Col>
				</Row>
				{/*				<Row>
								<Col  md={4} ><div className="staion">工位编号</div><div className="view"  onTouchTap={this.onView} >点击查看</div></Col>
								<Col  md={4} ><div className="staion"></div><div className="view"></div></Col>
								<Col  md={4} ><div className="staion"></div><div className="view"></div></Col>
								</Row>
				*/}
			</Grid>

            </div>

            
			<span className="border-bottom" style={{marginTop:60}}></span>
			
          	</div>
          	
          	
			</Section>


			<Dialog
			title="新建合同"
			modal={true}
			onClose={this.openCreateAgreementDialog}
			open={this.state.openCreateAgreement}
			contentStyle={{width:687}}>
				<NewCreatForm contractStatusCount={contractStatusCount} params={this.props.params}/>
			</Dialog>


			<Dialog
			title="删除合同"
			modal={true}
			onClose={this.openDelAgreementDialog}
			open={this.state.openDelAgreement}
			contentStyle={{width:445,height:236}}>
				<DelAgreementNotify onSubmit={this.confirmDelAgreement} onCancel={this.openDelAgreementDialog.bind(this,0)}/>
			</Dialog>
			</div>

		);
	}
}