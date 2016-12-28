import React from 'react';

import './index.less';

export default  class Radio extends React.Component {

	static displayName = 'Radio';

	static defaultPorps = {
		value:'',
		label:''
	}

	static propTypes = {
				name: React.PropTypes.string,
				style: React.PropTypes.object,
				className: React.PropTypes.string,
				children:React.PropTypes.node,
				label:React.PropTypes.string
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

	onChange(event){

			var value = event.target.value;
			const {onChange} = this.props;

			this.setState({
				value
			});

			onChange && onChange(value);
	}
	render() {

		let {children,className,style,name,label,...other} = this.props;

		let {value} = this.state;

		let classNames = 'ui-input-radio';
		classNames+=' '+className;

		return (
			<span className="ui-radio">
					 <input type="radio" style={style} name={name} className={classNames} value={value} onChange={this.onChange} {...other}/>
					 {label && <span className="label">{label}</span> }
			</span>

		);
	}
}
