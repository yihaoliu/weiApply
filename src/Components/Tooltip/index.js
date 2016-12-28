import React, {
	Component
} from 'react';

import $ from 'jquery';
import {
	FontIcon,
} from 'kr-ui';
import ReactDOM from 'react-dom';
import './index.less';
export default class Tooltip extends Component {

	static defaultProps = {
		backgroundColor:"rgba(0,0,0,.7)",
		ShadowColor:'transparent'
	}

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		/**
		 * place有四个参数值top,bottom,left,right
		 */
		place:React.PropTypes.string,
		backgroundColor:React.PropTypes.string,
		/**
		 * tooltip内容的阴影，box-shadow的参数
		 */
		boxShadow:React.PropTypes.string,
		/**
		 * 与box-shadow的阴影色相同
		 */


	}

	constructor(props){
		super(props);
		this.state={
			width:0,
			height:0,
			offsetTop:this.props.offsetTop,
			offsetRight:this.props.offsetRight,
		}

	}
	componentDidMount() {
		this.renderHover();
	}
	renderHover=()=>{
		// let {tipName} = this.props;
		let node = ReactDOM.findDOMNode(this.tooltip);
		let parent = node.parentNode;
		// node.style.backgroundColor = backgroundColor;

		parent.style.position = "relative";
		parent.onmouseover = function(){
			node.style.visibility = 'visible';
		}
		parent.onmouseout = function(){
			node.style.visibility = 'hidden';
		}
		this.setState({
			width:node.offsetWidth,
			height:node.offsetHeight
		})
	}

	render() {
		let {children,place,backgroundColor,boxShadow,ShadowColor} = this.props;
		let {width,height} = this.state;
		let className = 'ui-tooltip';
		let arrowStyle = {};
		let arrowContentStyle = {};
		let arrowName = '';
		let arrowContentName = '';
		let style = {};
		let offsetTop=this.state.offsetTop;
		let offsetRight=this.state.offsetRight;
		if(!this.state.offsetTop){
			offsetTop=0;
		}
		if(!this.state.offsetRight){
			offsetRight=0;
		}
		if(place === 'top' || place==='bottom'){
			className+=' center';
		}
		if(place === 'right' || place==='left'){
			className+=' height';
		}
		if(place === 'right'){
			style.right = '-'+ (width-5 + offsetRight)+'px';
			arrowName = 'right-arrow';
			arrowContentName = 'right-arrows';
			arrowStyle.borderRightColor = ShadowColor;
			arrowContentStyle.borderRightColor = backgroundColor;
		}
		if(place === 'left'){
			style.left = '-'+ (width-5 + offsetRight)+'px';
			arrowName = 'left-arrow';
			arrowContentName = 'left-arrows';
			arrowStyle.borderLeftColor = ShadowColor;
			arrowContentStyle.borderLeftColor = backgroundColor;

		}
		if(place === 'top'){
			style.top = '-'+(height-5+offsetTop)+'px';
			arrowName = 'top-arrow';
			arrowContentName = 'top-arrows';
			arrowStyle.borderTopColor = ShadowColor;
			arrowContentStyle.borderTopColor = backgroundColor;

		}
		if(place === 'bottom'){
			style.bottom = '-'+(height-5)+'px';
			arrowName = 'bottom-arrows';
			arrowContentName = 'bottom-content-arrows';
			arrowStyle.borderBottomColor = ShadowColor;
			arrowContentStyle.borderBottomColor = backgroundColor;

		}
		style.background = backgroundColor;
		// style.boxShadow = '0 0 3px #499df1';
		style.boxShadow = boxShadow;


		return(
			<div className={className} ref={div=>{this.tooltip = div}} style={style}>
				<span className={arrowName} style={arrowStyle}></span>
				<span className={arrowContentName} style={arrowContentStyle}></span>
				{children}
			</div>
		);
	}
}
