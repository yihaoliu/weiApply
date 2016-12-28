import React from 'react';
import {dateStr2Obj, obj2DateStr, date2DateStr} from './util/date';
import {WEEK_LABEL, MONTH_LABEL} from './util/constants';

import './index.less';

const Calender = React.createClass({
    getInitialState() {
        const {year, month, day, value} = this.initDate();
        return {year, month, day, value, showYear: false, showMonth: false,items:this.props.items}
    },

	componentWillReceiveProps(nextProps){
        const {year, month, day} = dateStr2Obj(nextProps.value, this.dateParams());
        const value = obj2DateStr(year, month, day);
		const items = nextProps.items;

        this.setState({
			year,
			month,
			day,
			value,
			items
		}); 
	},

    initDate(date=this.props.value){
        const {year, month, day} = dateStr2Obj(date, this.dateParams());
        const value = obj2DateStr(year, month, day);
        return {year, month, day, value}
    },

    handleClick(date){
        const value = date2DateStr(date);
        this.setState({
            value,
        });
        if (this.props.onChange) this.props.onChange(value)
    },

    dateParams(){
        const {begin, end} = this.props;
        return { begin, end };
    },

    handlePreMonth(){
        let {month, year} = this.state;
        if (month - 1 <= 0) {
            this.setState({ month: 12, year: year - 1 });
        } else {
            this.setState({  month: month - 1 });
        }
    },

    handleNextMonth(){
        let {month, year} = this.state;
        if (month + 1 > 12) {
            this.setState({ month: 1, year: year + 1 });
        } else {
            this.setState({ month: month + 1 });
        }
    },

    renderDisplay(){
        let { year: displayY, month: displayM, day: displayD} = dateStr2Obj(this.state.value);
        let displayW = WEEK_LABEL[new Date(displayY, displayM - 1, displayD).getDay()];

        return <div className="_label">
                    <a href="javascript:;" className="_year" onClick={this.pickYear}>{displayY}</a>
                    <p className="_date">
                        <span>{displayW}, </span>
                        <a href="javascript:;" onClick={this.pickMonth}>
                            {displayM}月 {displayD}日
                        </a>
                    </p>
                </div>
    },

    handleYearPickerClick(year){
        this.setState({
            year,
            showYear: false,
        });
    },

    handleMonthPickerClick(month){
        this.setState({
            month,
            showMonth: false, 
        });
    },

    handlePreYearRange(){
        this.setState({
            year: this.state.year - 12,
        });
    },

    handleNextYearRange(){
        this.setState({
            year: this.state.year + 12,
        });
    },

    pickYear(){
        this.setState({
            showYear: true,
            showMonth: false,
        });
    },

    pickMonth(){
        this.setState({
            showMonth: true, 
            showYear: false,
        });
    },

    renderMonthPicker(){
        const {showMonth, year, month} = this.state;
        let monthNodes = showMonth ? 
                        <div className="_month-picker">
                            <div className="_picker-label">
                                <div className="_link">
                                    <span onClick={this.pickYear}>{year}年 </span>
                                    <span>{month}月</span>
                                </div>
                            </div>
                            <ul>
                                {MONTH_LABEL.map((label, index) => {
                                    return (<li key={`month-picker-${index + 1}`}>
                                                <a href="javascript:;" 
                                                    onClick={() => this.handleMonthPickerClick(index + 1)}>
                                                    {label}
                                                </a>
                                            </li>)
                                })}
                            </ul>
                        </div>
                        : null;

        return monthNodes;
    },

    renderYearPicker(){
        const { year, showYear } = this.state;
        const beginY = year - 6;
        const endY = year + 5;

        let yearRangeNodes = [];
        for (let i = beginY; i < endY; i++) {
            let active = year === i ? '_active' : '';
            let isDisabled = i < 1900 ? '_disabled' : '';
            let yearItem = isDisabled ? 
                    <a href="javascript:;" className={isDisabled}>{i}</a>
                    : <a href="javascript:;" className={active} onClick={() => this.handleYearPickerClick(i)}>{i}</a>

            yearRangeNodes.push(<li key={`year-picker-${i}`}>
                                    {yearItem}
                                </li>)
        }
        let yearPickerNodes = showYear ? 
                            <div className="_year-picker">
                                <div className="_picker-label">
                                    <a href="javascript:;" className="_nav _pre" onClick={() => this.handlePreYearRange(beginY)}>
                                        <i></i>
                                    </a>
                                    <div className="_link">
                                        <span>{beginY} ~ {endY}</span>
                                    </div>
                                    <a href="javascript:;" className="_nav _next" onClick={this.handleNextYearRange}>
                                        <i></i>
                                    </a>
                                </div>
                                <ul>
                                    {yearRangeNodes}
                                </ul>
                            </div> 
                           : null;

        return yearPickerNodes;
    },

    renderDayPicker(){
        const TODAY = date2DateStr(new Date());
        const {year, month, value, showYear, showMonth} = this.state;
        const dateCount = new Date(year, month, 0).getDate();
        const index = new Date(year, month - 1, 1).getDay();
        let matrixNodes = [[]];
        let { begin, end,items } = this.props;

		items = items.map(function(item){
				if(item.createAt){
					return +new Date(item.createAt.split('-').join());
			 	}
		});

        for(let i = 0; i < dateCount + index; i ++){
            if (i < index) {
                matrixNodes[0].push(<td key={`canlender-col-${i}`}></td>);
            } else {
                const _index = i - index + 1;
                const row = Math.floor(i / 7);
                const itemDateStr = obj2DateStr(year, month, _index);
                if (!matrixNodes[row]) matrixNodes[row] = [];
                
                let isDisabled = itemDateStr < begin || itemDateStr > end;
                const itemVal = new Date(itemDateStr.split('-').join(','));

                matrixNodes[row].push(<td key={`canlender-col-${i}`} data-value={value} data-item={itemDateStr}>
                                        <Calender.Item active={value == itemDateStr && !isDisabled} 
                                            disabled={isDisabled} isToday={TODAY == itemDateStr} 
                                            onClick={this.handleClick} value={itemVal} label={_index} mark={items.indexOf(+new Date(itemVal.getTime()))!==-1}/>
                                      </td>)
            }
        }

        let dayNodes = showYear || showMonth ? null 
                        : <div className="_day-picker">
                            <div className="_picker-label">
                                <a href="javascript:;" className="_nav _pre" onClick={this.handlePreMonth}>
                                    <i></i>
                                </a>
                                <div className="_link">
                                    <span className="_year-link" onClick={this.pickYear}> {year} </span>
                                    <span>年 </span>
                                    <span className="_month-link" onClick={this.pickMonth}> {month} </span>
                                    <span>月</span>
                                </div>
                                <a href="javascript:;" className="_nav _next" onClick={this.handleNextMonth}>
                                    <i></i>
                                </a>
                            </div>
                            <table>
                                <tbody>
                                    <tr className="_week">
                                        <td>日</td>
                                        <td>一</td>
                                        <td>二</td>
                                        <td>三</td>
                                        <td>四</td>
                                        <td>五</td>
                                        <td>六</td>
                                    </tr>
                                    {matrixNodes.map((n, i) => {
                                        return  <tr key={`canlender-row-${i}`}>
                                                    {n}
                                                </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>;

        return dayNodes;
    },

    render() {
        return (
            <div className="ui calender">
                {this.renderDisplay()}
                {this.renderYearPicker()}
                {this.renderMonthPicker()}
                {this.renderDayPicker()}
            </div>
        );
    }
});


Calender.Item = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func,
		mark:React.PropTypes.bool
    },
    handleClick(value){
        if (!this.props.disabled) this.props.onClick(value);
    },

    render() {
        let {value, disabled, active, isToday,mark} = this.props;
        let className = ['_day'];
        if (isToday) className.push('_today');
        if (disabled) className.push('_disabled');
        if (active) className.push('_active');
        if (mark) className.push('_mark');
        className = className.join(' ');
        return (
            <a href="javascript:;" className={className} 
                onClick={() => this.handleClick(value)}  data-value={this.props.value}>
                {this.props.label}
            </a>
        );
    }
});


module.exports = Calender;
