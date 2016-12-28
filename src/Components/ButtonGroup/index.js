
import React,{Component} from 'react';
import './index.less';

export default class ButtonGroup extends Component{

	static displayName = 'ButtonGroup';

	static PropTypes = {
		children: React.PropTypes.node,
		style: React.PropTypes.number,
	}

	constructor(props){
		super(props);

	}

	render(){


		let {children,style} = this.props;

		return (
			<div className="ui-button-group" style={style}>
				{children}
			</div>
		);
	}
}
