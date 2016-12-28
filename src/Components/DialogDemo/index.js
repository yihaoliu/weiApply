import React, {
	Component
} from 'react';
import './index.less';


import {
	Dialog,
} from 'material-ui';

export default class DialogComponent extends Component {

	static displayName = 'DialogComponent';

	static defaultProps = {
		autoScrollBodyContent: true,
		autoDetectWindowHeight: true,
	}

	static propTypes = {
		/**
		*关闭时回调函数
		*/
		onClose: React.PropTypes.func,
		/**
		*是否开启
		*/
		open: React.PropTypes.bool,
		/**
		*标题
		*/
		title: React.PropTypes.string,
		/**
		*显示遮罩层
		*/
		modal: React.PropTypes.bool,
		/**
		*
		*/
		autoDetectWindowHeight: React.PropTypes.bool,
		/**
		* 内容出现滚动条
		*/
		autoScrollBodyContent: React.PropTypes.bool,
	}


	render() {

		const {
			title,
			modal,
			open,
			onClose,
			autoDetectWindowHeight,
			autoScrollBodyContent,
			children,
			...other
		} = this.props;

		return (
			<div >
				<Dialog
					title={title}
					modal={modal}
					autoScrollBodyContent={autoScrollBodyContent}
					autoDetectWindowHeight={autoDetectWindowHeight}
					titleClassName="ui-dialog-header"
					open={open}
					style={{borderRadius:4}}
					{...other}>
						<div className="cancle-dialog" onTouchTap={onClose}></div>
						<div className="ui-content">
							{children}
						</div>

				  </Dialog>
			</div>
		);

	}
}
