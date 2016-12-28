import React from 'react';

import './index.less';
import WrapComponent from '../WrapComponent';

export default class  GroupComponent extends React.Component {

	static PropTypes = {
		inline:React.PropTypes.bool,
		requireBlue:React.PropTypes.bool,
	}

	constructor(props){
		super(props)
	}

	render(){

		let {requireLabel,requireBlue,label,children,style,inline,contentStyle} = this.props;

			contentStyle= Object.assign({},contentStyle);

			return (
				<WrapComponent label={label} wrapStyle={style} contentStyle={contentStyle} requireLabel={requireLabel} inline={inline} requireBlue={requireBlue}>
					{children}
				</WrapComponent>
				);
	}
}
