import React from 'react';

import {
	ClassNames
} from 'kr/Utils';


import './index.less';

export default  class Textarea extends React.Component {

	static displayName = 'Textarea';

	static defaultPorps = {
		value:'',
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
	}

	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);

		this.state = {
			value:this.props.value
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
		this.onBlur();
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
	}

	onValidate = ()=>{

		let {minLength,maxLength,requiredValue,pattern,errors} = this.props;
		let {value} = this.state;


		if(requiredValue && !value){
			return errors['requiredValue'];
		}

		if(minLength && String(value).length<minLength){
			return errors['minLength'];
		}

		if(maxLength && value.length>maxLength){
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

	render() {

		let {children,className,style,type,name,disabled,placeholder,...other} = this.props;

		let {value} = this.state;

		let  classNames = ClassNames('ui-textarea',className);

		if(disabled){
		  	classNames = ClassNames('ui-textarea',className,'disabled');
		}


		return (
			 <textarea  name={name} className={classNames}  style={style} placeholder={placeholder} value={value} {...other} disabled={disabled} onChange={this.onChange} onBlur={this.onBlur} />
		);
	}
}
