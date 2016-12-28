import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';
import {reduxForm,formValueSelector} from 'redux-form';

import {
	KrField,
	LabelText,
	Section,
	BreadCrumbs,
	Grid,
	Row,
	Col,
	Notify,
	Loading,
	Button,
	Dialog,
	Snackbar,
	ListGroup,
	ListGroupItem,
	Title,
} from 'kr-ui';

let OrderCreateForm = function(props){

  	const { error, handleSubmit, pristine, reset, submitting,communitys,cityName,onSubmit,value} = props;
  	let customerName = (value && value.customerName) || '';
  	let mainbillname = (value && value.mainbillname) || '';
  	let reload = function(){
  		window.top.location.reload();
  	}
  	let Order = [
  		{value:'',label:'请选择类型'},
  		{value:'STATION',label:'工位订单'}
  	]

	return (
			<form onSubmit={handleSubmit(onSubmit)} style={{padding:'20'}}>

				<KrField name="customerName" grid={1/1} component="labelText" type="text" label="客户名称"  disabled={true} inline={false} value={customerName}/>
				 <KrField name="mainbilltype" right={30} grid={1/2} component="select" label="订单类型" requireLabel={true} inline={false} options={Order}>
				 </KrField>
				 <KrField name="communityid" left={30} grid={1/2} component="select" label="所在社区" requireLabel={true} inline={false} options={communitys}>
				 </KrField>
				<KrField  label="所在城市" right={30} grid={1/2} component="labelText" value={cityName||'无'}  inline={false}/>
			 	<KrField name="mainbillname" left={30} grid={1/2} type="text" component="labelText" label="订单名称" requireLabel={true} inline={false} value={mainbillname}/>
			    <KrField name="mainbilldesc" component="textarea" label="订单描述" inline={false} maxSize={200}/>

				<Grid>

				<ListGroup>
					<ListGroupItem style={{width:'45%',textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" joinEditForm disabled={submitting} /></ListGroupItem>
					<ListGroupItem style={{width:'45%',textAlign:'left',paddingLeft:15}}><Button  label="取消" cancle={true} type="button" joinEditForm disabled={submitting} onClick={reload} /></ListGroupItem>
				</ListGroup>
				</Grid>


		</form>
	);

}


class OrderCreate extends Component {

	constructor(props,context){
		super(props, context);

		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.back = this.back.bind(this);


		this.isOk = false;

		this.state = {
			open:false,
			loading:true
		}


		const validate = values =>{
			 const errors = {}

			if(!values.mainbilltype){
				errors.mainbilltype = '请选择订单类型';
			  }else if (!values.communityid) {
				errors.communityid = '请选择所在社区';
			  }else if(!values.mainbillname){
				errors.mainbillname = '订单名称不能为空';
			  }
			  return errors
		}

		const {initialValues} =this.props;

		OrderCreateForm= reduxForm({
			form: 'orderCreateForm',
			initialValues,
			validate,
		})(OrderCreateForm);

	}

	componentDidMount(){

		var obj = document.body;
		obj.style.background='#fff';
		var {actions} = this.props;
		var _this = this;

		const closeAll = this.props.location.query.closeAll;

		if(closeAll){
			actions.switchSidebarNav(false);
			actions.switchHeaderNav(false);
		}


		actions.callAPI('community-city-selected',{},{}).then(function(communitys){
			communitys = communitys.map((item)=>{
		  		item.value = item.communityId;
		  		item.label = item.communityName;
		  		return item;
		  	})
		}).catch(function(err){ });

		actions.callAPI('get-customName-orderName',{
			customerId:this.props.params.customerId
		},{}).then(function(response){
			_this.setState({
				value:response
			})
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});

		setTimeout(function(){
			_this.setState({
				loading:false
			});
		},0);

	}

	componentWillReceiveProps(nextProps){
	}

	confirmSubmit(values){

		var {actions} = this.props;
		values.customerid = this.props.params.customerId;

		if(this.isOk){
			return false;
		}

		this.isOk = true;


		var _this = this;

		actions.callAPI('enter-order',{},values).then(function(response){

			Notify.show([{
				message:'创建成功',
				type: 'success',
			}]);

			window.setTimeout(function(){
				window.top.location.reload();
				_this.isOk = false;
			},0);

		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);

			window.setTimeout(function(){
				_this.isOk = false;
			},0);

		});

	}

	back(){

	}


  render() {


  	if(this.state.loading){
  		return(<Loading/>);
  	}
  	let {value} = this.state;

    return (

      <div>

			<BreadCrumbs children={['运营平台','财务管理','新增客户订单']} hide={!!this.props.location.query.closeAll}/>

			<Section title="新增客户订单" description="" hide={!!this.props.location.query.closeAll}>
				<OrderCreateForm onSubmit={this.confirmSubmit} communitys={this.props.communitys} cityName={this.props.cityName} initialValues={this.props.initialValues} value={value}/>
			</Section>

	 </div>
	);
  }
}


const selector = formValueSelector('orderCreateForm');

function mapStateToProps(state){

  const communityid = selector(state, 'communityid');
	const initialValues = state.common['get-customName-orderName'];

	let communitys = state.common['community-city-selected'];

	if(Object.prototype.toString.call(communitys) !== '[object Array]'){
		communitys = [];
	}

	let cityName = '';
	communitys.map(function(item){
		if(item.communityId == communityid){
			cityName = item.cityName;
		}
	});

	let customerName = initialValues && initialValues.customerName;


	return {
		cityName,
		communitys,
		customerName,
		initialValues
	};

}


export default connect(mapStateToProps)(OrderCreate);
