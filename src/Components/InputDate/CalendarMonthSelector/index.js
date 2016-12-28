import React, {
	Component
} from 'react';


export default class CalendarMonthSelector extends React.Component {

	static displayName = 'CalendarMonthSelector';

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

	onSelected(year){
			const {onSelected} = this.props;
			onSelected && onSelected(year);
	}

	createItem(monthItem){

			let {month} = this.props;
			let handlers = {
				onClick:this.onSelected.bind(this,monthItem)
			};

			let props = {
				key:monthItem,
				className:'item-month'
			}

			if(month == monthItem){
				props.className ='item-month month-active';
			}else{
				props.className ='item-month';
			}
			return React.createElement('div', {...props, ...handlers}, monthItem);
		}

	renderOptions = ()=>{
			var options = [];
			for(var i=1;i<=12;i++){
				options.push(this.createItem(i));
			}
			return options;
		}

	render() {

		return (
				<div className="calendar-month-selector" >
					{this.renderOptions()}
				</div>
		);

	}


}
