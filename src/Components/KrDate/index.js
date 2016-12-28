import React from 'react';

import {
	DateFormat
} from 'kr/Utils';


export default class KrDate extends React.Component {

	static displayName = 'KrDate';

	static defaultProps = {
		format: 'yyyy-mm-dd',
	}

	static propTypes = {
		/**
		 *值
		 */
		value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		/**
		 * yyyy-mm-dd hh:MM:ss
		 */
		format: React.PropTypes.string
	};

	render() {

		let {
			className,
			value,
			format
		} = this.props;


		if (!value) {
			return (<span>无</span>);
		}


		let result = '';

		try {
			result = DateFormat(value, format);
		} catch (err) {
			let time = new Date(value * 1)
			result = DateFormat(time,format);
		}

		return (
			<span>{result}</span>
		);

	}
}
