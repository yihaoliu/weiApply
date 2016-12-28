import React, {
	Component,
	PropTypes
} from 'react';
import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';

import {
	Dialog,
	Section,
	Grid,
	Notify,
	BreadCrumbs,
	Title,
} from 'kr-ui';

import NewCreateForm from './NewCreateForm';
import './index.less';

export default class JoinCreate extends Component {


	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}

	constructor(props, context) {
		super(props, context);

		this.onCreateSubmit = this.onCreateSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.state = {
			stationVos: [],
			initialValues: {},
			optionValues: {},
			formValues: {},
			openConfirmCreate: false
		}

		this.isConfirmSubmiting = false;

		Store.dispatch(reset('joinEditForm'));
	}

	onCreateSubmit(formValues) {

		if (this.isConfirmSubmiting) {
			return;
		}

		let {
			params
		} = this.props;

		var _this = this;
		Store.dispatch(Actions.callAPI('addOrEditEnterContract', {}, formValues)).then(function(response) {

			_this.isConfirmSubmiting = false;
			Notify.show([{
				message: '更新成功',
				type: 'success',
			}]);

			window.setTimeout(function() {
				window.location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/join/" + response.contractId + "/detail";
			}, 0);


		}).catch(function(err) {
			_this.isConfirmSubmiting = false;
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}


	onCancel() {
		let {
			params
		} = this.context;
		window.location.href = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
	}

	componentDidMount() {

		var _this = this;
		const {
			params
		} = this.props;
		let initialValues = {};
		let optionValues = {};
		let stationVos = [];

		Store.dispatch(Actions.callAPI('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1
		})).then(function(response) {

			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;

			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'ENTER';

			optionValues.fnaCorporationList = response.fnaCorporation.map(function(item, index) {
				item.value = item.id;
				item.label = item.corporationName;
				return item;
			});

			optionValues.paymentList = response.payment.map(function(item, index) {
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});

			optionValues.payTypeList = response.payType.map(function(item, index) {
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});

			optionValues.floorList = response.customer.floor;
			optionValues.customerName = response.customer.customerName;
			optionValues.leaseAddress = response.customer.customerAddress;
			optionValues.communityName = response.customer.communityName;
			optionValues.communityId = response.customer.communityid;
			optionValues.mainbillCommunityId = response.mainbillCommunityId || 1;


			Store.dispatch(Actions.callAPI('show-checkin-agreement', {
				id: params.id
			})).then(function(response) {

				optionValues.lessorContactName = response.lessorContactName;
				optionValues.contractFileList = response.contractFileList;

				initialValues.id = response.id;
				initialValues.leaseId = response.leaseId;
				initialValues.contractcode = response.contractcode;
				initialValues.leaseAddress = response.leaseAddress;
				initialValues.lessorContactid = response.lessorContactid;
				initialValues.lessorContactName = response.lessorContactName;
				initialValues.lessorContacttel = response.lessorContacttel;

				initialValues.leaseContact = response.leaseContact;
				initialValues.leaseContacttel = response.leaseContacttel;
				initialValues.paytype = response.payType.id;
				initialValues.paymodel = response.payment.id;

				initialValues.stationnum = response.stationnum;
				initialValues.boardroomnum = response.boardroomnum;
				initialValues.wherefloor = response.wherefloor;
				initialValues.rentaluse = response.rentaluse;
				initialValues.contractmark = response.contractmark || '';
				initialValues.totalrent = response.totalrent;
				initialValues.totaldeposit = response.totaldeposit;

				//时间
				initialValues.firstpaydate = response.firstpaydate;
				initialValues.signdate = response.signdate;
				initialValues.leaseBegindate = response.leaseBegindate;
				initialValues.leaseEnddate = response.leaseEnddate;

				//处理stationvos
				stationVos = response.stationVos;

				_this.setState({
					initialValues,
					optionValues,
					stationVos
				});

			}).catch(function(err) {
				Notify.show([{
					message: '后台出错请联系管理员',
					type: 'danger',
				}]);
			});


		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员',
				type: 'danger',
			}]);
		});
	}


	render() {

		let {
			initialValues,
			optionValues,
			stationVos
		} = this.state;

		return (

			<div>
			<Title value="编辑入驻协议书_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','入驻协议']}/>
			<Section title="入驻协议书" description="">
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos}/>
			</Section>
		</div>
		);
	}
}