import React,{Component} from 'react';

import Checkbox from '../Checkbox';

export default class CheckboxGroup extends Component{

	static displayName = 'CheckboxGroup';

	static defaultProps = {
		name:'kr-checkboxGroup',
		optipns:[]
	}

	static propTypes = {
		/**
		 * name
		 */
		name:React.PropTypes.string,
		/**
		 * Checkbox 选中时值为true
		 */
		options:React.PropTypes.array,
	};

	constructor(props){
		super(props);

	}

  componentWillReceiveProps(nextProps) {

	}


	render(){

	   let {options,name} = this.props;

		return (
		    <div>
            {options && options.map((item,index)=><Checkbox label={item.label} name={name} key={index} {...item}/>)}
        </div>
		);

	}
}
