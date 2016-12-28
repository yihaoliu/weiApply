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
		height:30
	}

	static propTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		/**
		* 样式
		*/
		style: React.PropTypes.object,
		/**
		*类型
		*/
		type: React.PropTypes.string,
		/**
		*按钮文字
		*/
		label: React.PropTypes.string,
		/**
		*禁用
		*/
		disabled: React.PropTypes.bool,
		/**
		*背景颜色
		*/
		backgroundColor: React.PropTypes.string,
		/**
		*文字颜色
		*/
		labelColor: React.PropTypes.string,
		cancle:React.PropTypes.bool,
		/**
		* 宽
		*/
		width:React.PropTypes.number,
		/**
		*高
		*/
		height:React.PropTypes.number,
		/**
		*
		*/
		fontSize:React.PropTypes.number,

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
		let FlatStyle= {
			minWidth:30,
			color:'#499df1',
			height:height || 30,
			lineHeight:height+'px' || "30px"
		}


		if (type == 'link') {

			if (disabled) {
				delete other.href;
			}

			return (
				<div className="ui-button">
					<FlatButton backgroundColor={backgroundColor} labelColor={labelColor} label={label} primary={true} style={FlatStyle}  {...other}  />
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
