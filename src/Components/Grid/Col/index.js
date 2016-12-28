import React from 'react';

import '../index.less';

export default class Col extends React.Component {

	static displayName = 'Col';

	static propTypes = {
		/**
		*
		*/
		xs: React.PropTypes.number,
		/**
		*
		*/
		sm: React.PropTypes.number,
		/**
		*
		*/
		md: React.PropTypes.number,
		/**
		*
		*/
		lg: React.PropTypes.number,
		/**
		*
		*/
		xsHidden: React.PropTypes.bool,
		/**
		*
		*/
		smHidden: React.PropTypes.bool,
		/**
		*
		*/
		mdHidden: React.PropTypes.bool,
		/**
		*
		*/
		lgHidden: React.PropTypes.bool,
		/**
		*
		*/
		xsOffset: React.PropTypes.number,
		/**
		*
		*/
		smOffset: React.PropTypes.number,
		/**
		*
		*/
		mdOffset: React.PropTypes.number,
		/**
		*
		*/
		lgOffset: React.PropTypes.number,
		/**
		*
		*/
		xsPush: React.PropTypes.number,
		/**
		*
		*/
		smPush: React.PropTypes.number,
		/**
		*
		*/
		mdPush: React.PropTypes.number,
		/**
		*
		*/
		lgPush: React.PropTypes.number,
		/**
		*
		*/
		xsPull: React.PropTypes.number,
		/**
		*
		*/
		smPull: React.PropTypes.number,
		/**
		*
		*/
		mdPull: React.PropTypes.number,
		/**
		*
		*/
		lgPull: React.PropTypes.number,
	};


	render() {

		let propsAttr = {
			xs: 'xs',
			sm: 'sm',
			md: 'md',
			lg: 'lg',
			xsHidden: 'xs-hidden',
			smHidden: 'sm-hidden',
			mdHidden: 'md-hidden',
			lgHidden: 'lg-hidden',
			xsOffset: 'xs-offset',
			smOffset: 'sm-offset',
			mdOffset: 'md-offset',
			lgOffset: 'lg-offset',
			xsPush: 'xs-push',
			smPush: 'sm-push',
			mdPush: 'md-push',
			lgPush: 'lg-push',
			xsPull: 'xs-pull',
			smPull: 'sm-pull',
			mdPull: 'md-pull',
			lgPull: 'lg-pull',
		};

		let {children,className,style={},align} = this.props;

		let keys = Object.keys(this.props);
		let props = this.props;

		className = className|| '';

		keys.forEach(function(item){
			if(!isNaN(props[item])){
				className += ' col-'+propsAttr[item]+'-'+props[item];
			}
		});

		if(align){
			style.textAlign = align;
		}


		return (

			<div className={className} style={style}>
				{this.props.children}
				</div>
		);

	}


}
