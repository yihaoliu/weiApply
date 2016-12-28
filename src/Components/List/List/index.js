import React,{Component} from 'react';

import {
  List,
} from 'material-ui';

export default class KrList extends React.Component{

	static displayName = 'KrList';

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
      <List {...this.props}>
        {children}
      </List>
		);
	}
}
