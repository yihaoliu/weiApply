/*
 *减租协议(查看）
 *
 *
 */

import React, {
	Component,
	PropTypes
} from 'react';

import {
	BreadCrumbs,
	Loading,
	Notify,
	Section,
	SplitLine,
	DotTitle,
	PaperBack
} from 'kr-ui';
import dateFormat from 'dateformat';

import {
	KrField,
	LabelText,
	KrDate,
	Title,
} from 'kr-ui';

import RaisedButton from 'material-ui/RaisedButton';

import {
	Button
} from 'kr-ui';
import {
	Actions,
	Store
} from 'kr/Redux';

import {
	Grid,
	Row,
	Col
} from 'kr-ui/Grid';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter
} from 'kr-ui/Table';

export default class ReduceDetail extends Component {


	constructor(props, context) {
		super(props, context);


		this.state = {
			loading: true,
			basic: {
				payment: {},
				stationVos: []
			}
		}

		var _this = this;
		console.log(this.props.params);
		Store.dispatch(Actions.callAPI('showFnaContractRentController', {
			id: this.props.params.id,
			communityId: this.props.params.orderId,
			customerId: this.props.params.customerId
		})).then(function(response) {
			_this.setState({
				basic: response
			});
		});

		setTimeout(function() {
			_this.setState({
				loading: false
			});
		}, 0);


	}

	componentWillMount() {

	}


	render() {

		if (this.state.loading) {
			return (<Loading/>);
		}

		const orderBaseInfo = {};
		const contractList = [];

		const {
			basic
		} = this.state;
		const params = this.props.params;

		function onCancel() {
			// window.history.back();
			location.href = "/#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/detail"
		}

		function getOrderUrl() {
			return `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
		}


		const BasicRender = (props) => {
			const content = {
				position: 'relative',
				width: '900px',
				margin: '0 auto',
				fontSize: 14
			}
			const info = {
				padding: '30px 70px',
				paddingBottom:10
			}

			console.log('basic', basic)
			return (
				<div className="content" style={content}>
				  	<PaperBack label="减租协议书详情页"/>
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
								<KrField component="labelText" grid={1/2} label="所属社区：" value={basic.communityName} defaultValue="无" requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="地址：" value={basic.communityAddress} defaultValue="无" requireBlue={true}/>

								<KrField component="labelText" grid={1/2} label="合同编号：" value={basic.contractcode} defaultValue="无" requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="减租金额：" value={basic.rentamount} defaultValue="0" requireBlue={true}/>

								<KrField component="labelText"	 grid={1/1} label="签署日期：" value={basic.signdate} type="date" defaultValue="无" requireBlue={true}/>
								<KrField component="labelText"  label="备注：" value={basic.contractmark} defaultValue="无" requireBlue={true} inline={false}/>


					<KrField component="group" label="上传附件：" requireBlue={true}>
							{basic.contractFileList && basic.contractFileList.map((item,index)=>{
								return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
							})}
			  		</KrField>


			<DotTitle title="租赁明细" >

											<Table displayCheckbox={false}>
															<TableHeader>
																	<TableHeaderColumn>类别</TableHeaderColumn>
																	<TableHeaderColumn>编号／名称</TableHeaderColumn>
																	<TableHeaderColumn>单价（元／月）</TableHeaderColumn>
																	<TableHeaderColumn>减租起始日期</TableHeaderColumn>
																	<TableHeaderColumn>减租结束日期</TableHeaderColumn>
															</TableHeader>
															<TableBody>

															{basic.stationVos && basic.stationVos.map((item,index)=>{
																return (
																	 <TableRow key={index}>
																	<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
																	<TableRowColumn>
																		{item.stationName}
																	</TableRowColumn>
																	<TableRowColumn>
																		{item.unitprice}
																	</TableRowColumn>
																	<TableRowColumn><KrDate value={basic.leaseBegindate}/></TableRowColumn>
																	<TableRowColumn><KrDate value={basic.leaseEnddate}/></TableRowColumn>
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

					<Title value="减租协议书详情_财务管理"/>

			<BreadCrumbs children={['社区运营',,'合同详情','减租合同查看']}/>

			<Section title="减租协议书" description="" bodyPadding={"20px 20px 150px 20px"}>
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
