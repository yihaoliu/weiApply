import React, {
	Component
} from 'react';
import {
	Tabs,
	Tab
} from 'material-ui';

import './index.less'
export default class TabsComponent extends Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		/**
		 * 若Tab有onActive参数值，tabName为必带参数
		 */
		tabName:React.PropTypes.string,
	}

	constructor(props){
		super(props);
		this.state={
			tabName:this.props.tabName
		}

	}

	renderTabs=()=> {

		let {
			className,
			children,
			style
		} = this.props;

		let tabs=[];
		const commenTab = {
			color: '#000',
			borderBottom: "1px solid #eee"
		}


		React.Children.forEach(children, (child,index) => {
			if (!React.isValidElement(child)) return;
			tabs.push(this.createTab(child,index));
		});

		return tabs;
	}
	createTab=(base,i)=>{
		let _this = this;
		let  {tabName} = this.state;
		const commenTab = {
			color: '#000',
			borderBottom: "1px solid #eee",
		}
		const active = {
			color: '#2b8dcd',
			borderBottom: "1px solid #eee",
		}
		let {label,children,onActive,style}= base.props;
		if(!tabName && i===0){
			tabName = label;
		}
		if(!style){
			style =(label == tabName ? active:commenTab);
		}

		if(!onActive){
			onActive = function(){
				_this.setState({tabName: label})
			}
		}
			return (
				<Tab label={label} style={style} key={i} onActive={onActive} className={label}>
					<div style={{padding:'0 20px'}}> 
						{children}
					</div>
					
				</Tab>
				)
		
	}
	renderLines=()=>{
		let {children} = this.props;
		let lines = [];

		let left = (1/children.length)*100;
		for(var i=0;i<=children.length;i++){
			if(i!=0){
				lines.push(left*i);
			}
		}
		lines = lines.map((item,index)=>{
			return (
				<span className='tabs-lines' style={{marginLeft:`${item}%`}} key={index}></span>
			);
			
		})
		return lines;
		
		
	}

	render() {


		const {children}  = this.props;
		const activeTab = {
			color: '#2b8dcd',
			borderBottom: "1px solid #eee"
		}
		const commenTab = {
			color: '#000',
			borderBottom: "1px solid #eee"
		}

		return(
			<div className='ui-tabs'>
				{this.renderLines()}
				<Tabs className="tabs" tabItemContainerStyle={{background:'#FFF'}} inkBarStyle={{background: '-webkit-linear-gradient(right, #03ec56, #499df1)',position:'absolute',top:0,height:3}} style={{background:'#fff',position:'relative'}}>
				{this.renderTabs()}
				</Tabs>
			</div>
		);
	}
}
