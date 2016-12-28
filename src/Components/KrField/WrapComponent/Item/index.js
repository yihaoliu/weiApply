
import React from 'react';

import './index.less';

export default class  FormItem extends React.Component {

	static PropTypes = {
		children:React.PropTypes.node,
	}

	constructor(props){
		super(props)
	}

	render(){

		let {requireLabel,label,children,style} = this.props;


			return (
					<div className="ui-form-item" style={style}>
						{children}
					</div>
			);
	}
}
