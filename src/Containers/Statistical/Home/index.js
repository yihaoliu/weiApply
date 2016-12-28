import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
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
	Tabs,
	Tab,
	Title
} from 'kr-ui';

import PanelComponents from './PanelComponents';
import './index.less';

export default class Home  extends Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

		this.state = {
				groupList:[
				  
				],
				groupId:'',
				action:0,
		}
	}

	getInitData = ()=>{

	}

	activeTable=(index,id)=>{
       let {
			action,
			groupId
		} = this.state; 
        
        this.setState({
			action:index,
			groupId:id
		},function(){
			//console.log('----22222',this.state.groupId);
		});      
	}
    

	renderGroupTabs = ()=>{

		let {groupList,active} = this.state;

		const activeTab={
			color:'#499df1',
			borderBottom: "1px solid #eee",
			fontSize:16
		}
		const commenTab={
			color:'#666',
			borderBottom: "1px solid #eee",
			fontSize:16
		}
		return (
		 <div className='backStatic'>
	      <div className='static-tabWrap'>
		   <Tabs tabItemContainerStyle={{background:'#FFF'}} inkBarStyle={{background: '-webkit-linear-gradient(right, #03ec56, #499df1)',position:'absolute',top:0,height:3}} style={{background:'#fff',position:'relative',paddingLeft:'20',paddingRight:'20'}}>
					{groupList.map((item,index)=>{
						    var activeStyle={}
							if(this.state.action==index){
								activeStyle=activeTab;
								var activeTabPanel=(<PanelComponents panels={item.templateList} groupId={this.state.groupId}/>)
							}else{
								activeStyle=commenTab;
							}
							return (
				             <Tab label={item.groupName} key={index} onActive={this.activeTable.bind(this,index,item.id)} style={activeStyle}>
				               <div className='tabWrap_section'>
				                {activeTabPanel}
				               </div>
				             </Tab>
    		                )
						})
				   }
	 	    </Tabs> 
	 	   </div>
	 	  </div>
		);
	}
    
 
	renderGroupSingle = ()=>{

		let {groupList} = this.state;
		let groupItem = groupList[0];
		

		return(
		  <div className='static-section'>
			<Section title={groupItem.groupName} style={{background:'none'}} headerStyle={{background:'#fff'}}>
			    <div className='static-section-inner'>
					<PanelComponents panels={groupItem.templateList} groupId={groupItem.id}/>
				</div>
			</Section>
		  </div>
		);
	}

	componentDidMount() {
		var _this = this;
		Store.dispatch(Actions.callAPI('get-my-groups')).then(function(response) {
			//console.log('----0000',response);
		   _this.setState({
		   	 groupList:response.groupList,
		   	 groupId:response.groupList[0].id
		   })	   
		}).catch(function(err) {
			Message.error(err);
		});

		
		Store.dispatch(Actions.switchSidebarNav(false));
	
	}

	render(){

		let {groupList} = this.state;
        
		
		if(groupList.length == 1){
				return this.renderGroupSingle();
		}
	
		return(
			<div>
					{this.renderGroupTabs()}
			</div>

		);
	}
}
