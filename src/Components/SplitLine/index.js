import React,{Component} from 'react';
import './index.less';

export default class SplitLine extends Component{

	render(){
		return (
			<div className="split-line">
				<span className="circle"></span>
				<span className="line"></span>
				<span className="circle"></span>

			</div>
		)
	}
}