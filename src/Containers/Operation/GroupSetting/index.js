import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
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
	Grid,
	Row,
	Col,
	Dialog,
	SearchForms,
	ListGroup,
	ListGroupItem,
	Notify,
	Tooltip,
	Message,
	Title,
	KrDate

} from 'kr-ui';
import NewCreateForm from './CreateForm';
import NewEditDetail from './EditForm';
import SearchUpperForm from './SearchUpperFrom'
import './index.less';


import {reduxForm,formValueSelector,initialize,change} from 'redux-form';


export default class GroupSetting  extends Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.openEditDetailDialog=this.openEditDetailDialog.bind(this);
		this.onOperation=this.onOperation.bind(this);
		this.onSearchSubmit=this.onSearchSubmit.bind(this);
		this.openNewCreateDialog=this.openNewCreateDialog.bind(this);
		this.openEditDetailDialog=this.openEditDetailDialog.bind(this);
		this.state = {
			openNewCreate: false,
			openView: false,
			openEditDetail: false,
			openSearchUpperForm:false,
			itemDetail: {},
			accountname: {},
			//已选模板列表
			templateList:[],
			templateListIds:[],
			//未选模板列表
			unselectedList:[],
			allData:{},
			searchParams: {
				page: 1,
				pageSize: 15,
				enable:'',
				groupName:'',
				other:false
			},
			id:null,
			noinit:true,
			searchText:"",

		}
	}

	//新建提交数据和编辑数据的提交
	onCreateSubmit=(params)=> {

		var _this = this;
		params = Object.assign({}, params);
		if(this.state.noinit){
			params.templateIdList="";
			Message.error("模板列表不能为空");
			return;

		}else{
			params.templateIdList=this.state.templateListIds;
		}

		Store.dispatch(Actions.callAPI('GroupNewAndEidt', {}, params)).then(function(response) {
			let obj = {
				page: 1,
				pageSize: 15,
				other:!_this.state.searchParams.other,
				groupName:_this.state.searchText,

			};

			_this.setState({
				openNewCreate: false,
				openEditDetail: false,
				searchParams: obj

			});

		}).catch(function(err) {
			if(!params.templateIdList){
				err.message="模板列表不能为空";
			}
			Message.error(err.message)
		});


	}


	//导出事件
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

	//操作相关
	onOperation(type,itemDetail) {
				this.setState({
					id:itemDetail.id
				},function(){

					this.openEditDetailDialog();
				});
	}

	//编辑
	openEditDetailDialog=()=> {
		var _this = this;
		Store.dispatch(Actions.callAPI('MouldGroupDetails',{id:this.state.id})).then(function(data) {

			_this.changeMudle(data.templateList)

			Store.dispatch(initialize('newCreateForm',data));

			_this.setState({
					itemDetail:data,
			},function(){
				_this.setState({
					openEditDetail: !_this.state.openEditDetail
				});

			});
		}).catch(function(err) {

			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});



	}
	//搜索功能
	onSearchSubmit(searchParams) {
		let obj = {
			groupName:searchParams.content,
			pageSize:15,
			page: 1,
		}

		this.setState({
			searchParams: obj,
			searchText:searchParams.content,

		});

	}

	onSearchCancel() {

	}
	//高级搜索功能点击确定
	onSearchUpperForm=(searchParams)=>{

		var _this=this;

		let obj = {
			groupName:searchParams.groupName||"",
			pageSize:15,
			page: 1,
			enable:searchParams.enable||""
		}
		this.setState({
			searchParams: obj
		});
		this.openSearchUpperFormDialog();


	}
	//新建
	openNewCreateDialog=()=> {
		Store.dispatch(initialize('newCreateForm',{
			enable:'ENABLE'
		}));
		var _this = this;
		Store.dispatch(Actions.callAPI('GroupNewModule')).then(function(data) {
			_this.setState({
					templateList:data.templateList,
			},function(){
				this.setState({
					openNewCreate: !_this.state.openNewCreate
				});
			});
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

	}
//高级搜索
	openSearchUpperFormDialog=()=> {
		var _this=this;
		this.setState({
			openSearchUpperForm: !this.state.openSearchUpperForm
		});
	}
	// 改变模板分组
	changeMudle=(arr)=>{
		var ids=[];

		for(var i=0;i<arr.length;i++){
				ids.push(arr[i].id);
		}
		this.setState({templateListIds:ids,noinit:false})
	}


//
//  component={(value,item)=>{<span>{value}</span>}}

	render(){
		return(
			<div className="switchhover">
			<Title value="数据模板管理_基础配置"/>

					<Section title="模板分组" description="" style={{minHeight:"900px"}}>

							<Grid style={{marginBottom:22,marginTop:2}}>
								<Row >
									<Col md={4} align="left"> <Button label="新建12" type='button' joinEditForm onTouchTap={this.openNewCreateDialog}  /> </Col>
									<Col md={8} align="right" style={{marginTop:0}}>
										<ListGroup>
											<ListGroupItem> <SearchForms onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
											<ListGroupItem> <Button searchClick={this.openSearchUpperFormDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'5'}}/></ListGroupItem>
										</ListGroup>
									</Col>
								</Row>
							</Grid>

										<Table  style={{marginTop:10}}
												ajax={true}
												onOperation={this.onOperation}
												onProcessData={(state)=>{

													return state;
												}
											}
										displayCheckbox={false}
										onExport={this.onExport}
										ajaxParams={this.state.searchParams}

											ajaxFieldListName="items"
											ajaxUrlName='MouldGroupList'>
											<TableHeader>
												<TableHeaderColumn>分组名称</TableHeaderColumn>
												<TableHeaderColumn>排序</TableHeaderColumn>
												<TableHeaderColumn style={{maxWidth:150}}>分组描述</TableHeaderColumn>
												<TableHeaderColumn>模板数</TableHeaderColumn>
												<TableHeaderColumn>创建人</TableHeaderColumn>
												<TableHeaderColumn>创建时间</TableHeaderColumn>
												<TableHeaderColumn>启用状态</TableHeaderColumn>
												<TableHeaderColumn>操作</TableHeaderColumn>

										</TableHeader>

										<TableBody >
												<TableRow >

												<TableRowColumn style={{overflow:"visible",textAlign: "center"}} name="groupName" component={(value,oldValue)=>{
														var TooltipStyle="";
														var lest='';
														if(value.length>=10){
															value=value.substring(0,10);
															lest="..."
														}

														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}

														 return (<div style={{display:TooltipStyle}}><span className='tableOver' style={{maxWidth:160,display:"inline-block"}}>{value}<span style={{display:"inline-block",transform:"translateY(-5px)"}}>{lest}</span></span>
														 	<Tooltip offsetTop={10} place='top'>
																<div style={{width:"260px",whiteSpace:"normal",lineHeight:"22px"}}>{oldValue}</div>
														 	</Tooltip></div>)
													 }} ></TableRowColumn>
												<TableRowColumn name="sort" ></TableRowColumn>


												<TableRowColumn style={{overflow:"visible",textAlign: "center"}} name="groupDesc" component={(value,oldValue)=>{
														var TooltipStyle="";
														var lest='';
														if(value.length>=10){
															value=value.substring(0,10);
															lest="..."
														}
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle}}><span className='tableOver' style={{maxWidth:160,display:"inline-block"}}>{value}<span style={{display:"inline-block",transform:"translateY(-5px)"}}>{lest}</span></span>
														 	<Tooltip offsetTop={10} place='top'>
																<div style={{width:"260px",whiteSpace:"normal",lineHeight:"22px"}}>{oldValue}</div>
														 	</Tooltip></div>)
													 }} ></TableRowColumn>





												<TableRowColumn name="templateNum"></TableRowColumn>
												<TableRowColumn name="creator"></TableRowColumn>

												<TableRowColumn name="createTime" type='date' format="yyyy-mm-dd hh:MM:ss" ></TableRowColumn>
												<TableRowColumn name="enable" options={[{label:'启用',value:'ENABLE'},{label:'禁用',value:'DISABLE'}]}
												component={(value,oldValue)=>{
													var fontColor="";
													if(value=="禁用"){
														fontColor="#ff6060"
													}
													return (<span style={{color:fontColor}}>{value}</span>)}}

												></TableRowColumn>

												<TableRowColumn>
													  <Button label="编辑"  type="operation"  operation="edit" />
												 </TableRowColumn>
											 </TableRow>
										</TableBody>
			<h1>dfsddfs</h1>


										<TableFooter ></TableFooter>

										</Table>
					</Section>
					<Dialog
						title="编辑"
						modal={true}
						open={this.state.openEditDetail}
						onClose={this.openEditDetailDialog}
						contentStyle={{width:687}}

					>
						<NewEditDetail changeMudle={this.changeMudle} detail={this.state.itemDetail} onSubmit={this.onCreateSubmit} onCancel={this.openEditDetailDialog} />




		  			</Dialog>

		  			<Dialog
						title="新建分组"
						modal={true}
						contentStyle={{width:687}}
						// detail={this.state.templateList}
						open={this.state.openNewCreate}
						onClose={this.openNewCreateDialog}
					>
						<NewCreateForm changeMudle={this.changeMudle}  		open={this.state.openNewCreate} detail={this.state.templateList} onSubmit={this.onCreateSubmit} onCancel={this.openNewCreateDialog} />

				  </Dialog>


					<Dialog
						title="高级查询"
						modal={true}
						open={this.state.openSearchUpperForm}
						onClose={this.openSearchUpperFormDialog}
						bodyStyle={{paddingTop:34}}
						contentStyle={{width:687}}
					>
						<SearchUpperForm detail={this.state.itemDetail} onSubmit={this.onSearchUpperForm} onCancel={this.openSearchUpperFormDialog} />

				  </Dialog>


			</div>
		);
	}

}
