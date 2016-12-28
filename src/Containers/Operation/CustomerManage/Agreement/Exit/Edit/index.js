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


export default class EditCreate extends Component {

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

    Store.dispatch(reset('exitEditForm'));
  }

  onCreateSubmit(formValues) {
    const {params} = this.props;
    Store.dispatch(Actions.callAPI('addFnaContractWithdrawal', {}, formValues)).then(function(response) {
      Notify.show([{
        message: '编辑成功',
        type: 'success',
      }]);
      location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/exit/" + response.contractId + "/detail";

    }).catch(function(err) {
      Notify.show([{
        message: err.message,
        type: 'danger',
      }]);
    });
  }

  onCancel() {
    window.history.back();
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
    })).then(function(response) {

      //initialValues.ContractStateType = 'EXECUTE';

      initialValues.mainbillid = params.orderId;

      initialValues.leaseBegindate = new Date;
      initialValues.leaseEnddate = new Date;


      optionValues.communityAddress = response.customer.communityAddress;
      optionValues.leaseAddress = response.customer.customerAddress;
      //合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
      initialValues.contracttype = 'QUITRENT';

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

      Store.dispatch(Actions.callAPI('getFnaContractWithdrawalById', {
        id: params.id
      })).then(function(response) {

        optionValues.contractFileList = response.contractFileList;
        optionValues.lessorContactName = response.lessorContactName;

        initialValues.id = response.id;
        initialValues.contractstate = response.contractstate;
        initialValues.leaseId = response.leaseId;
        initialValues.contractcode = response.contractcode;
        initialValues.leaseAddress = response.leaseAddress;
        initialValues.lessorContactName = response.lessorContactName;
        initialValues.leaseContact = response.leaseContact;
        initialValues.lessorContacttel = response.lessorContacttel;
        initialValues.leaseContacttel = response.leaseContacttel;
        if (response.payType) {
          initialValues.paytype = response.payType.id;

        }
        if (response.payment) {
          initialValues.paymodel = response.payment.id;

        }
        initialValues.stationnum = response.stationnum;
        initialValues.wherefloor = response.wherefloor;
        initialValues.rentaluse = response.rentaluse;
        initialValues.contractmark = response.contractmark;
        initialValues.totalrent = response.totalrent;
        initialValues.totaldeposit = response.totaldeposit;
        initialValues.lessorContactid = response.lessorContactid;
        initialValues.depositamount = response.depositamount;
        initialValues.totalreturn = response.totalreturn;
        //时间

        initialValues.signdate = new Date(response.signdate);
        initialValues.leaseBegindate = new Date(response.leaseBegindate);
        initialValues.leaseEnddate = new Date(response.leaseEnddate);
        initialValues.withdrawdate = response.withdrawdate;


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
    console.log('stationVos', stationVos)
    return (

      <div>
      <Title value="编辑退租协议书_财务管理"/>
      <BreadCrumbs children={['系统运营','客户管理','退租协议']}/>
      <Section title="退租协议书" description="">
          <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos}/>
      </Section>
    </div>
    );
  }
}
