import React from 'react';

import ReactSelect from '../../Select/Select';

import WrapComponent from '../WrapComponent';
import './index.less';

//import 'react-select/dist/react-select.css';

export default class SelectComponent extends React.Component {


	static defaultProps = {
		inline: false
	}

	static PropTypes = {
		onChange: React.PropTypes.func,
		inline: React.PropTypes.bool,
		search: React.PropTypes.bool
	}

	constructor(props) {
		super(props)

		this.onChange = this.onChange.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.setInitValue = this.setInitValue.bind(this);

		this.isInit = false;

		this.state = {
			value: []
		}
	}

	componentDidMount() {
		this.setInitValue(this.props.input.value);
	}


	componentWillReceiveProps(nextProps) {
		if (!this.isInit && nextProps.input.value) {
			this.setInitValue(nextProps.input.value);
		}
	}

	setInitValue(value) {

		if (!value) {
			return;
		}

		this.setState({
			value
		});
		this.isInit = true;
	}

	handleChange(value) {

		let {
			input
		} = this.props;
		this.setState({
			value
		});
		input.onChange(value);
	}

	onChange(item) {
		let {
			input,
			onChange
		} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
		onChange && onChange(item);
}

render() {

		let {
			input,
			label,
			inline,
			search,
			type,
			meta: {
				touched,
				error
			},
			children,
			disabled,
			style,
			requireLabel,
			options,
			multi,
			...other
		} = this.props;
		// console.log('select',options);

		if (multi) {
			return (
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
					<div className="ui-select">
						<ReactSelect
									multi
									simpleValue
									name={input.name}
									value={this.state.value}
									clearable={true}
									options={options}
									onChange={this.handleChange}
									placeholder="请选择..."
									noResultsText=""
								/>
					</div>

						{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				</WrapComponent>
			);

		}
		if (options) {
			return (

				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
						<ReactSelect
									name={input.name}
									searchable={false}
									value={input.value}
									clearable={true}
									options={options}
									onChange={this.onChange}
									placeholder="请选择"
									onValueClick={function(){

									}}
								/>

					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
		</WrapComponent>

			);

		}

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
					<select {...input}  disabled={disabled}>
									{children}
					</select>
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
			</WrapComponent>

		);
	}
}
