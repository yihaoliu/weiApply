import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import  './circle.less';

import * as actionCreators from 'kr-ui/../Redux/Actions';

export default class Circle extends Component{

	static PropTypes = {
		type:React.PropTypes.string
	}

	constructor(props){
		super(props);
		this.type = this.props.type;
	}

	componentDidMount() {
        
	}

	render(){
          
		 if(this.type === 1){
		 	return(
				<span className="circle-color over-circle"></span>
		 	)
		 }else if(this.type === 0){
		 	return (
				<span className="circle-color section-circle"></span>	
		 	)
		 }else{
		 	return (
				<span className="circle-color no-pay"></span>
		 	)
		 }
		

	}

}




