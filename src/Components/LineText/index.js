import React,{Component} from 'react';
import './index.less';

export default class LineText extends Component{
	static PropTypes = {
	  title:React.PropTypes.title,
	  primary:React.PropTypes.string, 
	  onClick:React.PropTypes.func,
	  style:React.PropTypes.style,
	  styleLine:React.PropTypes.styleLine,
	}
	constructor(props){
		super(props);
	}

	

	render(){  
	   const {title,primary,onClick,style,styleLine} = this.props; 
	  
       return(
                    <div className='ui-lineText'>
                        <span className={primary!='true'?'lineText-line line-gray':'lineText-line line-blue'} style={styleLine}></span>
                        <span className={primary!='true'?'lineText-text text-gray':'lineText-text text-blue'} onClick={onClick} style={style}>{title}</span>
		            </div>
       	)
	}
}







