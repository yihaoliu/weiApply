import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './index.less';


export default class Form extends React.Component {


	PropTypes = {
		text: React.PropTypes.string,
		label: React.PropTypes.string,
	};

	render() {


		React.Children.map(this.props.children, (child) => {
			rows.push(this.createRowElement(child,rowNumber++)) ;
		});

		return (

			 <div className="label-item">

			  </div>
		);
	}


}


















