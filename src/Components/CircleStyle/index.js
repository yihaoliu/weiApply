import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';

import './index.less';

export default class CircleStyle extends Component {

	static displayName = 'CircleStyle';

	static defaultProps = {
		num: 1,
		info: '',
		circle: 'center',

	}

	static propTypes = {
		/**
		 * num
		 */
		num: React.PropTypes.any,
		/**
		 * info 文字描述
		 */
		info: React.PropTypes.string,
		/**
		 * circle center:圆圈在中间 bottom:圆圈在底部
		 */
		circle: React.PropTypes.string,
		/**
		 * style 样式
		 */
		style: React.PropTypes.object,

	};

	constructor(props) {
		super(props);

	}

	componentWillReceiveProps(nextProps) {

	}


	render() {

		let {
			num,
			info,
			circle,
			children,
			style,
			...other
		} = this.props;
		if (circle == 'center') {
			return (
				<div className="ui-detailContent" style={style}>
					<div className="one"><p>{num}</p><div className="txt">—— {info}</div></div>
					<div className="circle"><span></span></div>
					{children}
			</div>
			);
		}
		if (circle == 'bottom') {
			return (
				<div className="ui-textInfo" style={style}>
					<div className="one"><p>{num}</p><div className="txt">—— {info}</div></div>
					<div className="circle"><span></span></div>
					{children}
			</div>
			);
		}


	}
}
