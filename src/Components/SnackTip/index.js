import React, {
	Component
} from 'react';
import './index.less';

export default class SnackTip extends Component {

	static displayName = 'SnackTip';
    
   constructor(props) {
    super(props);
  }

	static propTypes = {
		/**
		*标题
		*/
		title: React.PropTypes.string,
		titleAfter: React.PropTypes.string,
		/**
		*样式
		*/
		style:React.PropTypes.object,
		onClose:React.PropTypes.func,
		open:React.PropTypes.bool
	}
    

	render() {

		const {
			title,
			style,
			children,
			open,
			titleAfter,
			onClose,
			...other
		} = this.props;


		let className = 'snackTap';

		let titleAfterStyle={
			color:'#265e97',
			fontSize:'16px',
			marginLeft:'10px',
			display:"inline-block"
		}
		let zIndex={
			zIndex:this.props.zIndex||10,

		}

		if(!open){
			className = 'none';	
		} 

		return (
			<div className="ui-snackTap" style={zIndex}>
			 <div className={className}  style={style} onClick={onClose}>
			  <span>{title}</span><span style={titleAfterStyle}>{titleAfter}</span>
			 </div>
			</div>
		);

	}
}
