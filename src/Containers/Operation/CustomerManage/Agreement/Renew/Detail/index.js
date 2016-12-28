import React, {
	Component,
	PropTypes
} from 'react';

import {
	BreadCrumbs,
	Loading,
	Notify,
	Section,
	DotTitle,
	SplitLine,
	PaperBack
} from 'kr-ui';

import {
	KrField,
	LabelText,
	KrDate,
	Button,
	Grid,
	Row,
	Col,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Title,

} from 'kr-ui';


import {
	Actions,
	Store
} from 'kr/Redux';


export default class JoinDetail extends Component {


	constructor(props, context) {
		super(props, context);


		this.state = {
			basic: {
				payment: {},
				stationVos: []
			}
		}

		var _this = this;

		Store.dispatch(Actions.callAPI('show-checkin-agreement', {
				id: _this.props.params.id
			}))
			.then(function(response) {

				_this.setState({
					basic: response
				});
			});

	}

	componentWillMount() {

	}


	render() {


		const orderBaseInfo = {};
		const contractList = [];

		const params = this.props.params;

		function onCancel() {
			location.href = "/#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/detail";
		}

		function getOrderUrl() {
			return `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
		}

		const {
			basic
		} = this.state;

		const BasicRender = (props) => {
			const content = {
				position: 'relative',
				width: '900px',
				margin: '0 auto',
				fontSize: 14
			}
			const info = {
				padding: '30px 70px',
				paddingBottom: 10
			}
			return (
				<div className="content" style={content}>
						<Title value="续租协议书详情页_财务管理"/>
				  	<PaperBack label="续租协议书详情页"/>
				  	<div className="content-info" style={info} >

								<KrField component="labelText" grid={1/2} label="出租方：" value={basic.lessorName} defaultValue="无" requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="地址：" value={basic.lessorAddress} defaultValue="无" requireBlue={true}/>

								<KrField component="labelText" grid={1/2} label="联系人：" value={basic.lessorContactName} defaultValue="无" requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="电话：" value={basic.lessorContacttel} defaultValue="无" requireBlue={true}/>

								<KrField component="labelText" grid={1/2} label="承租方：" value={basic.customerName} defaultValue="无" requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="地址：" value={basic.leaseAddress} defaultValue="无" requireBlue={true}/>

								<KrField component="labelText" grid={1/2} label="联系人：" value={basic.leaseContact} defaultValue="无" requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="电话：" value={basic.leaseContacttel} defaultValue="无" requireBlue={true}/>
								<SplitLine />
								<KrField component="labelText"  label="所属社区：" value={basic.communityName} defaultValue="无" requireBlue={true}/>


								<KrField component="labelText" grid={1/2} label="地址：" value={basic.communityAddress} defaultValue="无" requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="合同编号：" value={basic.contractcode} defaultValue="无" requireBlue={true}/>

								<KrField component="labelText" grid={1/2} label="支付方式：" value={basic.payType && basic.payType.dicName} defaultValue="无" requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="付款方式：" value={basic.payment.dicName} defaultValue="无" requireBlue={true}/>
								<KrField component="labelText" type="date" grid={1/2} label="签署日期：" value={basic.signdate} defaultValue="无" requireBlue={true}/>



								
								<KrField component="labelText" grid={1/2} label="首付款时间：" type="date" value={basic.firstpaydate} requireBlue={true}/>

								<KrField component="labelText" grid={1/2}  label="租金总额：" value={basic.totalrent} defaultValue="0" requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="押金总额：" value={basic.totaldeposit} defaultValue="0" requireBlue={true}/>

								<KrField component="labelText"  label="备注：" value={basic.contractmark} defaultValue="无" requireBlue={true} inline={false}/>

					<KrField component="group" label="上传附件：" requireBlue={true}>
							{basic.contractFileList && basic.contractFileList.map((item,index)=>{
								return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
							})}
			  		</KrField>



			<DotTitle title="租赁明细">

											<Table displayCheckbox={false}>
															<TableHeader>
																	<TableHeaderColumn>类别</TableHeaderColumn>
																	<TableHeaderColumn>编号／名称</TableHeaderColumn>
																	<TableHeaderColumn>单价（元／月）</TableHeaderColumn>
																	<TableHeaderColumn>起始日期</TableHeaderColumn>
																	<TableHeaderColumn>结束日期</TableHeaderColumn>
															</TableHeader>
															<TableBody>

																{basic.stationVos.length && basic.stationVos.map((item,index)=>{
																	console.log('item',item);
																	return (
																		 <TableRow key={index}>
																		<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
																		<TableRowColumn>
																			{item.stationName}
																		</TableRowColumn>
																		<TableRowColumn>
																			{item.unitprice}
																		</TableRowColumn>
																		<TableRowColumn>

																					<KrDate value={item.leaseBeginDate}/>

																		</TableRowColumn>
																		<TableRowColumn>
																								 <KrDate value={item.leaseEndDate}/>
																			</TableRowColumn>
																	   </TableRow>
																		);
																})}

														   </TableBody>
													 </Table>





											  </DotTitle>
				  </div>
				  </div>
			);

		}

		return (

			<div>

			<BreadCrumbs children={['社区运营',,'合同详情','续租合同查看']}/>

			<Section title="续租协议书" description="" bodyPadding={"20px 20px 150px 20px"}>
				<BasicRender/>

			<Grid>
				  <Row>
					  <Col md={5} align="center"></Col>
					  <Col md={2} align="center"> <Button  label="返回"  type="href"  href={getOrderUrl()} width={100} height={40} fontSize={16}/> </Col>
					  <Col md={5} align="center"></Col>
				  </Row>
			  </Grid>

			</Section>
      </div>

		);
	}
}