import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';

import Notify from '../Notify';


import Promise from 'promise-polyfill';

import InputComponent from './InputComponent';
import DateComponent from './DateComponent';
import RadioComponent from './RadioComponent';
import SelectComponent from './SelectComponent';
import TextareaComponent from './TextareaComponent';
import FileUploadComponent from './FileUploadComponent';
import SearchPersonelComponent from './SearchPersonelComponent';
import SearchBelongCommunity from './SearchBelongCommunity';
import LabelTextComponent from './LabelTextComponent';
import GroupComponent from './GroupComponent';
import CityComponent from './CityComponent';
import SearchCompanyComponent from './SearchCompanyComponent';
import EditLabelTextComponent from './EditLabelTextComponent';


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
	    colorStyle:React.PropTypes.object,
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

		if (component === 'editLabelText' || type == 'editLabelText') {
			return (
				<EditLabelTextComponent {...this.props} style={WrapStyles} colorStyle={colorStyle}/>
			);
		}


		if (component === 'file') {
			return (
				<Field {...this.props} component={FileUploadComponent}  style={WrapStyles} {...other}/>
			);
		}

		if (component === 'searchPersonel') {
			return (
				<Field {...this.props} component={SearchPersonelComponent}  style={WrapStyles} {...other}/>
			);
		}
		// if (component === 'searchCommunities') {
		// 	return (
		// 		<Field {...this.props} component={SearchCommunityComponent}  style={WrapStyles} {...other}/>
		// 	);
		// }

		if (component === 'searchCommunity') {
			return (

				<Field {...this.props} component={SearchBelongCommunity}  style={WrapStyles} {...other}/>
			);
		}



		if (component === 'searchCompany') {
			return (
				<Field {...this.props} component={SearchCompanyComponent}  style={WrapStyles} {...other}/>
			);
		}

		if (component === 'search') {
			return (
				<Field {...this.props} component={SearchPersonelComponent}  style={WrapStyles} {...other}/>
			);
		}


		if (component === 'city' || type == 'city') {
			return (
				<CityComponent {...this.props} style={WrapStyles}/>
			);
		}

		if (component === 'textarea') {
			return (
				<Field {...this.props} component={TextareaComponent} style={WrapStyles} heightStyle={heightStyle} lengthClass={lengthClass}/>
			);
		}

		if (component === 'select' || type == 'select') {
			return (
				<Field {...this.props} component={SelectComponent} style={WrapStyles}>
				{children}
				</Field>
			);
		}

		if (component === 'radio' || type == 'radio') {
			return (
				<Field {...this.props} component={RadioComponent}  style={WrapStyles}/>
			);
		}

		if (component === 'date' || type == 'date') {
			return (
				<Field {...this.props} component={DateComponent}  style={WrapStyles}/>
			);
		}

		if (component === 'group' || type == 'group') {
			return (
				<GroupComponent {...this.props} style={WrapStyles}/>
			);
		}

		if (!component || component === 'input') {
			return (
				<Field {...this.props} component={InputComponent}  style={WrapStyles}/>
			);
		}

		return (
			<Field {...this.props} component={InputComponent}  style={WrapStyles}/>
		);

	}
}
