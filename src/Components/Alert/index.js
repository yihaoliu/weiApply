import React, {
	Component
} from 'react';


import './index.less';

export default class Alert extends Component {

	static displayName = 'Alert';

	static defaultProps = {
		className:'',
	}

	static propTypes = {
    className:React.PropTypes.string
	}


	constructor(props) {
		super(props);

	}


	render() {




		return (
			<div className="ui-alert" >

			</div>
		);
	}
}
