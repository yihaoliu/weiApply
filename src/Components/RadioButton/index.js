import React,{Component} from 'react';

import RadioButton from 'material-ui/RadioButton';

export default class KrRadioButton extends React.Component{


	static PropTypes = {
		checked:React.PropTypes.bool,
	}

	render(){


		return (
			<RadioButton {...this.props} />
		);
	}
}
