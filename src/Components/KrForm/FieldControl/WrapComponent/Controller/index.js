
import React from 'react';

import './index.less';

export default class  WrapComponent extends React.Component {

	static PropTypes = {
		label:React.PropTypes.string,
		requireLabel:React.PropTypes.bool,
		children:React.PropTypes.node,
		wrapStyle:React.PropTypes.object,
		inline:React.PropTypes.bool,
		alignRight:React.PropTypes.bool,
		search:React.PropTypes.bool,
		requireBlue:React.PropTypes.bool,

	}

	constructor(props){
		super(props)
	}

	render(){

		let {children,style,inline,simple,requireBlue,search, alignRight} = this.props;

		let className = 'ui-form-controller';
		
		if(inline){
			className+= ' inline';
		}
		if(search){
			className+= ' search-content';
		}
		if(simple){
			className+=' simple';
		}
		if(alignRight){
			className+=' alignRight';
		}
		if(requireBlue){
			className+=' require-blue';
		}
			return (
					<div className={className} style={style}>
						{children}
					</div>
			);
	}
}





