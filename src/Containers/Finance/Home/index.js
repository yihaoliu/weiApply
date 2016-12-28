import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import {
	DatePicker,
	Form,
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	DotTitle,
	BraceWidth,
	SelfAdaption,
	LineText,
	SplitLine,
} from 'kr-ui';

import LocationMap from 'kr-ui/Global/LocationMap';

import {
	List,
	ListItem
} from 'material-ui/List';

import './index.less';

export default class Undefined extends Component {

	static defaultProps = {
		page: 1,
	}

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
	}

	constructor(props, context) {
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {

	}

	onSubmit(values) {

	}

	render() {

		let initialValues = {
			age: ''
		}

		return (

			    <div className='ui-labelText'>
					
       
				</div>	
		);

	}

}
