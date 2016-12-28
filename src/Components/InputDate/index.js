import React, {
	Component
} from 'react';

import Input from '../Input';
import KrDate from '../KrDate';

import Calendar from './Calendar';
import ReactDOM from 'react-dom';

import './index.less';
import './animate.less';

window.calendars = [];

export default class InputDate extends React.Component {

	static displayName = 'InputDate';

	static defaultProps = {
		placeholder: '日期',
		defaultValue: +new Date
	}
	static propTypes = {
		/**
		 *样式class类名
		 */
		className: React.PropTypes.string,
		/**
		 * 样式
		 */
		style: React.PropTypes.object,
		placeholder: React.PropTypes.string,
	}

	static childContextTypes = {
		openCalendarDialog: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired
	}

	getChildContext() {
		return {
			openCalendarDialog: this.openCalendarDialog,
			onChange: this.onChange
		};
	}

	constructor(props) {
		super(props)

		this.state = {
			openCalendar: false,
			value: ''
		}
	}


	setDefaultValue = (value) => {

		if (typeof value === 'undefined' || !value) {
			return '';
		}

		if (!isNaN(value)) {
			var nowTime = new Date(value);
			var year = nowTime.getFullYear();
			var month = nowTime.getMonth() + 1;
			var date = nowTime.getDate();

			this.setState({
				value: `${year}-${month}-${date}`
			});

			return;
		}

		if (typeof value === 'string' && value.indexOf('-') !== -1) {
			this.setState({
				value: value
			});
			return;
		}

		if (typeof value === 'string' && value.indexOf('/') !== -1) {
			this.setState({
				value: value.replace('/', '-')
			});
			return;
		}

	}

	docClick = (event) => {
		event = event || window.event;
		var target = event.target;

		while (target) {
			if (target && target.className && target.className.indexOf('calendar') !== -1) {
				return;
			}
			target = target.parentNode;
		}

		const {
			openCalendar
		} = this.props;

		this.closeCalendarDialog();

	}

	componentDidMount() {
		this.setDefaultValue(this.props.value);
		window.calendars.push(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value != this.props.value) {
			this.setDefaultValue(nextProps.value);
		}
	}

	openCalendarDialog = () => {

		this.setState({
			openCalendar: !this.state.openCalendar
		}, function() {
			if (this.state.openCalendar) {
				document.addEventListener('click', this.docClick);
				this.closeOtherAllCalendar();
			}
		});

	}

	closeOtherAllCalendar = () => {

		let calendars = window.calendars;
		var _this = this;
		calendars.map(function(item, index) {
			if (item != _this) {
				item.closeCalendarDialog()
			}
		});
	}

	onChange = (value) => {

		var year;
		var month;
		var date;
		var valueArr = [];

		//校验格式
		if (value.indexOf('-') !== -1) {
			valueArr = value.split('-');
		} else if (value.indexOf('/') !== -1) {
			valueArr = value.split('/');
		}

		year = valueArr[0];
		month = valueArr[1];
		date = valueArr[2];

		if (!year) {
			return;
		}

		if (!date || date > 31) {
			return;
		}

		if (!month || month < -1 || month > 12) {
			return;
		}
		value = `${year}-${month}-${date}`;
		this.setState({
			value
		});
		let {
			onChange
		} = this.props;
		onChange && onChange(value);
	}

	closeCalendarDialog = () => {
		this.setState({
			openCalendar: false
		}, function() {
			document.removeEventListener('click', this.docClick);
		});
	}


	render() {

		let {
			openCalendar
		} = this.state;

		return (
			<div className="ui-calendar" ref="calendar">
					<div className="calendar-content"  onClick={this.openCalendarDialog} >
							<div className="calendar-value">{(this.state.value && <KrDate value={this.state.value} />) || this.props.placeholder} </div>
							<span className="icon"></span>
					</div>
					{openCalendar && <Calendar onChange={this.onChange} value={this.state.value}/>}
				</div>
		);

	}


}
