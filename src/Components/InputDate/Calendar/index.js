import React, {
	Component
} from 'react';

import ReactDOM from 'react-dom';

import CalendarInput from '../CalendarInput';
import CalendarDayDisplay from '../CalendarDayDisplay';
import CalendarMonthDate from '../CalendarMonthDate';
import CalendarToolbar from '../CalendarToolbar';
import CalendarYearSelector from '../CalendarYearSelector';
import CalendarMonthSelector from '../CalendarMonthSelector';

export default class Calendar extends React.Component {

	static displayName = 'Calendar';

	static defaultProps = {
		value:'2016-12-7'
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
    open:React.PropTypes.bool,
		onChange:React.PropTypes.func,
		value:React.PropTypes.any,
	}

	static contextTypes =  {
		openCalendarDialog: React.PropTypes.func.isRequired
	}
		static childContextTypes =  {
	          onSelectedYear: React.PropTypes.func.isRequired,
						onSelectedMonth: React.PropTypes.func.isRequired,
						onSelectedDate: React.PropTypes.func.isRequired,
						onPrevMonth:React.PropTypes.func.isRequired,
						onNextMonth:React.PropTypes.func.isRequired,
					  onSetDate:React.PropTypes.func.isRequired,

	  }

		getChildContext() {
					return {
						onSelectedDate:this.onSelectedDate,
						onSelectedYear:this.onSelectedYear,
						onSelectedMonth:this.onSelectedMonth,
						onPrevMonth:this.onPrevMonth,
						onNextMonth:this.onNextMonth,
						onSetDate:this.onSetDate,
					};
		}


	constructor(props) {
		super(props)

		this.state = {
			year:this.props.year,
			month:this.props.month,
			date:this.props.date,
			openYearSelector:false,
			openMonthSelector:false,
		}

	}

	componentDidMount(){
		let {value} = this.props;
		this.setInitValue(value);

		var ele = ReactDOM.findDOMNode(this);
		var position = {};
		var winWidth = window.innerWidth;
		if(ele.getClientRects().length){
				position = ele.getBoundingClientRect();
		}

		if(position && position.right && position.right>winWidth){
			ele.style.right = '0px';
			ele.style.left = 'auto';
		}

	}

	componentWillReceiveProps(nextProps) {
			if(nextProps.value !== this.props.value){
				this.setInitValue(nextProps.value);
			}
	}

	setInitValue = (value)=>{

		let year;
		let month;
		let date;
		let valueArr = [];

		if(!value){
				var nowDate = new Date();
				value = `${nowDate.getFullYear()}-${nowDate.getMonth()+1}-${nowDate.getDate()}`;
		}

	if(!isNaN(value)){

			var nowTime = new Date(value);

			valueArr.push(nowTime.getFullYear());
			valueArr.push(nowTime.getMonth());
			valueArr.push(nowTime.getDate());

		}

		if(typeof value === 'string' && value.indexOf('-')!==-1){
			valueArr = value.split('-');
		}

		if(typeof value === 'string' && value.indexOf('/')!==-1){
			valueArr = value.split('/');
		}

		year = valueArr[0];
		month = valueArr[1];
		date = valueArr[2];
		date = date.split(' ').shift();

		this.setState({
			year,
			month,
			date,
		});

	}

	onSetDate = (year,month,date)=>{
			this.setState({
					year,
					month,
					date
			});
	}

	onNextYear = ()=>{
			let {year} = this.state;
			year++;
			this.setState({
					year
			});
	}

	onPrevYear = ()=>{
		let {year} = this.state;
		year--;
		this.setState({
				year
		});
	}

	onNextMonth = ()=>{
			let {year,month} = this.state;
			month++;
			if(month>12){
					this.onNextYear();
					month = 1;
			}
			this.setState({
				month
			});
	}

	onPrevMonth = ()=>{
			let {month} = this.state;
			month--;
			if(month<1){
					this.onPrevYear();
					month = 12;
			}
			this.setState({
				month
			});
	}

	onSelectedYear = (year)=>{
		this.setState({
				year,
				openYearSelector:false
			});
	}

	openYearSelectorDialog = ()=>{
		this.setState({
				openYearSelector:!this.state.openYearSelector
			});
	}

	openMonthSelectorDialog =()=>{
		this.setState({
				openMonthSelector:!this.state.openMonthSelector
		});
	}


	onSelectedMonth = (month)=>{
		this.setState({
				month,
				openMonthSelector:false
			});
	}

	onSelectedDate = (date)=>{
			this.setState({date});
			const {onChange} = this.props;
			let {year,month} = this.state;
			onChange && onChange(year+'-'+month+'-'+date);
			let {openCalendarDialog} = this.context;
			openCalendarDialog && openCalendarDialog();
	}

	render() {


		let {year,month,date,openYearSelector,openMonthSelector} = this.state;

		return (
				<div className="calendar-wrap">
				<div className="calendar  animated slideInDown" style={{'animationDuration':'0.2s'}}>

					<CalendarInput year={year} month={month} date={date} />
					<CalendarToolbar year={year} month={month} openYearSelectorDialog={this.openYearSelectorDialog} openMonthSelectorDialog={this.openMonthSelectorDialog}/>
					<CalendarDayDisplay />
          {year && month && date && <CalendarMonthDate year={year} month={month} date={date} />}

					{openYearSelector && <CalendarYearSelector onSelected={this.onSelectedYear} year={year}/> }
					{openMonthSelector && <CalendarMonthSelector onSelected={this.onSelectedMonth} month={month}/>}
				</div>
				</div>
		);

	}


}
