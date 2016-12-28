import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';
import {
	bindActionCreators
} from 'redux';
import {
	Actions,
	Store
} from 'kr/Redux';
import dateFormat from 'dateformat';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	KrField,
	ListGroup,
	ListGroupItem,
	Message,
} from 'kr-ui';
class SearchDateForm extends Component{
	constructor(props, context) {
		super(props, context);
	}
	render(){
		return (
						<form style={{display:'inline-block',marginTop:10,float:'right'}}>
						<ListGroup style={{width:'610'}}>
						<ListGroupItem style={{textAlign:'center',padding:0}}><span style={{display:'inline-block',lineHeight:'58px'}}>注册时间:</span></ListGroupItem>
							<ListGroupItem style={{padding:0}}>
									<KrField name="leaseBegindate"  component="date" onChange={this.props.onStartChange} style={{width:'252'}} simple={true}/>
							</ListGroupItem>
							<ListGroupItem style={{textAlign:'center',padding:0,marginLeft:'10'}}><span style={{display:'inline-block',lineHeight:'58px'}}>至</span></ListGroupItem>
							<ListGroupItem style={{padding:0}}>
									<KrField name="leaseendTime" component="date" onChange={this.props.onEndChange}  style={{width:'252'}} simple={true}/>
							</ListGroupItem>
						</ListGroup>
						</form>
		)
	}
}
SearchDateForm = reduxForm({
	form: 'searchDateForm'
})(SearchDateForm);
export default class PersonalBehavior extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	static defaultProps = {
	}
	static PropTypes = {
		displayCheckbox: false,
	}
	constructor(props, context) {
		super(props, context);
		this.onLoaded = this.onLoaded.bind(this);
		this.state = {
			searchParams:{
				 page:1,
				 pageSize:15,
				 memberId:this.context.router.params.memberId
			}
		}
	}
	onStartChange=(startTime)=>{
		let {searchParams}=this.state;
			let start=Date.parse(dateFormat(startTime,"yyyy-mm-dd hh:MM:ss"));
			let end=Date.parse(dateFormat(searchParams.endTime,"yyyy-mm-dd hh:MM:ss"))
			if(searchParams.endTime&&start>end){
				Message.error("结束时间要小于开始时间");
				return ;
			}
		searchParams = Object.assign({}, searchParams, {startTime});
		this.setState({
			searchParams
		});
	}
	onEndChange=(endTime)=>{
		let {searchParams}=this.state;
			let start=Date.parse(dateFormat(searchParams.startTime,"yyyy-mm-dd hh:MM:ss"));
			let end=Date.parse(dateFormat(endTime,"yyyy-mm-dd hh:MM:ss"));
			if(searchParams.startTime&&start>end){
				Message.error("结束时间要小于开始时间");
				return ;
			}
			searchParams = Object.assign({}, searchParams, {endTime});
			this.setState({
				searchParams
			});
	}
	onLoaded(response) {
		// console.log(response,"response");
		let list = response;
		this.setState({
			list
		})
	}
	render() {

		return (
			<div style={{height:'860'}}>
				<div style={{width:'100%',height:75}}>
					<span style={{display:'inline-block',verticalAlign:'top',height:75,lineHeight:'75px',color:'#499df1'}}>Krspace轨迹</span>
					<SearchDateForm onStartChange={this.onStartChange} onEndChange={this.onEndChange}/>
				</div>
				<Table
						displayCheckbox={false}
						ajax={true}
						// onProcessData={(state)=>{
						// 	return state;
						// 	}}
						onLoaded={this.onLoaded}
						ajaxFieldListName='items'
						ajaxUrlName='getPersonalBehavior'
						ajaxParams={this.state.searchParams}
						style={{marginTop:0}}
					>
						<TableHeader>
								<TableHeaderColumn>时间</TableHeaderColumn>
								<TableHeaderColumn>地点</TableHeaderColumn>
								<TableHeaderColumn>行为</TableHeaderColumn>
								<TableHeaderColumn>结果</TableHeaderColumn>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableRowColumn name="optTime" ></TableRowColumn>
								<TableRowColumn name="address" ></TableRowColumn>
								<TableRowColumn name="action" ></TableRowColumn>
								<TableRowColumn name="result" ></TableRowColumn>
							 </TableRow>
						</TableBody>
						<TableFooter></TableFooter>
				</Table>
			</div>
		)
	}
}
