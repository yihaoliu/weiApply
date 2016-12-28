import React, {
  Component,
  PropTypes
} from 'react';
import {
  connect
} from 'kr/Redux';
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

import {
  Tabs,
  Tab,
  Dialog,
  Section,
  Grid,
  Button,
  Notify,
  BreadCrumbs,
  Tooltip
} from 'kr-ui';

import './index.less';
import _ from 'lodash';

import {
  findDOMNode
} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import EmployessTable from './EmployessTable';
import D3Content from './D3Content';
import DismantlingForm from './DismantlingForm';

import dateFormat from 'dateformat';

export default class ItemTable extends Component {


  static PropTypes = {
    onDismantling: React.PropTypes.func,
    onStation: React.PropTypes.func,
    isLoading: React.PropTypes.bool,
  }


  constructor(props, context) {
    super(props, context);

    this.onStation = this.onStation.bind(this);
    this.onDismantlingDialog = this.onDismantlingDialog.bind(this);
    // this.onDismantling = this.onDismantling.bind(this);
    this.renderOrder = this.renderOrder.bind(this);
    this.onhref = this.onhref.bind(this);


    this.state = {
      detail: this.props.detail,
      //activity: false,
      Dismantling: false,
      currentYear: '2016',
      contractTypeVo:[]

    }

  }


  componentWillReceiveProps(nextProps) {


    if (!_.isEqual(this.props.detail, nextProps.detail)) {
      this.setState({
        detail: nextProps.detail
      });
    }


  }

  componentDidMount() {

    }
    //撤场
  onDismantling(detail) {

      const {
        onDismantling
      } = this.props;

      onDismantling && onDismantling(detail);

    }
    //分配工位
  onStation() {

    let {
      detail
    } = this.state;

    detail.activity = !detail.activity;

    this.setState({
      detail
    });

    let {
      onStation
    } = this.props;

    onStation && onStation()


  }
  onDismantlingDialog() {
    this.setState({
      Dismantling: !this.state.Dismantling
    })

  }


  //查看员工跳转地址
  onhref() {
    window.open("/new/#/community/companyMembers/" + this.state.detail.companyId + "/list/" + this.state.detail.communityId);
  }

  renderOrder() {

    let {
      show,
      detail,
      contractTypeVo
    } = this.state;
    return (
        <Tooltip place="right" type="dark" offsetRight={80} effect="solid" id={`${detail.billId}${detail.billName}`}>
          <ul style={{marginTop:20}}>
           {contractTypeVo.map((item, index) => {
                if (!item.contractCount) {
                  return (
                    
                        <li key={index} className="company-order-zero" key={index}>
                         <p className="name">{item.contractName}</p>
                        </li>
                      
                  )
                } else if (item.contractCount === 1) {
                  return (
                      <li key={index} className="company-order" key={index}>
                        <p className="name">{item.contractName}</p>
                      </li>
                  )
                } else {
                  return (
                    <li key={index} className="company-order">
                        
                        <p className="name">{item.contractName}({item.contractCount})</p>
                      </li>
                  )
                }
              })
          }
          </ul>
        </Tooltip>

      )
  }
  getShowData(billId){
    let _this =this;
    Store.dispatch(Actions.callAPI('getBillContract',{billId:billId})).then(function(response) {

      

      _this.setState({
        contractTypeVo:response,
      },function(){
        this.renderOrder()
      });
      


    }).catch(function(err) {

      Notify.show([{
        message: err.message,
        type: 'danger',
      }]);
    });
  }
  render() {


    let {
      show,
      detail,
      contractTypeVo
    } = this.state;

    let {
      communityids,
      activity,
      width,
      currentYear
    } = this.props;

    var _this = this;
    var id = communityids;

    return (

      <tr className="last-td"   >
						<td className="company-list">

							<div className="company-name" onMouseOver={this.getShowData.bind(this,detail.billId)}> 
              {
                detail.billName
              }
								{
									this.renderOrder()
								}
								
							</div>
						</td>
						<td colSpan="12">
              <D3Content detail={detail.contractInstallmentplanVo} finaBluePointVo={detail.finaBluePointVo} finaRedPointVo={detail.finaRedPointVo} whiteBar={detail.whiteBar} id={detail.billId} currentYear={currentYear}/>
              <EmployessTable  activity={detail.activity} detail={detail} id={id} />
						</td>
						<td className="btnlist">
                 <div className="btnCon">
      							<div className="Station"  onTouchTap={this.onStation}   >
                      <div className="tip hide  hover">
                         分配工位 < span className = "bArrow" > < /span>
                      </div>
                    </div>
                      
      					    <div className="Dismantling" onClick={this.onDismantling.bind(this,detail)}> 
                        <div className="tip hide hover ">
                             撤场日期 <span className = "bArrow"></span>
                       </div>
                    </div>
                        
        						<div className="Preson"  onTouchTap={this.onhref}>
                      <div className="tip hide  hover">
                            查看员工 <span className = "bArrow"></span>
                      </div>
                    </div>
                      
                  </div>
                
						</td>
					</tr>

    );
  }
}