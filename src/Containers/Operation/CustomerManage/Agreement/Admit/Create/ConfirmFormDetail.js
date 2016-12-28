import React, {Component, PropTypes} from 'react';

import {Actions,Store} from 'kr/Redux';

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
	KrDate,
	DotTitle
} from 'kr-ui';

import dateFormat from 'dateformat';
export default class ConfirmFormDetail  extends Component{


	static PropTypes = {
		detail:React.PropTypes.object,
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
		optionValues:React.PropTypes.object,
	}

	constructor(props,context){
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel  = this.onCancel.bind(this);

	}

	onSubmit(form){
		const {onSubmit} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel(){

		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	render(){

		let {detail, optionValues} = this.props;

		detail = Object.assign({},detail);

        var leasorName ;
          optionValues.fnaCorporationList && optionValues.fnaCorporationList.map((item)=>{
        	if(item.id === detail.leaseId){
        		return leasorName = item.corporationName;
        	}
        });
        var payment;
        optionValues.paymentList && optionValues.paymentList.map((item)=>{
        	if(item.id === detail.paymentId){
        		return payment = item.label;
        	}
        })
         	detail.leaseBegindate=dateFormat(detail.leaseBegindate,"yyyy-mm-dd ");
	        detail.leaseEnddate=dateFormat(detail.leaseEnddate,"yyyy-mm-dd ");
	        detail.signdate=dateFormat(detail.signdate,"yyyy-mm-dd ");

	  return (


		       <div>

								<KrField  grid={1/2} component="labelText" label="出租方" value={leasorName} inline={false}/>

								 <KrField grid={1/2}   component="labelText" label="地址" value={detail.lessorAddress} inline={false}/>

								 <KrField grid={1/2}  component="labelText" label="联系人" value={detail.lessorContactName} inline={false}/>
								 <KrField grid={1/2}   component="labelText" label="电话" value={detail.lessorContacttel} inline={false}/>

								 <KrField grid={1/2}   component="labelText" label="承租方" value={optionValues.customerName} inline={false}/>
								 <KrField grid={1/2}    component="labelText" label="地址" value={detail.leaseAddress} inline={false}/>

								 <KrField grid={1/2}   component="labelText" label="联系人" value={detail.leaseContact} inline={false}/>
								 <KrField grid={1/2}    component="labelText" label="电话" value={detail.leaseContacttel} inline={false}/>

								 <KrField grid={1/2}   component="labelText" label="所属社区" value={optionValues.communityName} inline={false}/>

								<KrField   grid={1/2} component="labelText" label="所在楼层" value={detail.wherefloor} inline={false}/>

								 <KrField grid={1/2}   component="labelText" label="定金总额"  value={detail.totaldownpayment} inline={false}/>
								 <KrField grid={1/2}    component="labelText" label="签署日期"  value={detail.signdate} inline={false}/>




								<KrField name="paymodel"  grid={1/2} component="labelText" label="合同编号" value={detail.contractcode} inline={false}/>
								<KrField name="paytype"  grid={1/2} component="labelText" label="付款方式" value={payment} inline={false}/>


								 <KrField grid={1/2}  name="stationnum"  component="labelText" label="租赁工位" value={`${detail.stationnum}个`} defaultValue="0" inline={false}/>
								 <KrField grid={1/2}  name="boardroomnum"  component="labelText" label="租赁会议室" value={`${detail.boardroomnum}个`} defaultValue="0" inline={false}/>


							  <KrField grid={1/2}  name="username" component="labelText" label="租赁期限" value={`${detail.leaseBegindate}--${detail.leaseEnddate}`} defaultValue="0" inline={false}/>
							 <KrField grid={1/2}  name="rentaluse"  component="labelText" label="保留天数" value={detail.templockday} defaultValue="0"  inline={false}/>


							 <KrField grid={1}  name="contractmark" component="labelText" label="备注" value={detail.contractmark} defaultValue="无" inline={false}/>

							 <KrField component="group" label="上传附件" inline={false}>
									{detail.contractFileList && detail.contractFileList.map((item,index)=>{
										return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
									})}
							</KrField>


                    <DotTitle title='租赁明细'>



							<Table  displayCheckbox={false}>
									<TableHeader>
											<TableHeaderColumn>类别</TableHeaderColumn>
											<TableHeaderColumn>编号／名称</TableHeaderColumn>
											<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
											<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
									</TableHeader>
									<TableBody>

										{detail.list && detail.list.map((item,index)=>{
											return (
												<TableRow key={index}>
													<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
													<TableRowColumn>{item.stationName}</TableRowColumn>

												<TableRowColumn>
													<KrDate value={item.leaseBeginDate} format="yyyy-mm-dd"/>
												</TableRowColumn>
													<TableRowColumn>
													<KrDate value={item.leaseEndDate} format="yyyy-mm-dd"/>
												</TableRowColumn>
												</TableRow>
											);
										})}
								   </TableBody>
							 </Table>


               </DotTitle>
			    <Grid>
					<Row style={{marginTop:30}}>
						<Col md={4}></Col>

						<Col md={2} align="center"> <Button  label="确定" type="button"  onTouchTap={this.onSubmit}/> </Col>
					  <Col md={2} align="center"> <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel}/> </Col>

						<Col md={4}></Col>
					  </Row>
				</Grid>
		 </div>
		 );
	}
}
