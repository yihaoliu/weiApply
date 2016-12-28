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
import './index.less';

export default class JoinCreate extends Component {

  static contextTypes = {
    params: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.openConfirmCreateDialog = this.openConfirmCreateDialog.bind(this);
    this.onCreateSubmit = this.onCreateSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      stationVos: [],
      initialValues: {},
      optionValues: {},
      formValues: {},
      openConfirmCreate: false
    }

    Store.dispatch(reset('reduceCreateForm'));

  }

  onCreateSubmit(formValues) {
    let {
      params
    } = this.props;

    Store.dispatch(Actions.callAPI('addOrEditContinueContract', {}, formValues)).then(function(response) {
      Notify.show([{
        message: '更新成功',
        type: 'success',
      }]);
      location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/renew/" + response.contractId + "/detail";

    }).catch(function(err) {
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

  openConfirmCreateDialog() {
    this.setState({
      openConfirmCreate: !this.state.openConfirmCreate
    });
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

      initialValues.signdate = +new Date((new Date()).getTime() - 24 * 60 * 60 * 1000);

      optionValues.communityAddress = response.customer.communityAddress;
      optionValues.leaseAddress = response.customer.customerAddress;
      //合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
      initialValues.contracttype = 'RENEW';

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

      Store.dispatch(Actions.callAPI('renewshow', {
        id: params.id
      })).then(function(response) {


        optionValues.lessorContactName = response.lessorContactName;

        optionValues.contractFileList = response.contractFileList;

        initialValues.id = response.id;
        initialValues.leaseId = response.leaseId;
        initialValues.contractcode = response.contractcode;
        initialValues.leaseAddress = response.leaseAddress;
        initialValues.lessorContactName = response.lessorContactName;
        initialValues.leaseContact = response.leaseContact;
        initialValues.leaseContacttel = response.leaseContacttel;
        initialValues.lessorContactid = response.lessorContactid;
        initialValues.firstpaydate = response.firstpaydate;
        initialValues.payType = response.payType.id
        initialValues.paymodel = response.payment.id;
        initialValues.totaldeposit = response.totaldeposit;
        initialValues.paytype = response.payType.id;
        initialValues.rentaluse = response.rentaluse;
        initialValues.contractmark = response.contractmark;
        initialValues.totalrent = response.totalrent;
        if (response.rentamount) {
          rentamount = response.rentamount;
          _this.setState({
            rentamount
          });

        }
        initialValues.lessorContacttel = response.lessorContacttel;

        //时间
        initialValues.firstpaydate = new Date(response.firstpaydate);
        initialValues.signdate = new Date(response.signdate);
        initialValues.leaseBegindate = new Date(response.leaseBegindate);
        initialValues.leaseEnddate = new Date(response.leaseEnddate);

        console.log('时间', initialValues);


        //处理stationvos
        stationVos = response.stationVos;

        console.log(stationVos, '---->>>>', response);

        _this.setState({
          initialValues,
          optionValues,
          stationVos,
        });

      }).catch(function(err) {
        console.log(err);
        Notify.show([{
          message: '后台出错请联系管理员',
          type: 'danger',
        }]);
      });


    }).catch(function(err) {
      console.log('------', err);
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
        	<Title value="编辑续租协议书_财务管理"/>
      <BreadCrumbs children={['系统运营','客户管理','续租协议']}/>
      <Section title="续租协议书" description="">
          <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos}/>
      </Section>

      <Dialog
        title="确定新建"
        modal={true}
        autoScrollBodyContent={true}
        autoDetectWindowHeight={true}
        open={this.state.openConfirmCreate} onClose={this.openConfirmCreateDialog}>
            <ConfirmFormDetail detail={this.state.formValues} onSubmit={this.onConfrimSubmit} onCancel={this.openConfirmCreateDialog} />
        </Dialog>
    </div>
    );
  }
}