import React, {
	Component
} from 'react';


export default class CalendarDayDispaly extends React.Component {

	static displayName = 'CalendarDayDispaly';

	static propTypes = {
		/**
		*样式class类名
		*/
		className: React.PropTypes.string,
		/**
		* 样式
		*/
		style: React.PropTypes.object,
	}

	constructor(props) {
		super(props)
	}


	render() {


		return (
        <div className="calendar-day-display">
          <span>日</span>
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span>六</span>
        </div>
		);

	}


}
