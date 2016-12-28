import React from 'react';
import { Field, reduxForm } from 'redux-form';

import {
  DateFormat
} from 'kr/Utils';


export default class Format extends React.Component {

	static displayName = 'Format';

	static defaultProps = {
		format:'yyyy-mm-dd',
	}

	static PropTypes = {
		value:React.PropTypes.string,
		format:React.PropTypes.string
	};

	render() {

		let {className,value,format} = this.props;
		if(!value){
			return (<span>无</span>);
		}

		let result = '';

		try{
			result =  DateFormat(value,format);
		}catch(err){
			let time=new Date(value*1)
			result = DateFormat(time,"yyyy-mm-dd");
		}

		return (
			<span>{result}</span>
		);

	}
}
