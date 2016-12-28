import React from 'react';

import {
	ClassNames
} from 'kr/Utils';


import './index.less';

export default  class Input extends React.Component {

	static displayName = 'Input';

	static defaultPorps = {
		value:'',
		type:'text',
		placeholder:'',
		disabled:false,
	}

	static propTypes = {
				name: React.PropTypes.string,
				style: React.PropTypes.object,
				className: React.PropTypes.string,
				type: React.PropTypes.string,
				children:React.PropTypes.node,
				minLength:React.PropTypes.number,
				maxLength:React.PropTypes.number,
				pattern:React.PropTypes.object,
				placeholder:React.PropTypes.string,
				disabled:React.PropTypes.bool,
				/**
				*{maxLength:'不能超过最大值',minLength:'最小值为'}
				*
				*/
				errors:React.PropTypes.object,
				onError:React.PropTypes.func,
				autoFocus:React.PropTypes.bool,
	}
	componentDidMount(){

	}

	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);

		this.state = {
			value:this.props.defaultValue
		}

	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.props.value){
			 this.setState({
				 value:nextProps.value
			 });
		}
	}
	componentDidMount(){
		if(!this.props.autoFocus){
			return;
		}
		this.refs.input.focus();
	}

	onChange(event){

			var value = event.target.value;
			const {onChange,maxLength} = this.props;
			if (maxLength) {
					value = value.slice(0,maxLength);
			}

			this.setState({
				value
			});


			onChange && onChange(value);

		let message = this.onValidate(value);
		let {onError} = this.props;
			onError && onError(message);

	}

	onValidate = (value)=>{

		value = value || this.state.value;

		let {minLength,maxLength,requiredValue,pattern,errors} = this.props;

		if(requiredValue && !value){
			return errors['requiredValue'];
		}

		if(minLength && String(value).length<minLength){
			return errors['minLength'];
		}

		if(maxLength && String(value).length>maxLength){
			return errors['maxLength'];
		}

		if(pattern && !pattern.test(value)){
			return errors['pattern'];
		}

		return undefined;

	}

	onBlur = ()=>{

		let {value} = this.state;
		let message = this.onValidate();
		let {onError,onBlur} = this.props;
		if(typeof message !== 'undefined'){
			onError && onError(message);
		}
		onBlur && onBlur(value);
	}

	onFocus = ()=>{
		let {onFocus} = this.props;
		onFocus && onFocus();
	}

	render() {

		let {children,className,style,type,name,disabled,placeholder,pattern,...other} = this.props;

		let {value} = this.state;

		let  classNames = ClassNames('ui-input',className);

		if(disabled){
		  	classNames = ClassNames('ui-input',className,'input-disabled');
		}

		return (

			 <input ref="input"  type={type} name={name} className={classNames}  style={style} placeholder={placeholder} value={value} {...other} disabled={disabled} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} />

		);
	}
}
