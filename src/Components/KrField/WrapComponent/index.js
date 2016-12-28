
import React from 'react';

import FormItem from './Item';
import FormLabel from './Label';
import FormController from './Controller';
import ControllerNotify from './ControllerNotify';



export default class  WrapComponent extends React.Component {



	static defaultProps = {
		inline:false,
		alignRight:false
	}


	static propTypes = {
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

		let {requireLabel,alignRight,label,search,children,wrapStyle,style,inline,requireBlue,simple} = this.props;

		if(simple){

			return (
				<FormItem style={wrapStyle}>
					<FormController simple={simple}>
						{children}
					</FormController>
				</FormItem>
			);

		}

		return (
				<FormItem style={wrapStyle}>
					<FormLabel label={label}  alignRight={alignRight} search={search} requireLabel={requireLabel} inline={inline} requireBlue={requireBlue}/>
					<FormController style={style} search={search} inline={inline} alignRight={alignRight} requireBlue={requireBlue}>
						{children}
						<ControllerNotify notifys={this.props.notifys}/>
					</FormController>
				</FormItem>
			);


	}
}
