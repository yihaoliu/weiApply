import React from 'react';
import Field from '../Field';


import InputComponent from './InputComponent';
import LabelTextComponent from './LabelTextComponent';
import GroupComponent from './GroupComponent';
import FileUploadComponent from './FileUploadComponent';
import DateComponent from './DateComponent';
import SelectComponent from './SelectComponent';
import SearchPersonelComponent from './SearchPersonelComponent';
import RadioComponent from './RadioComponent';
import CheckboxComponent from './CheckboxComponent';

export default class KrField extends React.Component {

	static defaultProps = {
		left: 0,
		right: 0,
	}

	static PropTypes = {
		type: React.PropTypes.string,
		name: React.PropTypes.string,
		label: React.PropTypes.string,
		component: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		grid: React.PropTypes.number,
		value: React.PropTypes.string,
		inline: React.PropTypes.bool,
		search: React.PropTypes.bool,
		left: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		right: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	    colorStyle:React.PropTypes.obj,
	}

	render() {

		let {
			style,
			left,
			right,
			grid = 1,
			className,
			children,
			inline,
			component,
			type,
			requireLabel,
			label,
			value,
			search,
			colorStyle,
			heightStyle,
			lengthClass,
			...other
		} = this.props;


		let WrapStyles = Object.assign({}, {
			width: (grid * 100) + '%',
			paddingLeft: left,
			paddingRight: right
		}, style);

		if (component === 'input' || component === 'text') {
			return (
				<Field {...this.props} component={InputComponent}  style={WrapStyles}/>
			);
		}


				if (component === 'labelText' || type == 'labelText') {
					return (
						<LabelTextComponent {...this.props} style={WrapStyles} colorStyle={colorStyle}/>
					);
				}



						if (component === 'group' || type == 'group') {
							return (
								<GroupComponent {...this.props} style={WrapStyles}/>
							);
						}

						if (component === 'file') {
							return (
								<Field {...this.props} component={FileUploadComponent}  style={WrapStyles} {...other}/>
							);
						}



								if (component === 'date' || type == 'date') {
									return (
										<Field {...this.props} component={DateComponent}  style={WrapStyles}/>
									);
								}


								if (component === 'select' || type == 'select') {
									return (
										<Field {...this.props} component={SelectComponent} style={WrapStyles}>
										{children}
										</Field>
									);
								}


								if (component === 'searchPersonel') {
									return (
										<Field {...this.props} component={SearchPersonelComponent}  style={WrapStyles} {...other}/>
									);
								}


						if (component === 'radio' || type == 'radio') {
									return (
										<Field {...this.props} component={RadioComponent}  style={WrapStyles}/>
									);
							}


													if (component === 'checkbox' || type == 'checkbox') {
																return (
																	<Field {...this.props} component={CheckboxComponent}  style={WrapStyles}/>
																);
														}



		return (
			<Field {...this.props} component={InputComponent}  style={WrapStyles}/>
		);

	}
}
