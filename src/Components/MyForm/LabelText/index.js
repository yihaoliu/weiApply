import React from 'react';
import { Field, reduxForm } from 'redux-form';

import KrDate from '../../Date';

import './index.less';




export default class LabelText extends React.Component {


	PropTypes = {
		text: React.PropTypes.string,
		label: React.PropTypes.string,
		width:React.PropTypes.number,
		type:React.PropTypes.string
	};

	render() {

		let {className,type,text,label,width} = this.props;

		if(type == 'date'){
			return (
				 <div className="label-item">
					<label className="form-label" style={{width:width}}>{label}:</label>
					<div className="form-main">
						<div className="form-input-main">
							<div className="form-input">
								<span className="text" >
									<KrDate value={text}/>
								</span>
							</div>
						</div>
					</div>
				  </div>
			);
		}

		return (

			 <div className="label-item">
				<label className="form-label" style={{width:width}}>{label}:</label>
				<div className="form-main">
					<div className="form-input-main">
						<div className="form-input">
							<span className="text" >{text}</span>
						</div>
					</div>
				</div>
			  </div>
		);


	}


}
