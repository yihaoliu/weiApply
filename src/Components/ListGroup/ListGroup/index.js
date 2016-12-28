import React, {
	Component
} from 'react';

import './index.less';

export default class ListGroup extends Component {


	static displayName = 'ListGroup';
	
	static defaultProps = {
		inline:true
	}
	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		inline: React.PropTypes.bool,
	}

	constructor(props) {
		super(props);

	}


	render() {

		let {children,inline} = this.props;

		let className = 'ui-list-group';

		if(inline){
			className+=' inline';
		}


		return (
			<div className={className}>
				{children}
			</div>
		);
	}
}
