import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import Section from 'kr-ui/Section';
import BreadCrumbs from 'kr-ui/BreadCrumbs';

import {reduxForm } from 'redux-form';
import {KrField} from 'kr-ui';

import {Grid,Row,Col} from 'kr-ui/Grid';

import {GridList, GridTile} from 'material-ui/GridList';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import {RaisedButton,Dialog,FlatButton} from 'material-ui';




var SubmitValidationForm = (props) => {

  const { error, handleSubmit, pristine, reset, submitting,submit,cancel } = props;

  return (

	<form onSubmit={handleSubmit(submit)}>

	  <KrField name="username" type="text" label="用户名" />
	  <KrField name="name" type="text" label="hahah" />



				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={8}></Col>
						<Col md={2}> <RaisedButton  label="确定" type="submit" joinEditForm /> </Col>
						<Col md={2}> <FlatButton label="取消"  onTouchTap={cancel} /> </Col>

					</Row>

				</Grid>


		  {/*
			<FlatButton label="重置" joinEditForm onTouchTap={reset} disabled={pristine || submitting} />
		  */}

	</form>

  )
}

SubmitValidationForm = reduxForm({
  form: 'Validation'
})(SubmitValidationForm);




export default class JoinOrderList extends Component {

	constructor(props,context){
		super(props, context);


		this.renderCustomerItem = this.renderCustomerItem.bind(this);
		this.renderOrderItem = this.renderOrderItem.bind(this);
		this.openCreateCustomerDialog = this.openCreateCustomerDialog.bind(this);
		this.openCreateAgreementDialog = this.openCreateAgreementDialog.bind(this);
		this.confirmCreateAgreementSubmit = this.confirmCreateAgreementSubmit.bind(this);


		this.state = {
			openCreateCustomer:false,
			openCreateAgreement:false,
		};

	}

	confirmCreateAgreementSubmit(values){
		this.openCreateAgreementDialog();
	}

	openCreateCustomerDialog(){
		this.setState({
			openCreateCustomer:!this.state.openCreateCustomer
		});
	}

	openCreateAgreementDialog(){
		this.setState({
			openCreateAgreement:!this.state.openCreateAgreement
		});
	}

	componentWillMount() {

	}

	renderCustomerItem(){

		return (

				<TableBody colSpan={10} insertElement={this.renderOrderItem()}>
					<TableRow>
						<TableRowColumn>4</TableRowColumn>
						<TableRowColumn>4</TableRowColumn>
						<TableRowColumn>4</TableRowColumn>
						<TableRowColumn>4</TableRowColumn>
						<TableRowColumn>4</TableRowColumn>
						<TableRowColumn>4</TableRowColumn>
						<TableRowColumn>4</TableRowColumn>
						<TableRowColumn>4</TableRowColumn>
						<TableRowColumn>Steve Brown</TableRowColumn>
						<TableRowColumn><RaisedButton label="创建订单" href="/#/operation/customerManage/343/order/create" /></TableRowColumn>
				 </TableRow>
			</TableBody>
		);

	}

	renderOrderItem(item,customerId){

		return(

			<Table>
					<TableHeader>
							<TableHeaderColumn>ID</TableHeaderColumn>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>
					<TableBody>
						 <TableRow>
							<TableRowColumn>1</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>Employed</TableRowColumn>
						</TableRow>

						 <TableRow>
							<TableRowColumn>1</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn><RaisedButton label="创建订单" href="/#/operation/customerManage/343/order/34324/detail" /></TableRowColumn>
						</TableRow>
				   </TableBody>
			 </Table>


		);

	}

  render() {


	return (

	  <div>

			<BreadCrumbs children={['系统运营','财务管理']}/>

			<Section title="客户列表" description="">


				 <Tabs >
					<Tab label="招商线索"  >

							<Table displayCheckbox={true}>
								<TableHeader>
									<TableHeaderColumn>ID</TableHeaderColumn>
									<TableHeaderColumn>项目名称</TableHeaderColumn>
									<TableHeaderColumn>公司名称</TableHeaderColumn>
									<TableHeaderColumn>项目类型</TableHeaderColumn>
									<TableHeaderColumn>所在城市</TableHeaderColumn>
									<TableHeaderColumn>来源</TableHeaderColumn>
									<TableHeaderColumn>客户分类</TableHeaderColumn>
									<TableHeaderColumn>领取人</TableHeaderColumn>
									<TableHeaderColumn>创建时间</TableHeaderColumn>
									<TableHeaderColumn>操作</TableHeaderColumn>
								</TableHeader>

								{this.renderCustomerItem()}

							  </Table>


					</Tab>

					<Tab label="个人用户" >



						<Grid>
							<Row>
								<Col>
									 <RaisedButton label="新建客户" onTouchTap={this.openCreateAgreementDialog} />
								</Col>
							</Row>
						</Grid>



					</Tab>
					<Tab label="签约用户" >

						<Grid>
							<Row style={{marginTop:20,marginBottom:20}}>
								<Col>
									 <RaisedButton label="新建合同" onTouchTap={this.openCreateAgreementDialog} />
								</Col>
								<Col></Col>
							</Row>
						</Grid>


					</Tab>
			  </Tabs>




			</Section>



			<Dialog
				title="表单提交"
				modal={true}
				open={this.state.openCreateCustomer}
			>

			</Dialog>



			<Dialog
				title="表单提交"
				modal={true}
				open={this.state.openCreateAgreement}
			>
				<SubmitValidationForm  submit={this.confirmCreateAgreementSubmit} cancel={this.openCreateAgreementDialog}/>
			</Dialog>


	  </div>
	);
  }
}
