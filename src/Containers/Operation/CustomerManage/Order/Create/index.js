import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect,
	Store,
	Actions
} from 'kr/Redux';

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
	ListGroupItem
} from 'kr-ui';

import OrderEditForm from './OrderEditForm';


export default class OrderCreate extends Component {

	static contextTypes = {
		params: React.PropTypes.object.isRequired,

	}
	constructor(props, context) {
		super(props, context);


		this.isOk = false;


		this.state = {
			loading: true,
			communityOptions: [],
			initialValues: {},
			orderTypeOptions: [{
				value: '',
				label: '请选择类型'
			}, {
				value: 'STATION',
				label: '工位服务订单'
			}, {
				value: 'INCUBAZION',
				label: '孵化订单'
			}, {
				value: 'REGISTER',
				label: '注册订单'
			}, {
				value: 'INCUSTOM',
				label: '场内消费订单'
			}, {
				value: 'ACTIVITY',
				label: '广告订单'
			}, {
				value: 'ADDEDSERVICE',
				label: '增值服务订单'
			}, {
				value: 'TRAINING',
				label: '培训订单'
			}, {
				value: 'OTHER',
				label: '其他服务订单'
			}]

		}
		Store.dispatch(Actions.switchSidebarNav(false));
		Store.dispatch(Actions.switchHeaderNav(false));

	}

	componentDidMount() {
		var obj = document.body;
		obj.style.background = '#fff';
		this.getInitValues();


	}
	onSubmit = (values) => {

		if (this.isOk) {
			return false;
		}

		this.isOk = true;
		values.customerid = this.context.params.customerId;

		var _this = this;

		Store.dispatch(Actions.callAPI('enter-order', {}, values)).then(function(response) {

			Notify.show([{
				message: '保存成功',
				type: 'success',
			}]);

			window.setTimeout(function() {
				window.top.location.reload();
				_this.isOk = false;
			}, 100);

		}).catch(function(err) {

			Notify.show([{
				message: '创建失败',
				type: 'danger',
			}]);

			window.setTimeout(function() {
				_this.isOk = false;
			}, 0);

		});

	}
	onCancel = () => {
		window.top.location.reload();
	}

	componentWillReceiveProps(nextProps) {}
	getInitValues = () => {
		var _this = this;
		let communityOptions = [];
		let initialValues = {};

		let orderTypeOptions = [];
		Store.dispatch(Actions.callAPI('community-city-selected')).then(function(response) {
			communityOptions = response.communityCity.map((item) => {
				item.value = String(item.communityId);
				item.label = item.communityName;
				return item;
			});

			orderTypeOptions = response.sysDicPayments.map((item) => {
				item.value = String(item.id);
				item.label = item.dicName;
				return item;
			});

			_this.setState({
				communityOptions: communityOptions,
				orderTypeOptions: orderTypeOptions
			})
		}).catch(function(err) {});


		Store.dispatch(Actions.callAPI('get-customName-orderName', {
			customerId: this.props.params.customerId
		}, {})).then(function(response) {

			let initialValues = {};
			initialValues = response;
			initialValues.communityid = String(initialValues.communityid);
			_this.setState({
				initialValues,
				loading: false
			})
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}


	render() {


		if (this.state.loading) {
			return (<Loading/>);
		}
		let {
			initialValues,
			communityOptions,
			orderTypeOptions
		} = this.state;



		return (

			<OrderEditForm onSubmit={this.onSubmit} communityOptions={communityOptions} initialValues={initialValues} orderTypeOptions={orderTypeOptions} onCancel={this.onCancel}/>


		);
	}
}


// const selector = formValueSelector('orderEditForm');

// function mapStateToProps(state){

// 	let communitys = state.common['community-city-selected'];

// 	if(Object.prototype.toString.call(communitys) !== '[object Array]'){
// 		communitys = [];
// 	}

// 	const communityid = selector(state, 'communityid');

// 	let cityName = '';
// 	communitys.map(function(item){
// 		if(item.communityId == communityid){
// 			cityName = item.cityName;
// 		}
// 	});

// 	return {
// 		cityName,
// 		initialValues:state.common['get-simple-order'],
// 		communitys,
//    	};
// }



// export default connect(mapStateToProps)(OrderCreate);

// }

