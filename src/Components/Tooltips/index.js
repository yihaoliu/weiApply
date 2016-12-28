import React, {
	Component
} from 'react';

import $ from 'jquery';
import {
	FontIcon,
} from 'kr-ui';
import ReactDOM from 'react-dom';
import './index.less';
import {ShallowEqual} from 'kr/Utils';
export default class Tooltip extends Component {

	static defaultProps = {
		backgroundColor:"rgba(0,0,0,.7)",
		ShadowColor:'transparent',
		scroll:false
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
		scroll:React.PropTypes.bool


	}

	constructor(props){
		super(props);
		this.state={
			width:0,
			height:0,
			offsetTop:this.props.offsetTop,
			offsetRight:this.props.offsetRight
		}

	}
	componentDidMount() {
		this.renderHover();
	}
	componentWillReceiveProps(nextProps){
		if(!ShallowEqual(this.props.offsetTop,nextProps.offsetTop)){
			this.renderHover();

		}
	}
	renderHover=()=>{
		// let {tipName} = this.props;
		let node = ReactDOM.findDOMNode(this.tooltip);
		let parent = node.parentNode;
		// node.style.backgroundColor = backgroundColor;

		// parent.style.position = "relative";
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
		let {children,place,backgroundColor,boxShadow,ShadowColor,scroll} = this.props;
		let {width,height} = this.state;
		let className = 'ui-tooltips';
		let arrowStyle = {};
		let arrowContentStyle = {};
		let arrowName = '';
		let arrowContentName = '';
		let style = {};
		let offsetTop=this.state.offsetTop;
		let offsetRight=this.state.offsetRight;
		if(!this.state.offsetRight){
			offsetRight=0;
		}
		if(!this.state.offsetTop){
			offsetTop=0;
		}
		if(place === 'top' || place==='bottom'){
			className+=' center';
		}
		if(place === 'right' || place==='left'){
			className+=' height';
		}
		if(place === 'right'){
			style.right = '-'+ (width-5+offsetRight)+'px';
			className += ' right-arrow';
		}
		if(place === 'left'){
			style.left = '-'+ (width-5)+'px';
			// className += ' left-arrow';

		}
		if(place === 'top'){
			style.top = '-'+(-5+offsetTop)+'px';
			className += ' top-arrow';

		}
		if(place === 'bottom'){
			style.top = 10+'px';
			className += ' bottom-arrows';

		}
		if(scroll){
			style.maxHeight = '250px';
		}else{
			style.maxHeight = 'auto';

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
