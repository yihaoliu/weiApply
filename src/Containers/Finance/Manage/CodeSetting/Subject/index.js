import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import {
	Actions,
	Store
} from 'kr/Redux';

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
	Dialog,
	Notify,
	BreadCrumbs,
	ListGroup,
	Title,
} from 'kr-ui';


import NewCreateForm from './NewCreateForm';
import SearchForm from './SearchForm';
import ItemDetail from './ItemDetail';
import EditDetailForm from './EditDetailForm';


export default class AttributeSetting extends Component {

	constructor(props, context) {
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

		this.onNewCreateSubmit = this.onNewCreateSubmit.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onEditSubmit = this.onEditSubmit.bind(this);

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
			accountname: {}
		}

	}

	componentDidMount() {

	}



	onExport(values) {
		let idList = [];
		if (values.length != 0) {
			values.map((item, value) => {
				idList.push(item.id)
			})
		}
		var url = `/api/krspace-finance-web/finaccount/finaFinaflowAccountModel/exportExcel?idList=${idList}`
		window.location.href = url;
	}

	onOperation(type, itemDetail) {

		this.setState({
			itemDetail
		});
		if (type == 'view') {
			this.openViewDialog();
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


	onEditSubmit(form) {

		this.openEditDetailDialog();

		Store.dispatch(Actions.callAPI('saveFinaFinaflowAccountModel', {}, form)).then(function(response) {
			Notify.show([{
				message: '编辑成功！',
				type: 'success',
			}]);
			window.setTimeout(function() {
				window.location.reload();
			}, 0);

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

	}

	//查看
	openViewDialog() {
		this.setState({
			openView: !this.state.openView
		});
	}

	//搜索
	onSearchSubmit(accountname) {

		this.setState({
			accountname
		});

	}

	onSearchCancel() {

	}


	//新建
	openNewCreateDialog() {
		this.setState({
			openNewCreate: !this.state.openNewCreate
		});
	}

	onNewCreateSubmit(values) {

		Store.dispatch(Actions.callAPI('saveFinaFinaflowAccountModel', {}, values)).then(function(response) {
			Notify.show([{
				message: '新建成功！',
				type: 'success',
			}]);
			window.setTimeout(function() {
				window.location.reload();
			}, 0);

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
		this.openNewCreateDialog();
	}

	onNewCreateCancel() {
		this.openNewCreateDialog();
	}

	render() {
		return (

			<div>
			<Title value="科目配置_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','科目配置']} />

					<Section title="科目配置" description="" style={{marginBottom:-5,minHeight:910}} >

					<Grid style={{marginBottom:22,marginTop:2}}>
						<Row >
							<Col md={4} align="left"> <Button label="新建科目" type='button' joinEditForm onTouchTap={this.openNewCreateDialog}  /> </Col>
							<Col md={8} align="right">

								<SearchForm onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/>

							</Col>
						</Row>
					</Grid>

				<Table  style={{marginTop:10}} displayCheckbox={true} ajax={true}  ajaxUrlName='getFinaFinaflowAccountModelByAjax' ajaxParams={this.state.accountname} onOperation={this.onOperation}  exportSwitch={true} onExport={this.onExport}>
					<TableHeader>
					  <TableHeaderColumn>科目名称</TableHeaderColumn>
					  <TableHeaderColumn>科目编码</TableHeaderColumn>
					  <TableHeaderColumn>科目类别</TableHeaderColumn>
					  <TableHeaderColumn>是否启用</TableHeaderColumn>
					  <TableHeaderColumn>排序号</TableHeaderColumn>
					  <TableHeaderColumn>描述</TableHeaderColumn>
				  <TableHeaderColumn>操作</TableHeaderColumn>
				 </TableHeader>

				<TableBody>
						 <TableRow displayCheckbox={true}>
						  <TableRowColumn name="accountname"></TableRowColumn>
						<TableRowColumn name="accountcode" ></TableRowColumn>
						 <TableRowColumn name="accounttype" options={[{label:'收入',value:'INCOME'},{label:'回款',value:'PAYMENT'}]}></TableRowColumn>
						 <TableRowColumn name="enableflag" options={[{label:'是',value:'ENABLE'},{label:'否',value:'DISENABLE'}]}></TableRowColumn>
						 <TableRowColumn name="ordernum"></TableRowColumn>
						 <TableRowColumn name="accountdesc"></TableRowColumn>
						<TableRowColumn>
							  <Button label="查看"  type="operation" operation="view"/>
							  <Button label="编辑"  type="operation" operation="edit"/>
						 </TableRowColumn>
					 </TableRow>
				</TableBody>

				<TableFooter></TableFooter>

				</Table>

					</Section>

					<Dialog
						title="新建"
						open={this.state.openNewCreate}
						onClose={this.openNewCreateDialog}
					>
						<NewCreateForm onSubmit={this.onNewCreateSubmit} onCancel={this.openNewCreateDialog} />

				  </Dialog>


					<Dialog
						title="编辑"
						modal={true}
						open={this.state.openEditDetail}
						onClose={this.openEditDetailDialog}
					>
						<EditDetailForm  detail={this.state.itemDetail} onSubmit={this.onEditSubmit} onCancel={this.openEditDetailDialog} />
				  </Dialog>

					<Dialog
						title="查看"
						modal={true}
						open={this.state.openView}
						onClose={this.openViewDialog}
					>
						<ItemDetail  detail={this.state.itemDetail} onCancel={this.openViewDialog} />
				  </Dialog>


			</div>

		);

	}

}
