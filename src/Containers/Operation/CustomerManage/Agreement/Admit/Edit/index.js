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
import ConfirmFormDetail from './ConfirmFormDetail';


export default class JoinCreate extends Component {

	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}

	constructor(props, context) {
		super(props, context);

		this.openConfirmCreateDialog = this.openConfirmCreateDialog.bind(this);
		this.onCreateSubmit = this.onCreateSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onConfrimSubmit = this.onConfrimSubmit.bind(this);

		this.state = {
			stationVos: [],
			initialValues: {},
			optionValues: {},
			formValues: {},
			openConfirmCreate: false
		}

		Store.dispatch(reset('admitCreateForm'));

	}

	onCreateSubmit(formValues) {
		this.setState({
			formValues
		});

		var _this = this;

		setTimeout(function() {
			_this.onConfrimSubmit();
		}, 0);
		// this.openConfirmCreateDialog();
	}

	onConfrimSubmit() {
		console.log(this.props, this.props.params);

		let params = this.props.params;
		let {
			formValues
		} = this.state;

		Store.dispatch(Actions.callAPI('updateFinaContractIntentletter', {}, formValues)).then(function(response) {
			Notify.show([{
				message: '更新成功',
				type: 'success',
			}]);
			location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/admit/" + response.contractId + "/detail";

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

		//this.openConfirmCreateDialog();
	}

	onCancel() {
		let {
			params
		} = this.context;
		window.location.href = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
	}

	openConfirmCreateDialog() {
		this.setState({
			openConfirmCreate: !this.state.openConfirmCreate
		});
	}

	componentDidMount() {

		var _this = this;
		const {
			params
		} = this.props
		let initialValues = {};
		let optionValues = {};
		let stationVos = [];

		Store.dispatch(Actions.callAPI('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
		})).then(function(response) {
			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;

			initialValues.signdate = +new Date((new Date()).getTime() - 24 * 60 * 60 * 1000);

			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'INTENTION';

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

			Store.dispatch(Actions.callAPI('showFinaContractIntentletter', {
				id: params.id
			})).then(function(response) {

				initialValues.id = response.id;
				initialValues.leaseId = response.leaseId;
				initialValues.contractcode = response.contractcode;
				initialValues.lessorContactid = response.lessorContactid;
				initialValues.templockday = response.templockday;
				optionValues.contractFileList = response.contractFileList;
				// initialValues.lessorContactid = response.lessorContactid;
				initialValues.leaseAddress = response.leaseAddress;
				initialValues.lessorContactName = response.lessorContactName;
				initialValues.leaseContact = response.leaseContact;
				initialValues.leaseContacttel = response.leaseContacttel;
				initialValues.signdate = response.signdate;
				if (response.payType) {
					initialValues.paytype = response.payType.id;

				}
				if (response.payment) {
					optionValues.payment = response.payment;
					initialValues.paymentId = response.payment.id;

				}
				if (response.boardroomnum) {
					initialValues.boardroomnum = response.boardroomnum;
				}
				initialValues.stationnum = response.stationnum;
				initialValues.wherefloor = response.wherefloor;
				initialValues.contractmark = response.contractmark || '';
				optionValues.lessorContactName = response.lessorContactName;
				initialValues.lessorContacttel = response.lessorContacttel;
				initialValues.totaldownpayment = response.totaldownpayment;

				//时间
				initialValues.leaseBegindate = new Date(response.leaseBegindate);
				initialValues.leaseEnddate = new Date(response.leaseEnddate);
				initialValues.stationVos = response.stationVos;

				//处理stationvos
				stationVos = response.stationVos;

				_this.setState({
					initialValues,
					optionValues,
					stationVos
				});

			}).catch(function(err) {
				console.log(err);
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
			<Title value="编辑承租意向书_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','承租协议']}/>
			<Section title="承租意向书" description="">
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos}/>
			</Section>

			<Dialog
				title="确定新建"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				open={this.state.openConfirmCreate} >
						<ConfirmFormDetail detail={this.state.formValues} onSubmit={this.onConfrimSubmit} onCancel={this.openConfirmCreateDialog} />
			  </Dialog>
		</div>
		);
	}
}
