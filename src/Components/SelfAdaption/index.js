import React, {
	Component,
	PropTypes
} from 'react';

import './index.less';



export default class SelfAdaption extends Component {

	static propTypes = {
		children: React.PropTypes.node,
		type: React.PropTypes.string,
		title: React.PropTypes.string,
		rightMenu: React.PropTypes.node,
		height: React.PropTypes.number,
		style: React.PropTypes.object,
		hide: React.PropTypes.bool
	};
	constructor(props) {

		super(props);


	}



	render() {
		const {
			type,
			children,
			...other
		} = this.props;
		if (type == 'SelfAdaption') {


			return (
				<div className="SelfAdaption">
					
					<div className="SelfChild">
						{this.props.children}
					</div>
				</div>


			);
		}



	}

}