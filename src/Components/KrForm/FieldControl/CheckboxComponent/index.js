import React from 'react';

export default class CheckboxComponent  extends React.Component{

  static displayName = 'CheckboxComponent';

	constructor(props){
		super(props)
	}

	render(){

		let { input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style,checked} = this.props;

		const Styles = Object.assign(style,{
			paddingRight:10,
		});

		return (
			<span style={Styles}>
					<input {...input} placeholder={placeholder|| label} type="checkbox" disabled={disabled}/>
					<span style={{paddingLeft:5}}>{label}</span>
			</span>
		)

	}

}
