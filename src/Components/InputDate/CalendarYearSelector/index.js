import React, {
	Component
} from 'react';

import ReactDOM from 'react-dom';


export default class CalendarYearSelector extends React.Component {

	static displayName = 'CalendarYearSelector';

	static propTypes = {
		/**
		*样式class类名
		*/
		className: React.PropTypes.string,
		/**
		* 样式
		*/
		style: React.PropTypes.object,
		value:React.PropTypes.string,
		open:React.PropTypes.bool,
	}

	constructor(props) {
		super(props)
	}

	componentDidMount(){
			var element = ReactDOM.findDOMNode(this);
			element.scrollTop = 53*30;
	}

	onSelected(year){
			const {onSelected} = this.props;
			onSelected && onSelected(year);
	}

	createYearItem(yearItem){

		let {year} = this.props;
		let handlers = {
			onClick:this.onSelected.bind(this,yearItem)
		};

		let props = {
			key:yearItem,
			className:'item-year'
		}

		if(year == yearItem){
			props.className ='item-year year-active';
		}else{
			props.className ='item-year';
		}
		return React.createElement('div', {...props, ...handlers}, yearItem);
	}

	renderYearOptions = ()=>{

		let {year} = this.props;
		var yearOptions = [];
		var i = parseInt(year)-50;
		var maxYear = parseInt(year)+50;
		for(;i<maxYear;i++){
			yearOptions.push(this.createYearItem(i));
		}
		return yearOptions;
	}

	render() {

		return (
				<div className="calendar-year-selector" ref="yearSelector" >
				{this.renderYearOptions()}
				</div>
		);

	}


}
