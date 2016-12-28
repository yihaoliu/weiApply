import React, {
	Component
} from 'react';


import './index.less';


export default class FontIcon extends React.Component {

	static displayName = 'FontIcon';

	static PropTypes = {
		/**
		*样式class类名
		*/
		className: React.PropTypes.string,
		/**
		* 样式
		*/
		style: React.PropTypes.object,
		/**
		*颜色
		*/
		color:React.PropTypes.string,
		/**
		*hover 颜色
		*/
		hoverColor:React.PropTypes.string
	}

	constructor(props) {
		super(props)
	}

	render() {
		let {className,style,color} = this.props;

		style = Object.assign({},style);

		if(color){
			style.color = color
		}

		return (
			<span className={className} style={style}></span>
		);

	}
}
