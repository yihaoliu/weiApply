import React from 'react';

import AppBar from 'material-ui/AppBar';

export default class KrAppBar extends React.Component {

	static defaultProps = {
		title:'KR-UI'
	}

	static propTypes = {
		/**
		 * title
		 */
		title:React.PropTypes.string,
	}

	render() {

		let {children,className,style} = this.props;

		return (
        <AppBar {...this.props} />
		);

	}

}
