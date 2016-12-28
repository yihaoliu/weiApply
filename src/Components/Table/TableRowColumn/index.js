import React from 'react';

import KrDate from '../../KrDate';

export default class TableRowColumn extends React.Component {

	static displayName = 'TableRowColumn';

	static propTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		columnNumber: React.PropTypes.number,
		hoverable: React.PropTypes.bool,
		onCellClick: React.PropTypes.func,
		onHover: React.PropTypes.func,
		onHoverExit: React.PropTypes.func,
		style: React.PropTypes.object,
		name: React.PropTypes.string,
		value: React.PropTypes.string,
		options: React.PropTypes.array,
		type: React.PropTypes.string,
		format: React.PropTypes.string,
		onFormatData:React.PropTypes.func,
		component: React.PropTypes.func,
	}

	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.onFormatData = this.onFormatData.bind(this);

	}

	onClick(event) {

		if (event.target.nodeName.toLowerCase() != 'td' || event.target.nodeName.toLowerCase() == 'input') {
			return null;
		}

		if (this.props.onCellClick) {
			this.props.onCellClick(event, this.props.columnNumber);
		}
	}

	onMouseEnter(event) {
		if (this.props.onHover) {
			this.props.onHover(event, this.props.columnNumber);
		}
	}

	onMouseLeave(event) {
		if (this.props.onHoverExit) {
			this.props.onHoverExit(event, this.props.columnNumber);
		}
	}


	onFormatData(value){

		const {onFormatData} = this.props;

		if(typeof onFormatData === 'function'){
				value = onFormatData(value);
		}

		return value;

	}


	renderValue = ()=>{

		let { value, options, component ,itemData} = this.props;

		let oldValue = value;

		//处理数据格式
		value = this.onFormatData(value);

		if (options && options.length) {
			options.map(function(item, index) {
				if (item.value == value) {
					value = item.label;
				}
			});
		}

		if(typeof component === 'function'){
		 	return component(value,oldValue,itemData);
		}

		return value;

	}



	render() {

		let {
			children,
			className,
			columnNumber,
			style,
			name,
			value,
			type,
			itemData,
			options,
			format,
			...other,
		} = this.props;

		const handlers = {
			onClick: this.onClick,
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseLeave,
		};

		if (name) {

			if (type == 'date') {
				return (
					<td className={className} style={style} {...handlers} {...other}>
						<KrDate value={this.renderValue()} format={format} />
					</td>
				);
			}
			return (
				<td className={className} style={style} {...handlers} {...other}>
						{this.renderValue()}
					</td>
			);

		}

		if (type == 'operation') {

			var operationElement = [];

			React.Children.map(children, (child) => {
				if (!React.isValidElement(child)) return;

				let {
					hidden
				} = child.props;

				if (hidden) {
					hidden = !!itemData[hidden];
				}

				let newChild = React.cloneElement(child, {
					hidden
				});
				operationElement.push(newChild);
			});

			return (
				<td className={className} style={style} {...handlers} {...other}>
					{operationElement}
				</td>
			);
		}


		return (
			<td className={className} style={style} {...handlers} {...other}>
				{children}
			</td>
		);


	}
}
