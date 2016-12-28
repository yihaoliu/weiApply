import React,{Component} from 'react';

import Radio from '../Radio';

export default class RadioGroup extends Component{

	static displayName = 'RadioGroup';

	static defaultProps = {
    name:'kr',
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
            {options && options.map((item,index)=><Radio label={item.label} key={index} name={name} {...item}/>)}
        </div>
		);

	}
}
