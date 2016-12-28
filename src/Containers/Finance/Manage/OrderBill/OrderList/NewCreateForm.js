import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	ListGroup,
	ListGroupItem
} from 'kr-ui';

import './index.less';

class NewCreateForm extends Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.state = {
			mainbilltypeList: []
		}

	}
	componentDidMount() {

		var _this = this;
		Store.dispatch(Actions.callAPI('getMainBillTypeList')).then(function(response) {

			const mainbilltypeList = response.mainbilltypeList

			mainbilltypeList.map(function(item, index) {
				item.label = item.mainBillTypeDesc;
				item.value = item.mainBillTypeValue;
				return item;
			});

			_this.setState({
				mainbilltypeList
			});

		}).catch(function(err) {
			Notify.show([{
				message: '报错了',
				type: 'danger',
			}]);
		});


	}


	onSubmit(values) {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel() {
		const {
			onCancel
		} = this.props;

		onCancel && onCancel();

	}
    onChangeCommunity=(community)=>{
		Store.dispatch(change('newCreateForm','communityid',community.id));
    }
	render() {



		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		return (

			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:34,marginLeft:36}}>

				<KrField grid={1/2} right={39} style={{height:36,marginBottom:28}} name="mainbillname" type="text" label="订单名称"/>
				<KrField grid={1/2}  component="labelText"/>
				<KrField right={39} grid={1/2}  name="communityid" style={{marginTop:'7px'}} component="searchCommunity" label="所属社区" onChange={this.onChangeCommunity}/>
				<KrField  grid={1/2} right={39} name="mainbilltype" type="select" style={{marginTop:7,marginLeft:-10}} label="订单类型" options={this.state.mainbilltypeList}>
				</KrField>
				<KrField grid={1/1}  component="group" label="查询区间" style={{marginTop:3}}>
				<div className='ui-listDate'><ListGroup>
						<ListGroupItem><div className='ui-date-start'><KrField  right={6} style={{marginLeft:-10}} name="startDate" component="date" /></div></ListGroupItem>
						<div className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
						<ListGroupItem><div className='ui-date-end'><KrField  right={6} name="endDate" component="date" /></div></ListGroupItem>
					</ListGroup>
                    </div>
				</KrField>




				<Grid style={{marginTop:7,marginBottom:5,marginLeft:-24}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
			</form>
		);
	}
}
export default reduxForm({
	form: 'newCreateForm'
})(NewCreateForm);
