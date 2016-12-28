import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../../Input';

import './index.less';

export default class InputComponent extends React.Component{

	static displayName = 'InputComponent';
	static propTypes = {
		inline:React.PropTypes.bool,
		simple:React.PropTypes.bool,
		heightStyle:React.PropTypes.object,
		maxLength:React.PropTypes.number
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

	onError = (message)=>{

		const {onError} = this.props;
		onError && onError();

		const {input} = this.props;

		input.onError && input.onError(message);

	}

	render(){

		let {input, label, type,meta: { touched, error },defaultValue,requireLabel,onChange,disabled,placeholder,style,inline,simple,heightStyle,...other} = this.props;

			if(type === 'hidden'){
				return (
					<div>
						<Input {...input} type="hidden"/>
					</div>
				);
			}

			let className = '';

			return (
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} simple={simple}>
					<Input {...input} defaultValue={defaultValue} placeholder={placeholder|| label} type={type} disabled={disabled} className={className} style={heightStyle} onChange={this.onChange} {...other} onError={this.onError}/>
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				</WrapComponent>
		);
	}
}
