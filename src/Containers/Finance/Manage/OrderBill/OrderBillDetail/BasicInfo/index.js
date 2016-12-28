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
import './index.less';
import {
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
	Notify,
	List,
	ListItem,
	KrField,
	LabelText,
	KrDate,
} from 'kr-ui';


export default class BasicInfo extends Component {
	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}
	static defaultProps = {
		detail: {

		},
	}

	static PropTypes = {
		detail: React.PropTypes.object,
		detailPayment: React.PropTypes.object,
		detailIncome: React.PropTypes.object,
	}

	constructor(props, context) {
		super(props, context);
	}


	componentDidMount() {

	}

	render() {

		const {
			detail,
			detailPayment,
			detailIncome
		} = this.props;

		if (!detail.mainbillname) {
			detail.mainbillname = '';
		}

       let style= {
			color:'#ff6868',
		}

		return (

			<div className='ui-detail-order'>

			           <KrField grid={1/3} alignRight={true} label="社区名称:" component="labelText" value={detail.communityname} defaultValue="无"/>
			           <KrField grid={1/3} alignRight={true} label="客户名称:" component="labelText" value={detail.customername} defaultValue="无"/>

			           <KrField grid={1/3}  alignRight={true} component="labelText" type="link" label="订单名称:" value={detail.mainbillname} href={`./#/operation/customerManage/${this.props.detail.customerid}/order/${this.context.params.orderId}/detail`}  />

                       <KrField grid={1/3} alignRight={true} label="当前工位数:" component="labelText" value={detail.totalstationnum} defaultValue="无"/>

                       <KrField grid={1/3} alignRight={true} label="起始日期:" component="labelText" type="date" value={detail.startdate} defaultValue="无"/>

			           <KrField grid={1/3} alignRight={true} label="结束日期:" component="labelText" type="date" value={detail.enddate} defaultValue="无"/>

			           <KrField grid={1/3} alignRight={true} label="撤场日期:" component="labelText" type="date" value={detail.leavedate} defaultValue="无"/>

			            <KrField grid={1/3} alignRight={true} label="订单总额:" component="labelText" value={detail.totalamount} defaultValue="无" />

			            
			             <KrField grid={1/3} alignRight={true} label="回款定金:" component="labelText" value={detail.frontMoney} defaultValue="无"/>
			             <KrField grid={1/3} alignRight={true} label="回款押金:" component="labelText" value={detail.deposit} defaultValue="无"/>

			            <KrField grid={1/3} alignRight={true} label="回款总额:" component="labelText" value={detail.totalPayment} defaultValue="无"/>

			            <KrField grid={1/3} alignRight={true} label="未回款额:" colorStyle={style} component="labelText" value={detail.notPaymentAmount} defaultValue="无"/>
			            {/*{detailPayment.map((item,index)=>						
						    <KrField key={index} grid={1/3} label={item.propname} component="labelText" value={item.propamount}/>						 
						 )}
						 {detailIncome.map((item,index)=>
						    <KrField key={index} grid={1/3} label={item.propname} component="labelText" value={item.propamount}/>
						 )}*/}



			</div>

		)

	}

}
