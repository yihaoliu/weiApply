import React from 'react';

import './index.less';

export default class View extends React.Component {
	static PropTypes = {
		label: React.PropTypes.string,
	}


	constructor(props) {
		super(props)
	}

render() {
	const {label} = this.props;


	return (


		<div>
			<div className="circle-head"></div>
			<div className="view-background">
				  	<span className="content-title">{label}</span>

			</div>

		</div>



		)

}



}
