import React,{Component} from 'react';

import './index.less';


export default class KrCheckbox extends Component{

	static displayName = 'KrCheckbox';

	static defaultProps = {
		checked:false,
		label:'',
		readOnly:false,
	}

	static propTypes = {
		/**
		 * Checkbox 选中时值为true
		 */
		checked:React.PropTypes.bool,
		/**
		 * 点选时回调该方法
		 */
		onCheck:React.PropTypes.func,
		/**
		* label
		*/
		label:React.PropTypes.string,
		/**
		*是否只读
		*/
		readOnly:React.PropTypes.bool
	};

	constructor(props){
		super(props);

		this.onCheck = this.onCheck.bind(this);

		this.state = {
			checked:this.props.checked
		}

	}

  componentWillReceiveProps(nextProps) {
		if(nextProps.checked !== this.props.checked){
			  this.setState({
					checked:nextProps.checked
				});
		}
	}

	onCheck(){

		let {readOnly} = this.props;

		if(readOnly){
				return ;
		}

		this.setState({
			checked:!this.state.checked
		});

		const {onCheck} = this.props;
		onCheck && onCheck();

	}


	render(){

		let {checked} = this.state;
		let {label} = this.props;

		return (
			<span className="ui-checkbox">
					<input type="checkbox" onChange={this.onCheck} checked={checked}/>
					{label && <span className="label">{label}</span>}
			</span>

		);

	}
}
