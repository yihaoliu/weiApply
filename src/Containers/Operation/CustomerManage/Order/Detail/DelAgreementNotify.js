import React, {
	Component,
	PropTypes
} from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	DotTitle,
	ListGroup,
	ListGroupItem
} from 'kr-ui';


export default class DelAgreementNotify extends Component {



	constructor(props, context) {
		super(props, context);

	}

	render() {

		let {
			onSubmit,
			onCancel
		} = this.props;

		return (

			<div>
				<div style={{textAlign:'center',marginTop:50}}>是否删除该入驻协议书合同？</div>


				<Row style={{marginTop:50,marginBottom:10}}>
					<Col md={12} align="center">
						<ListGroup>
							<ListGroupItem style={{marginRight:20}}> <Button  label="确定" type="button"  height={34} onTouchTap={onSubmit}/></ListGroupItem>
							<ListGroupItem> <Button  label="取消" type="button" height={32} cancle={true} onTouchTap={onCancel}/></ListGroupItem>
						</ListGroup>
					</Col>
					</Row>

		 </div>);
	}
}