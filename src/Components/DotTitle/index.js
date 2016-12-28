import React, {
	Component
} from 'react';
import './index.less';

export default class DotTitle extends Component {
	static PropTypes = {
		/**
		 *标题
		 */
		title: React.PropTypes.title,
		/**
		 *子代元素
		 */
		children: React.PropTypes.children,
		/**
		 *样式
		 */
		style: React.PropTypes.style
	}

	render() {
		const {
			title,
			children,
			style
		} = this.props;

		return (
			<div className='ui-title' style={style}>
         <div className={children?'ui-heads':'ui-head'}>
			 <span className='ui-title-mid'>{title}</span>
         </div>
		 {children &&
		  <div className='ui-body'>
		     <div className='ui-body-inner'>
		 	   {children}
		 	 </div>
		  </div>}

		</div>
		)
	}
}