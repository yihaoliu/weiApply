import React from 'react';

import '../index.less';

export default  class Row extends React.Component {

	static displayName = 'Row';

	static propTypes = {
				style: React.PropTypes.object,
				className: React.PropTypes.string,
				children:React.PropTypes.node,
	}
	render() {

		let {children,className,style} = this.props;

		return (


			<div className="row" style={style}>
				{children}
			</div>

		);

	}


}
