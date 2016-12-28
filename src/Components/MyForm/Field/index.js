import React from 'react';
import { Field, reduxForm } from 'redux-form';

import DatePicker from 'material-ui/DatePicker';

import './index.less';




const renderFieldDate = ({ input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder}) => (
  <div className="form-item">
    <label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
    <div className="form-main">
		<div className="form-input-main">
			<div className="form-input">
				 <DatePicker hintText={placeholder} />
			</div>
		</div>

      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderFieldRadio = ({ input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder}) => (

  <div className="form-item">
    <div className="form-main">
		<div className="form-input-main">
			<div className="form-input">
				<input {...input} placeholder={placeholder|| label} type={type} disabled={disabled}/>
			</div>
		</div>
      {touched && error && <span>{error}</span>}
    </div>
    <label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>

  </div>

);


const renderFieldInput = ({ input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder}) => (

  <div className="form-item">
    <label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
    <div className="form-main">
		<div className="form-input-main">
			<div className="form-input">
				<input {...input} placeholder={placeholder|| label} type={type} disabled={disabled}/>
			</div>
		</div>

      {touched && error && <span>{error}</span>}
    </div>
  </div>

);

const renderFieldTextarea = ({ input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,col,row}) => (


  <div className="form-item">
    <label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
    <div className="form-main">
		<div className="form-input-main">
			<div className="form-input">
				<textarea {...input} placeholder={placeholder|| label} disabled={disabled} col={col} row={row}></textarea>
			</div>
		</div>

      {touched && error && <span>{error}</span>}
    </div>
  </div>


);


const renderFieldSelect = ({ input, label, type, meta: { touched, error },children,disabled}) => (


  <div className="form-item">
    <label className="form-label">{label}</label>
    <div className="form-input">
		<select {...input}  disabled={disabled}>
		{children}
		</select>
		{touched && error && <span>{error}</span>}
    </div>
  </div>


)


export default class KrField extends React.Component {


	PropTypes = {
		type: React.PropTypes.string,
		name: React.PropTypes.string,
		label: React.PropTypes.string,
		component: React.PropTypes.string,
		disabled: React.PropTypes.bool,
	};

	render() {

		let {className,children,component,type,requireLabel} = this.props;

		if(component === 'textarea' || type=='textarea'){

			return (
					<Field {...this.props} component={renderFieldTextarea}/>
				);

		}


		if(component === 'select' || type=='select'){

			return (
				<Field {...this.props} component={renderFieldSelect}>
				{children}
				</Field>
			);

		}

		if(component === 'text' || type=='text'){

			return (
				<Field {...this.props} component={renderFieldInput}  />
			);

		}


		if(component === 'radio' || type=='radio'){

			return (
				<Field {...this.props} component={renderFieldRadio}  />
			);

		}

		if(component === 'date' || type=='date'){

			return (
				<Field {...this.props} component={renderFieldDate}  />
			);

		}

		if(!component || component === 'input'){

			return (
				<Field {...this.props} component={renderFieldInput}  />
			);

		}


		return null;



	}


}






