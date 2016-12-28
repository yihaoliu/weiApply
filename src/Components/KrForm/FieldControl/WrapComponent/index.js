
import React from 'react';

import FormItem from './Item';
import FormLabel from './Label';
import FormController from './Controller';

export default class  WrapComponent extends React.Component {



	static defaultProps = {
		inline:false,
		alignRight:false
	}


	static PropTypes = {
		label:React.PropTypes.string,
		requireLabel:React.PropTypes.bool,
		children:React.PropTypes.node,
		wrapStyle:React.PropTypes.object,
		inline:React.PropTypes.bool,
		requireBlue:React.PropTypes.bool,
		alignRight:React.PropTypes.bool,
		search:React.PropTypes.bool

	}

	constructor(props){
		super(props)
	}

	render(){

		let {requireLabel,alignRight,label,search,children,wrapStyle,style,inline,requireBlue,simple,contentStyle} = this.props;

		if(simple){

			return (
				<FormItem style={wrapStyle}>
					<FormController simple={simple} style={contentStyle}>
						{children}
					</FormController>
				</FormItem>
			);

		}


		contentStyle = Object.assign({},contentStyle,style);


		return (
				<FormItem style={wrapStyle}>
					<FormLabel label={label}  alignRight={alignRight} search={search} requireLabel={requireLabel} inline={inline} requireBlue={requireBlue}/>
					<FormController style={contentStyle} search={search} inline={inline} alignRight={alignRight} requireBlue={requireBlue}>
						{children}
					</FormController>
				</FormItem>
			);
	}
}
