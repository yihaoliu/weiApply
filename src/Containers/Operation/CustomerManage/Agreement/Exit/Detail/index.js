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
	KrField,
	LabelText,
	PaperBack,
	Title
} from 'kr-ui';

import Date from 'kr-ui/Date';
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
import dateFormat from 'dateformat';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter
} from 'kr-ui/Table';

export default class ExitDetail extends Component {


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

		Store.dispatch(Actions.callAPI('getFnaContractWithdrawalById', {
			id: this.props.params.id
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
		const params = this.props.params;

		function onCancel() {
			location.href = "/#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/detail"
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
				fontSize:14
			}
			const info = {
				padding: '30px 70px',
				paddingBottom:10
			}

			return (
				<div className="content" style={content}>
					 <Title value="退租协议书详情页_财务管理"/>
				  	<PaperBack label="退租协议书详情页"/>
				  	<div className="content-info" style={info} >


								<KrField component="labelText" grid={1/2} label="出租方：" value={basic.lessorName} requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="地址：" value={basic.lessorAddress} requireBlue={true}/>

								<KrField component="labelText" grid={1/2} label="联系人：" value={basic.lessorContactName} requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="电话：" value={basic.lessorContacttel} requireBlue={true}/>

								<KrField component="labelText" grid={1/2} label="承租方：" value={basic.customerName} requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="地址：" value={basic.leaseAddress} requireBlue={true}/>

								<KrField component="labelText" grid={1/2} label="联系人：" value={basic.leaseContact} requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="电话：" value={basic.leaseContacttel} requireBlue={true}/>
								<SplitLine />
								<KrField component="labelText" grid={1/2} label="所属社区：" value={basic.communityName} requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="地址：" value={basic.communityAddress} requireBlue={true}/>

								<KrField component="labelText" grid={1} label="合同编号：" value={basic.contractcode} requireBlue={true}/>

								<KrField component="labelText" grid={1/2} label="退租金总额：" value={basic.totalreturn} defaultValue="0" requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="退租押金总额：" value={basic.depositamount} defaultValue="0" requireBlue={true}/>

								<KrField component="labelText" grid={1/2} label="撤场日期：" type="date" value={basic.withdrawdate} defaultValue="无" requireBlue={true}/>
								<KrField component="labelText" grid={1/2} label="签署日期：" type="date" value={basic.signdate} defaultValue="无" requireBlue={true}/>

								<KrField component="labelText"  label="备注：" value={basic.contractmark} inline={false} requireBlue={true} defaultValue="无"/>

					<KrField component="group" label="上传附件："  requireBlue={true}>
							{basic.contractFileList && basic.contractFileList.map((item,index)=>{
								return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
							})}
			  		</KrField>
			</div>
				  </div>
			);

		}

		return (

			<div>
				<BreadCrumbs children={['社区运营',,'合同详情','退租合同查看']}/>
				<Section title="退租协议书" description="" bodyPadding={"20px 20px 150px 20px"}>
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
