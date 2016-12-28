import React, {
	Component
} from 'react';
import {
	Title,
	DatePicker,
	Form,
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	DotTitle,
	BraceWidth,
	SelfAdaption,
	LineText,
	SplitLine,
	SearchForms,
	Dialog,
	Message,
	Notify,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import NewCreateForm from './NewCreateForm';
import MemeberEditMemberForm from './MemeberEditMemberForm';
import AdvancedQueryForm from './AdvancedQueryForm';
import './index.less';

export default class List extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		// this.openNewCreateDialog = this.openNewCreateDialog.bind(this);
		this.openEditDetailDialog = this.openEditDetailDialog.bind(this);
		this.openAdvancedQueryDialog = this.openAdvancedQueryDialog.bind(this);
		this.onLoaded = this.onLoaded.bind(this);
		this.onOperation = this.onOperation.bind(this);
		// this.onExport = this.onExport.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.params = this.context.router.params;
		this.state = {
			openNewCreate: false,
			openView: false,
			openEditDetail: false,
			openAdvancedQuery :false,
			status:false,
			submit:false,
			itemDetail: {},
			item: {},
			list: {},
			content:'',
			filter:'COMP_NAME',
			searchParams: {
				page: 1,
				pageSize: 15,
				startTime:'',
				endTime:'',
				registerSourceId:'',
				jobId:'',
				companyId:0,
				cityId:'',
				type:'COMP_NAME',
				value:'',
				status:false,
			}
		}
	}
	openNewCreateDialog=()=> {
		this.setState({
			openNewCreate: !this.state.openNewCreate,
		});
	}
	// 编辑详情的Dialog
	openEditDetailDialog(){
		this.setState({
			openEditDetail: !this.state.openEditDetail,
		});
	}
	// 社区模糊查询
	onChangeSearchCommunity(community) {
		Store.dispatch(change('joinCreateForm', 'communityName', community.communityName));
	}
	// 公司模糊查询
	onChangeSearchCompany(company) {
		Store.dispatch(change('joinCreateForm', 'companyName', company.companyName));
	}

	onNewCreateCancel() {
		this.openNewCreateDialog();
	}
	onLoaded(response) {
		let list = response;
		this.setState({
			list
		})
	}
	//操作相关
	onOperation(type, itemDetail) {
		this.setState({
			itemDetail
		});
		// console.log("itemDetail",itemDetail);
		if (type == 'view') {
			window.open(`./#/member/MemberManage/${itemDetail.id}/detail/${itemDetail.companyId}`, itemDetail.id);
		} else if (type == 'edit') {
			this.openEditDetailDialog();
		}
	}
	// 导出Excle表格
	onExport=(values)=>{
		let ids = [];
		if (values.length != 0) {
			values.map((item, value) => {
				ids.push(item.id)
			});
		}
		ids = String(ids);
		var url = `/api/krspace-finance-web/member/member-list-excel?ids=${ids}`
		window.location.href = url;
	}
    //提交编辑
	onEditSubmit=(values)=>{
		var _this = this;
		Store.dispatch(Actions.callAPI('membersChange',{},values)).then(function(response){
			_this.openEditDetailDialog();
			Message.success("操作成功");
			_this.setState({
				status:!_this.state.status,
				searchParams:{
					page:"1",
					pageSize:"15",
					value:'',
					type:'COMP_NAME',
					status:!_this.state.status,
					companyId:"0",
				}
			})
		}).catch(function(err){
			// Notify.show([{
			// 	message: err.message,
			// 	type: 'danger',
			// }]);
		});
	}
	// 提交新建
	onNewCreateSubmit=(values)=>{
		// console.log("value",values);
		let params = {
			email:values.email
		}
		let cardSearchParams ={
			foreignCode:values.cardId
		}
		let _this = this;
		Store.dispatch(Actions.callAPI('membersChange',{},values)).then(function(response){
							_this.openNewCreateDialog();
							Message.success("操作成功");
							_this.setState({
								status:!_this.state.status,
								searchParams:{
									page:"1",
									pageSize:"15",
									type:'COMP_NAME',
									value:"",
									status:!_this.state.status,
									companyId:0,
								}
							})
						}).catch(function(err){
							Notify.show([{
								message: err.message,
								type: 'danger',
							}]);
						});
	}
	// 查询
	onSearchSubmit=(value)=>{
		let _this = this;
		let searchParam = {
			value :value.content,
			type :value.filter
		}
		_this.setState({
			content :value.content,
			filter :value.filter,
			submit:true,
			searchParams :{
				type:value.filter,
				value:value.content,
				page :1,
				pageSize:15,
				companyId:0,
			}
		})
	}
	// 打开高级查询
	openAdvancedQueryDialog(){
		this.setState({
			openAdvancedQuery: !this.state.openAdvancedQuery,
			// searchParams:{
			// 	pageSize:'15'
			// }
		});
	}
	// 高级查询
	onAdvanceSearchSubmit=(values)=>{
		// console.log('onAdvanceSearchSubmit是否传到列表页',values);
		let _this = this;
		_this.setState({
			openAdvancedQuery: !this.state.openAdvancedQuery,
			searchParams :{
				registerSourceId:values.registerSourceId || '',
				value :values.value,
				type :values.type,
				cityId :values.city || '',
				endTime :values.endTime || '',
				startTime :values.startTime || '',
				jobId :values.jobId || '',
				page:1,
				pageSize:15,
				companyId:0,
			}
		})
	}
	render() {
		let {
			list,itemDetail,seleced
		} = this.state;
		// console.log("list",list);
		if (!list.totalCount) {
			list.totalCount = 0;
		}
		let options = [{
			label: '公司名称',
			value: 'COMP_NAME'
		}, {
			label: '手机号',
			value: 'PHONE'
		}, {
			label: '微信',
			value: 'WECHAT'
		}, {
			label: '姓名',
			value: 'NAME'
		}];
		return (
			    <div style={{minHeight:'910',backgroundColor:"#fff"}}>
								<Title value="全部会员 "/>
								<Section title={`全部会员 (${list.totalCount})`} description="" >
									<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
										<Button label="新建会员"  onTouchTap={this.openNewCreateDialog} />
										{/*高级查询*/}
										<Button   type='search'  searchClick={this.openAdvancedQueryDialog} searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/>
										<SearchForms onSubmit={this.onSearchSubmit} searchFilter={options} style={{marginTop:5,zIndex:10000}} content={this.state.content} filter={this.state.filter}/>
									</form>
									<Table
										className="member-list-table"
											style={{marginTop:10,position:'inherit'}}
											onLoaded={this.onLoaded}
											ajax={true}
											onProcessData={(state)=>{
												return state;
												}}
											onOperation={this.onOperation}
											exportSwitch={true}
											onExport={this.onExport}
											ajaxFieldListName='items'
											ajaxUrlName='membersList'
											ajaxParams={this.state.searchParams}
										>
										<TableHeader>
											<TableHeaderColumn>联系电话</TableHeaderColumn>
											<TableHeaderColumn>姓名</TableHeaderColumn>
											<TableHeaderColumn>微信</TableHeaderColumn>
											<TableHeaderColumn>邮箱</TableHeaderColumn>
											<TableHeaderColumn>职位</TableHeaderColumn>
											<TableHeaderColumn>工作地点</TableHeaderColumn>
											<TableHeaderColumn>公司</TableHeaderColumn>
											// 由于页面效果不好暂时不添加会员等级这一项
											{/*<TableHeaderColumn>会员等级</TableHeaderColumn>*/}
											<TableHeaderColumn>注册来源</TableHeaderColumn>
											<TableHeaderColumn>注册日期</TableHeaderColumn>
											<TableHeaderColumn>操作</TableHeaderColumn>
									</TableHeader>
									<TableBody style={{position:'inherit'}}>
											<TableRow displayCheckbox={true}>
											<TableRowColumn name="phone"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											<TableRowColumn name="name"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											 ></TableRowColumn>
											<TableRowColumn name="wechatNick"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											<TableRowColumn name="email"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											<TableRowColumn name="jobName"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											<TableRowColumn name="cityName"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											<TableRowColumn name="companyName"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											<TableRowColumn name="registerName"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}></TableRowColumn>
											<TableRowColumn name="registerTime" type="date" format="yyyy-mm-dd"></TableRowColumn>
											<TableRowColumn type="operation">
													<Button label="详情"  type="operation" operation="view"/>
													<Button label="编辑"  type="operation" operation="edit"/>
											 </TableRowColumn>
										 </TableRow>
									</TableBody>
									<TableFooter></TableFooter>
									</Table>
								</Section>
								<Dialog
									title="新建会员"
									modal={true}
									open={this.state.openNewCreate}
									onClose={this.openNewCreateDialog}
									contentStyle={{width:687}}
								>
										<NewCreateForm onSubmit={this.onNewCreateSubmit} onCancel={this.openNewCreateDialog} />
							  </Dialog>
								<Dialog
									title="编辑会员"
									modal={true}
									open={this.state.openEditDetail}
									onClose={this.openEditDetailDialog}
									contentStyle={{width:687}}
								>
										<MemeberEditMemberForm onSubmit={this.onEditSubmit} params={this.params} onCancel={this.openEditDetailDialog} detail={itemDetail}/>
							  </Dialog>
								<Dialog
									title="高级查询"
									modal={true}
									open={this.state.openAdvancedQuery}
									onClose={this.openAdvancedQueryDialog}
									contentStyle={{width:687}}
								>
									<AdvancedQueryForm onSubmit={this.onAdvanceSearchSubmit} params={this.params} onCancel={this.openAdvancedQueryDialog} detail={itemDetail} style={{marginTop:37}} content={this.state.content} filter={this.state.filter} />
							  </Dialog>
				</div>
		);

	}

}
