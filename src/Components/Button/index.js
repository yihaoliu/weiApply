import React, {
	Component
} from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import './index.less';

export default class Button extends Component {

	static displayName = 'Button';

	static defaultProps = {
		cancle:false,
		width:80,
		height:30,
		size:'default'
	}

	static propTypes = {
		/**
		 * 按钮大小：large、defualt、small、xsmall
		 */
		size:React.PropTypes.string,
		/**
		 *自定义样式名称
		 */
		className: React.PropTypes.string,
		/**
		 *子元素
		 */
		children: React.PropTypes.node,
		/**
		 *行内样式
		 */
		style: React.PropTypes.object,
		/**
		 *按钮类型：button、link、submit
		 */
		type: React.PropTypes.string,
		/**
		 *按钮文本显示
		 */
		label: React.PropTypes.string,
		/**
		 *按钮禁用
		 */
		disabled: React.PropTypes.bool,
		backgroundColor: React.PropTypes.string,
		labelColor: React.PropTypes.string,
		cancle:React.PropTypes.bool,
		/**
		 *宽
		 */
		width:React.PropTypes.number,
		/**
		 *高
		 */
		height:React.PropTypes.number,
		fontSize:React.PropTypes.number,
		/**
		*高级查询的行内样式
		*/
		searchStyle:React.PropTypes.object,
		/**
		*高级查询点击事件
		*/
		searchClick:React.PropTypes.func,
	}


	constructor(props) {
		super(props);

	}


	render() {

		let {
			type,
			label,
			disabled,
			backgroundColor,
			labelColor,
			cancle,
			width,
			height,
			fontSize,
			searchStyle,
			searchClick,
			...other
		} = this.props;
		let border = 'none';
		if(cancle){
			backgroundColor = '#fff';
			labelColor = '#499df1';
			border = '1px solid #499df1';
		}
		let defaultStyle = {
			minWidth:30,
			width:width || 80,
			height:height || 30,
			// boxShadow: "0 2px 3px #b4cde6",
			// border:'1px solid #499df1',
			// borderRadius:4,
		};
		let divStyle = {
			boxShadow: "0 2px 8px rgba(134,174,214,.7)",
			border:border,
			borderRadius:4,
		}
		let labelStyle={
			padding:0,
			fontSize:fontSize|| 14
		}


		if (type == 'link') {

			if (disabled) {
				delete other.href;
			}

			return (
				<div className="ui-button">
					<FlatButton backgroundColor={backgroundColor} labelColor={labelColor} label={label} primary={true} style={{minWidth:30,color:'#499df1'}}  {...other}  />
				</div>
			);
		}

		if (type == 'button') {

			return (
				<div className="ui-button" style={divStyle}>
					<RaisedButton backgroundColor={backgroundColor || "#499df1"} labelStyle={labelStyle} labelColor={labelColor || "#fff"} style={defaultStyle} label={label}   {...other} />
				</div>
			);
		}

		if (type == 'operation') {
			return (
				<div className="ui-button" >
					<span {...other} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>{label}</span>
				</div>

			);
		}

		if (type == 'search') {
			return (
				<div style={searchStyle} onClick={searchClick}>
					<span className='ui-search-upper' style={{cursor:'pointer',display:'inline-block'}}></span>
				</div>

			);
		}

		if (type == 'submit') {

			return (
				<div className="ui-button" style={divStyle}>
					<RaisedButton backgroundColor={backgroundColor || "#499df1"} labelStyle={labelStyle} labelColor={labelColor || "#fff"} label={label} style={defaultStyle}  type="submit"  {...other}/>
				</div>
			);
		}



		return (
			<div className="ui-button" >
					<RaisedButton backgroundColor="#499df1"  label={label} labelStyle={labelStyle} labelColor="#fff" style={defaultStyle}{...other}/>
			</div>

		);
	}
}
