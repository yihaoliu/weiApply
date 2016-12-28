import React from 'react';

import WrapComponent from '../WrapComponent';
import './index.less';

export default class TextareaComponent extends React.Component {

	static defaultProps = {
		maxSize:200
	}
	static PropTypes = {
		onChange: React.PropTypes.func,
		maxSize: React.PropTypes.number
	}

	constructor(props) {
		super(props)


		this.onChange = this.onChange.bind(this);
		this.state = {
			inputSize: 1,
		}

	}

	onChange(event){
		var value = event.target.value;

		const {onChange,input,maxSize} = this.props;

		let inputSize = (value.length>maxSize)?maxSize:value.length;
		this.setState({
			inputSize
		});

		value = value.slice(0,maxSize);
		input.onChange(value);
		onChange && onChange(value);

	}

	render() {

		let {
			input,
			label,
			type,
			meta: {
				touched,
				error
			},
			requireLabel,
			disabled,
			placeholder,
			col,
			row,
			style,
			inline,
			heightStyle,
			maxSize,
			lengthClass
		} = this.props;

		let {
			inputSize
		} = this.state;

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
				<textarea {...input} placeholder={placeholder|| label} disabled={disabled} col={col} row={row} onChange={this.onChange} style={heightStyle}></textarea>
				<div style={{width:40,height:30,lineHeight:"30px",color:'#cccccc',float:'right',fontSize:'14px'}} className={lengthClass}><span className="len">{inputSize}</span>/<span className="size">{maxSize?maxSize:200}</span></div>
				{touched && error && <div className="error-wrap"> <span>{error}</span></div> }
			</WrapComponent>
		);

	}

}
