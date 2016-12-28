import React,{Component} from 'react';
import{
  Tabs,
  Tab,
  Section,
  DotTitle,
  Paper,
  Notify
}from 'kr-ui';
import {
	Actions,
	Store
} from 'kr/Redux';
import dateFormat from 'dateformat';
import PersonalData from './PersonalData';
import PersonalJob from './PersonalJob';
import PersonalCompanyInfo from './PersonalCompanyInfo';
import PersonalBehavior from './PersonalBehavior';
import OrganizationChart from './OrganizationChart';
import UpdateLog from './UpdateLog';
export default class memberListDetail extends Component{

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor(props, context) {
		super(props, context);
    this.state = {
      isLeader:true,
			params: {
				orderId: this.props.params.orderId,
				page: 1,
				pageSize: 15,
				index:''
			},
      baseInfo:{},
      companyInfo:{},
      workInfo:{}
		}
    this.getBasicData();

    Store.dispatch(Actions.navActive('memberList'));
  }
  componentDidMount() {


	}
  getBasicData=()=>{
    var _this = this;
    let params = this.context.router.params;
    // 获取会员详细信息
		Store.dispatch(Actions.callAPI('getMemberDetailData', {
			id: params.memberId,
		})).then(function(response) {
      // console.log("response",response);
      _this.setState({
        workInfo:response.workInfo,
        companyInfo:response.companyInfo,
        baseInfo:response.baseInfo,
        isLeader:response.isLeader
      })
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
  }
  isLeader=()=>{
    let show = true;
    let {isLeader} = this.state;
    if(isLeader){
      return (
        <Tabs  >
        <Tab label="个人资料">
            <div style={{background:"fff",height:'860',width:1020,margin:'auto'}}>
              <DotTitle title='基本信息' style={{marginBottom:'40'}}/>
                <PersonalData  detail={this.state.baseInfo}/>
              <DotTitle title='工作信息' style={{marginTop:'40',marginBottom:'40'}}/>
                <PersonalCompanyInfo  detail={this.state.workInfo}/>
              <DotTitle title='公司信息' style={{marginTop:'40',marginBottom:'40'}}/>
                  <PersonalCompanyInfo  detail={this.state.companyInfo}/>
            </div>

        </Tab>
        <Tab label="个人行为记录">
          <div>
            <PersonalBehavior/>
          </div>
        </Tab>
        <Tab label="组织架构">
          <div style={{marginTop:76}}>
            <OrganizationChart/>
          </div>
        </Tab>
        <Tab label="更新日志">
          <div>
            <UpdateLog/>
          </div>
        </Tab>
        </Tabs>
      )
    }else{
      return(
        <Tabs >
        <Tab label="个人资料">

            <div style={{background:"fff",height:'860',width:1020,margin:'auto'}}>
              <DotTitle title='基本信息' style={{marginBottom:'40'}}/>
                <PersonalData  detail={this.state.baseInfo}/>
              <DotTitle title='工作信息' style={{marginTop:'40',marginBottom:'40'}}/>
                <PersonalJob  detail={this.state.workInfo}/>
              <DotTitle title='公司信息' style={{marginTop:'40',marginBottom:'40'}}/>
                  <PersonalCompanyInfo  detail={this.state.companyInfo}/>
            </div>

        </Tab>
        <Tab label="个人行为记录">
          <div >
            <PersonalBehavior/>
          </div>
        </Tab>
        <Tab label="更新日志">
          <div>
            <UpdateLog/>
          </div>
        </Tab>
        </Tabs>
      )
    }
  }
  render(){
    let {
			params,
			isInitLoading,
		} = this.state;
		if (isInitLoading) {
			return <Loading/>
		}
    return(
      <div name="memberListDetail">
          {
            this.isLeader()
          }
      </div>

    );

  }
}
