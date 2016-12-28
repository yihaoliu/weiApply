import React,{Component} from 'react';
import './index.less';

export default class Loading extends Component{

	static displayName = 'Loading';
	
	render(){

		return (
<div className="spinner">
  <div className="double-bounce1"></div>
  <div className="double-bounce2"></div>
</div>
		);
	}
}






