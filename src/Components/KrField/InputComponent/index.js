import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';

import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';

import './index.less';

export default class InputComponent extends React.Component{



	static contextTypes =  {
	    _reduxForm: React.PropTypes.object.isRequired,
	}
	static PropTypes = {
		inline:React.PropTypes.bool,
		simple:React.PropTypes.bool,
		heightStyle:React.PropTypes.object,
		maxLength:React.PropTypes.number,
		//自动获取焦点

		autoFocus:React.PropTypes.bool,
	}

	constructor(props,context){
		super(props,context)

	}

	componentDidMount(){
	}

	onChange = (value)=>{
		let {input} = this.props;
		input.onChange(value);
		const {onChange} = this.props;
		onChange && onChange(value)

	}
	onBlur=(value)=>{
		let {input} = this.props;
		input.onBlur(value);
		const {onBlur} = this.props;
		onBlur && onBlur(value)
	}
	onFocus=(value)=>{
		let {input} = this.props;
		input.onFocus(value);
		const {onFocus} = this.props;
		onFocus && onFocus(value)
	}

	onError = (message)=>{
		let {meta,input} = this.props;
		const {onError} = this.props;
		const {_reduxForm} = this.context;
		let errors = {};
		errors[input.name] = message;
		meta.dispatch(stopAsyncValidation(_reduxForm.form,errors));

		_reduxForm.blur();

		onError && onError();
	}

	render(){

		let {input, label, type, meta: { touched, error } ,requireLabel,onChange,onBlur,onFocus,disabled,placeholder,style,inline,simple,heightStyle,autoFocus,...other} = this.props;

			if(type === 'hidden'){
				return (
					<div>
						<Input {...input} type="hidden"/>
					</div>
				);
			}

			let className = '';

			if(touched && error){
				className = 'error-input';
			}
			return (
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} simple={simple} notifys={this.props.notifys}>
					<Input {...input} placeholder={placeholder|| label} type={type} disabled={disabled} className={className} style={heightStyle} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} {...other} onError={this.onError} autoFocus={autoFocus}/>
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				</WrapComponent>
		);
	}
}
