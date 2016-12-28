import React, {Component, PropTypes} from 'react';
import Title, { flushTitle } from 'react-title-component';

export default class TitleList extends Component {

	static displayName = 'TitleList';

	constructor(props){
		super(props);
	}

	  render() {

    var {value} = this.props;

		return (
		  <div>
        		<Title render={value}/>
		  </div>
		);
	  }

}
