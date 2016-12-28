import React,{Component} from 'react';

import {
  ListItem,
} from 'material-ui';

export default class KrListItem extends React.Component{

	static displayName = 'KrListItem';

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
      <ListItem {...this.props}>
        {children}
      </ListItem>
		);
	}
}
