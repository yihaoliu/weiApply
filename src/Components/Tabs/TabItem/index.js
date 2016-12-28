import React from 'react';
import {
	Tab
} from 'material-ui';

export default class TabItem extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		label:React.PropTypes.string,
	}

	constructor(props){
		super(props);

	}


	render() {
		const {children,label} = this.props;
		console.log('TabItem',label,this.props);
		return(
				<Tab label={label}>
				{children}
				</Tab>
		);
	}

}








