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
import PureRenderMixin from 'react-addons-pure-render-mixin';

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
	ListGroup,
	ListGroupItem,
	BreadCrumbs,
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
			searchParams: {
				page: 1,
				pageSize: 20
			}
		}
	}

	componentDidMount() {

	}

	//操作相关
	//
	//
	//
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

		form = Object.assign({}, form);

		Store.dispatch(Actions.callAPI('addFinaFinaflowProperty', {}, form)).then(function(response) {
			Notify.show([{
				message: '更新成功！',
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

		this.openEditDetailDialog();
	}

	//查看
	openViewDialog() {
		this.setState({
			openView: !this.state.openView
		});
	}


	//搜索
	onSearchSubmit(searchParams) {
		this.setState({
			searchParams
		});
	}

	onSearchCancel() {

	}

	onExport(values) {

		let idList = [];
		if (values.length != 0) {
			values.map((item, value) => {
				idList.push(item.id)
			})
		}
		var url = `/api/krspace-finance-web/finaccount/property/exportDatas?ids=${idList}`
		window.location.href = url;

	}

	//新建
	openNewCreateDialog() {
		this.setState({
			openNewCreate: !this.state.openNewCreate
		});
	}

	onNewCreateSubmit(values) {

		this.openNewCreateDialog();

		Store.dispatch(Actions.callAPI('addFinaFinaflowProperty', {}, values)).then(function(response) {
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
	}

	onNewCreateCancel() {
		this.openNewCreateDialog();
	}

	render() {

		return (

			<div>
				<Title value="属性配置_财务管理"/>
					<BreadCrumbs children={['系统运营','客户管理','属性配置']}/>
					<Section title="属性配置" description="" style={{marginBottom:-5,minHeight:910}} >

					<Grid style={{marginBottom:22,marginTop:2}}>
						<Row>
						<Col md={4} align="left" > <Button  label="新建属性"  type='button' joinEditForm  onTouchTap={this.openNewCreateDialog} /> </Col>

						<Col md={8} align="right">
						   <ListGroup>
							 <ListGroupItem><SearchForm onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
						   </ListGroup>
						</Col>
					  </Row>
					</Grid>


				<Table  style={{marginTop:10}} ajax={true} onProcessData={(state)=>{
						return state;
					}} ajaxUrlName='findFinaFinaflowPropertyList' ajaxParams={this.state.searchParams} onOperation={this.onOperation} exportSwitch={true} onExport={this.onExport} >
					<TableHeader>
						<TableHeaderColumn>属性名称</TableHeaderColumn>
						<TableHeaderColumn name="propcode">属性编码</TableHeaderColumn>
						<TableHeaderColumn>是否启用</TableHeaderColumn>
						<TableHeaderColumn>属性类别</TableHeaderColumn>
						<TableHeaderColumn>排序号</TableHeaderColumn>
						<TableHeaderColumn>创建人</TableHeaderColumn>
						<TableHeaderColumn>创建时间</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>

				<TableBody>
						 <TableRow displayCheckbox={true}>
						 <TableRowColumn name="propname" ></TableRowColumn>
						<TableRowColumn name="propcode" ></TableRowColumn>
						<TableRowColumn name="enableflag" options={[{label:'是',value:'ENABLE'},{label:'否',value:'DISENABLE'}]}></TableRowColumn>
						<TableRowColumn name="proptype" options={[{label:'收入',value:'INCOME'},{label:'回款',value:'PAYMENT'}]}></TableRowColumn>
						<TableRowColumn name="ordernum"></TableRowColumn>
						<TableRowColumn name="creatername"></TableRowColumn>
						<TableRowColumn name="createdate" type="date"></TableRowColumn>
						<TableRowColumn type="operation">
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
						modal={true}
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
