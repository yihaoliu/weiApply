import React, {
	Component,
	PropTypes
} from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';
import dateFormat from 'dateformat';

import {
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
} from 'kr-ui';


export default class ConfirmFormDetail extends Component {


	static PropTypes = {
		detail: React.PropTypes.object,
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props, context) {
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

	}

	onSubmit(form) {

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

	render() {

		let {
			detail,
			optionValues
		} = this.props;

		detail = Object.assign({}, detail);

		var leasorName;
		optionValues.fnaCorporationList && optionValues.fnaCorporationList.map((item) => {
			if (item.value === detail.leaseId) {
				return leasorName = item.label;
			}
		});

		detail.signdate = dateFormat(detail.signdate, "yyyy-mm-dd ");
		detail.withdrawdate = dateFormat(detail.withdrawdate, "yyyy-mm-dd ");

		return (

			<div>
								<KrField name="lessorId"  grid={1/2} component="labelText" label="出租方" value={leasorName} />

								 <KrField grid={1/2}  name="lessorAddress"  component="labelText" label="地址" value={detail.lessorAddress}/>

								 <KrField grid={1/2}  name="lessorContactid" component="labelText" label="联系人" value={detail.lessorContactName} />
								 <KrField grid={1/2}  name="lessorContacttel"  component="labelText" label="电话" value={detail.lessorContacttel}/>

								 <KrField grid={1/2}  name="leaseId" component="labelText" label="承租方" value={optionValues.customerName}/>
								 <KrField grid={1/2}  name="leaseAddress"  component="labelText" label="地址" value={detail.leaseAddress} />

								 <KrField grid={1/2}  name="leaseContact"  component="labelText" label="联系人" value={detail.leaseContact}/>
								 <KrField grid={1/2}  name="leaseContacttel"  component="labelText" label="电话" value={detail.leaseContacttel}/>

								 <KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value={optionValues.communityName} />

								 <KrField grid={1/2}  name=""  component="labelText" label="地址"  value={optionValues.communityAddress}/>
								 <KrField grid={1/2}  name="contractcode"  component="labelText" label="合同编号" value={detail.contractcode} />
								  <KrField grid={1/2}  name="totalreturn" component="labelText"  label="退租金总额" placeholder="" value={detail.totalreturn} />
							 <KrField grid={1/2}  name="depositamount"  component="labelText" label="退押金总额" value={detail.depositamount}/>
							 <KrField grid={1/2}  name="withdrawdate" component="labelText" label="撤场日期"  value={detail.withdrawdate}/>
							 <KrField grid={1/2}  name="signdate"  component="labelText" grid={1/2} label="签署时间" value={detail.signdate}/>
							 <KrField grid={1/2}  name="contractmark" component="labelText" label="备注" value={detail.contractmark}/>

							<KrField component="group" label="上传附件">
									{detail.contractFileList && detail.contractFileList.map((item,index)=>{
										return <Button label={item.fileName}  type="link" href={item.fileUrl} key={index} linkStyle={{display:'block'}}/>
									})}
							</KrField>

				<Grid>
					<Row style={{marginTop:30}} >
					<Col md={4}></Col>
						<Col md={2} align="center"> <Button  label="确定" type="button"  onTouchTap={this.onSubmit} /> </Col>
					  <Col md={2} align="center"> <Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
					<Col md={4}></Col>
				</Grid>
		 </div>);
	}
}