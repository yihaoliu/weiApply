import React,{Component} from 'react';
import './index.less';

export default class Paper extends Component{

	static defaultProps = {
		width: '100%',marginTop:"60px"
	};

	static propTypes = {
		children: React.PropTypes.node,
		width: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number]),
	};

	render(){

		let {width,children,style} = this.props;

		let styles =Object.assign({},style);
		styles.width = width;

		return (
			<div className="ui-paper" style={styles}>
				{children}
			</div>
		);
	}
}
