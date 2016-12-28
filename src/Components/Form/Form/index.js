import React from 'react';
import {reduxForm,formValueSelector,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';
import {Actions,Store} from 'kr/Redux';


class FormComponent  extends React.Component{

	static propTypes = {
		onSubmit:React.PropTypes.func,
		name:React.PropTypes.string,
	}

	constructor(props,context){
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(values){
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}

	render(){

		let {children, error, handleSubmit, pristine, reset, submitting} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				{children}
			 </form>
		 );

	}

}


export default  class Form  extends React.Component{

	static PropTypes = {
		name:React.PropTypes.string,
		initialValues:React.PropTypes.object,
		onSubmit:React.PropTypes.func,
		validations:React.PropTypes.object,
	}

	constructor(props,context){
		super(props, context);

		this.onSubmit  = this.onSubmit.bind(this);
		this.onValidate = this.onValidate.bind(this);
	}

	onSubmit(values){
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}

	onValidate(values){
		const errors = {};
	   	const {validations} = this.props;

		if(!validations){
			return errors;
		}

		var validateInfo = {};

		for(var item in validations){
			if(validations.hasOwnProperty(item)){

				validateInfo = validations[item];
				var val = values[item];

				//require
				if(validateInfo.hasOwnProperty('required') && !val){
					errors[item] = validateInfo['required'].message;
					return errors;
				}

				//minLength
				if(validateInfo.hasOwnProperty('minLength')){
					var minLength = validateInfo['minLength'].value;
					if(parseInt(val.length)<parseInt(minLength)){
						errors[item] = validateInfo['minLength'].message;
						return errors;
					}
				}

				//maxLength
				if(validateInfo.hasOwnProperty('maxLength')){
					var maxLength = validateInfo['maxLength'].value;
					if(parseInt(val.length)>parseInt(maxLength)){
						errors[item] = validateInfo['maxLength'].message;
						return errors;
					}
				}

			}
		}

	   return errors;

	}


	render(){

		const {children,initialValues,name} = this.props;

	    FormComponent = reduxForm({ 
			form: name,
			shouldAsyncValidate:function(){
					return false;
			},
			enableReinitialize:true,
			keepDirtyOnReinitialize:true,
			initialValues,
			validate:this.onValidate
		})(FormComponent);

	  return (

		  	 <FormComponent onSubmit={this.onSubmit} {...this.props}>
		  		{children}
		  	</FormComponent>
	 );

	}

}






