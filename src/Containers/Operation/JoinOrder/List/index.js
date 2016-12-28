import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import Section from 'kr-ui/Section';

import {reduxForm } from 'redux-form';
import {KrField} from 'kr-ui';

import {Grid,Row,Col} from 'kr-ui/Grid';

import {GridList, GridTile} from 'material-ui/GridList';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
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

		this.openCreateCustomerDialog = this.openCreateCustomerDialog.bind(this);
		this.openCreateAgreementDialog = this.openCreateAgreementDialog.bind(this);
		this.confirmCreateAgreementSubmit = this.confirmCreateAgreementSubmit.bind(this);


		this.state = {
			openCreateCustomer:false,
			openCreateAgreement:false,
		};

	}

	confirmCreateAgreementSubmit(values){
		console.log('----',values);

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

  render() {


    return (

      <div>
			<Section title="客户列表" description="">

				 <Tabs>
					<Tab label="招商线索" >


							<Table>
								<TableHeader>
								  <TableRow>
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
								  </TableRow>
								</TableHeader>
								<TableBody>
								  <TableRow>
									<TableRowColumn>1</TableRowColumn>
									<TableRowColumn>John Smith</TableRowColumn>
									<TableRowColumn>Employed</TableRowColumn>
								  </TableRow>
								  <TableRow>
									<TableRowColumn>2</TableRowColumn>
									<TableRowColumn>Randal White</TableRowColumn>
									<TableRowColumn>Unemployed</TableRowColumn>
								  </TableRow>
								  <TableRow>
									<TableRowColumn>3</TableRowColumn>
									<TableRowColumn>Stephanie Sanders</TableRowColumn>
									<TableRowColumn>Employed</TableRowColumn>
								  </TableRow>
								  <TableRow>
									<TableRowColumn>4</TableRowColumn>
									<TableRowColumn>Steve Brown</TableRowColumn>
									<TableRowColumn>Employed</TableRowColumn>
								  </TableRow>
								</TableBody>
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


							<Table>
													<TableHeader>
													  <TableRow>

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
													  </TableRow>
													</TableHeader>
													<TableBody>
													  <TableRow>
														<TableRowColumn>1</TableRowColumn>
														<TableRowColumn>John Smith</TableRowColumn>
														<TableRowColumn>Employed</TableRowColumn>
													  </TableRow>
													  <TableRow>
														<TableRowColumn>2</TableRowColumn>
														<TableRowColumn>Randal White</TableRowColumn>
														<TableRowColumn>Unemployed</TableRowColumn>
													  </TableRow>
													  <TableRow>
														<TableRowColumn>3</TableRowColumn>
														<TableRowColumn>Stephanie Sanders</TableRowColumn>
														<TableRowColumn>Employed</TableRowColumn>
													  </TableRow>
													  <TableRow>
														<TableRowColumn>4</TableRowColumn>
														<TableRowColumn>Steve Brown</TableRowColumn>
														<TableRowColumn>Employed</TableRowColumn>
													  </TableRow>
													</TableBody>
												  </Table>

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
<Table>
								<TableHeader>
								  <TableRow>
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
								  </TableRow>
								</TableHeader>
								<TableBody>

								  <TableRow>
									<TableRowColumn>4</TableRowColumn>
									<TableRowColumn>Steve Brown</TableRowColumn>
									<TableRowColumn>Employed</TableRowColumn>
									<TableRowColumn>Employed</TableRowColumn>
									<TableRowColumn>Employed</TableRowColumn>
									<TableRowColumn>Employed</TableRowColumn>
									<TableRowColumn>Employed</TableRowColumn>
									<TableRowColumn>Employed</TableRowColumn>
									<TableRowColumn>Employed</TableRowColumn>
									<TableRowColumn>
 <FlatButton label="Default" />
 <FlatButton label="Default" />
			</TableRowColumn>
								  </TableRow>

								</TableBody>
							  </Table>

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
