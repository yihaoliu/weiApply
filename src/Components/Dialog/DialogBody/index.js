import React, {
	Component
} from 'react';

import ReactDOM from 'react-dom';

export default class DialogBody extends Component {

	static displayName = 'DialogBody';

	static propTypes = {
    children:React.PropTypes.node
	}

	componentDidMount(){
			this.initializeDialogBodyStyles();
			window.addEventListener('resize',function(){
				this.initializeDialogBodyStyles();
			}.bind(this));
	}

	componentDidUpdate(){
			this.initializeDialogBodyStyles();
	}


	initializeDialogBodyStyles = ()=>{

		var ele = this.refs.dialogBody;
		const {autoScrollBodyContent} = this.props;

		if(!ele){
				return ;
		}
		var page = this.getPageWidthOrHeight();

		var eleBoxStyle = {};

    try{
			eleBoxStyle = ele.getBoundingClientRect();
    }catch(err){
		    eleBoxStyle = {width:0,height:0};
    }

		ele.style.maxHeight = page.height-200+'px';
		ele.style.minHeight = 100 +'px';

		if(eleBoxStyle.height > page.height-200){
			ele.style.overflowY = 'scroll';
		}

	}

	getPageWidthOrHeight = ()=>{

			var page = {};
			 page.width = window.innerWidth;
			 page.height = window.innerHeight;
			if(document.compatMode == 'CSS1Compat'){
				 page.width = document.documentElement.clientWidth;
				 page.height = document.documentElement.clientHeight;
			}else{
				page.width = document.body.clientWidth;
				page.height = document.body.clientHeight;
			}
			return  Object.assign({},page);
	}


	render() {

		const { children ,bodyStyle} = this.props;

		return (
				<div className="dialog-body" ref="dialogBody" style={bodyStyle}>
						{children}
			</div>
		);

	}
}
