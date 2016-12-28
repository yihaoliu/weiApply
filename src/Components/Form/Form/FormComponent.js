import React from 'react';
import {reduxForm,formValueSelector,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';


export default class FormComponent  extends React.Component{

	constructor(props,context){
		super(props, context);

	}

	render(){

	const {children} = this.props;	

	  return (

		  <form>
		  	{children}
		  </form>

	 );

	}

}
