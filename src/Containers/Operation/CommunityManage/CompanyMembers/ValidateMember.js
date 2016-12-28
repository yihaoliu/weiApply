import React, {
	Component,
	PropTypes
} from 'react';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';


import {
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	KrDate,
	DotTitle,
	ButtonGroup,
	Paper,
	ListGroup,
	ListGroupItem,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'kr-ui';

export default class ValidateMember extends Component {
	static propTypes = {
		initialValues:React.PropTypes.object,
		communityOptions:React.PropTypes.array,
		orderTypeOptions:React.PropTypes.array,
	}

	constructor(props, context) {
		super(props, context);
	}

	onSubmit=()=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit();
	}
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}





	render() {
		// console.log('seleced',this.props.seleced);
		let {seleced} = this.props;
		// seleced.forEach((item,index)=>{
		// 	if(item.checkStatus){
		// 		seleced.splice(index, 1)
		// 	}
		// })



		return (
			<div className='validate-member' style={{marginTop:20}}>
				<div style={{padding:'0 50px'}}>
					<span>发送验证短信：</span>
					<span className="make-sure">（请确认成员手机号码是否正确，验证单人一天最多发一次）</span>
				</div>
				<div className="table-div" style={{margin:'20px 0',border:'1px solid #f2f2f2',padding:'20px 0'}}>
				<div style={{margin:'10px 40px',border:'1px solid #f2f2f2',borderRadius:'4px',overflow:'hidden',borderTop:'none'}}>
					<Table displayCheckbox={false} style={{marginTop:0}}>
						<TableHeader>
								<TableHeaderColumn>姓名</TableHeaderColumn>
								<TableHeaderColumn>手机号</TableHeaderColumn>
								<TableHeaderColumn>工位号</TableHeaderColumn>
								<TableHeaderColumn>邮箱</TableHeaderColumn>
								<TableHeaderColumn>职位</TableHeaderColumn>
						</TableHeader>
						<TableBody>
							{
								seleced.length && seleced.map((item,index)=>{
										return (
											<TableRow key={index} displayCheckbox={false}>
												<TableRowColumn>{item.name}</TableRowColumn>
												<TableRowColumn>{item.phone}</TableRowColumn>
												<TableRowColumn> {item.id}</TableRowColumn>
												<TableRowColumn>{item.email}</TableRowColumn>
												<TableRowColumn>{item.jobName}</TableRowColumn>
											</TableRow>
										);
							})}
					   </TableBody>
					</Table>
				</div>
				</div>

				<div className="demo-info" style={{padding:'0 50px'}}>
					<span className="demo-title">当前短信模板：</span>
					<span>［氪空间］＃对方姓名＃，＃公司名称＃，入驻氪空间，氪空间邀您关注公众号“氪空间” 进行注册，补全个人信息，以便顺利办理入驻。</span>
				</div>
				<Grid style={{marginBottom:20,marginLeft:50}}>
					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'270px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="button"  onTouchTap={this.onSubmit} width={90} height={34}/></ListGroupItem>
							<ListGroupItem style={{width:'270px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} width={90} height={34}/> </ListGroupItem>
						</ListGroup>
					  </Row>
				</Grid></div>
)
	}
}
