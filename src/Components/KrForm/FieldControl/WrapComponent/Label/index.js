
import React from 'react';

import './index.less';

export default class  WrapComponent extends React.Component {

	static PropTypes = {
		label:React.PropTypes.string,
		requireLabel:React.PropTypes.bool,
		inline:React.PropTypes.bool,
		requireBlue:React.PropTypes.bool,
		alignRight:React.PropTypes.bool,
		search:React.PropTypes.bool
	}

	constructor(props){
		super(props)
	}

	render(){

		let {requireLabel,label,inline, search,requireBlue, alignRight} = this.props;

		if(!label){
			return null;
		}
		let className = 'ui-form-label';

		if(inline){
			className+= ' inline';
		}
		if(search){
			className+= ' search-content';
		}
		if(requireBlue){
			className+=' require-blue';
		}
		if(alignRight){
			className+=' alignRight';
		}

			return (
					<div className={className}>
						<label> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
					</div>
				);
	}
}
