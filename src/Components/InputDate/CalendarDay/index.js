import React, {
	Component
} from 'react';


export default class CalendarDay extends React.Component {

	static displayName = 'CalendarDay';

	static propTypes = {
		/**
		*样式class类名
		*/
		className: React.PropTypes.string,
		/**
		* 样式
		*/
		style: React.PropTypes.object,
		value:React.PropTypes.any,
		onClick:React.PropTypes.func,
	}

	constructor(props) {
		super(props)
	}

	onClick = ()=>{
		let {value,onClick} = this.props;
		onClick && onClick(value);
	}

	render() {

		let {value,date} = this.props;

		let classNames = 'calendar-day';

		if(date == value){
				classNames += ' day-active';
		}else {
		   classNames = 'calendar-day';
		}

		return (
				<span className={classNames} onClick={this.onClick}>
						{value}
				</span>
		);

	}


}
