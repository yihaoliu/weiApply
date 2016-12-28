import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	browserHistory,
	IndexRedirect
} from 'react-router';

import {
	Actions,
	Store
} from 'kr/Redux';


import {
	Welcome,
	Help,
	Undefined,
	Permission,
	Document,
	Operation,
	Basic,
	OA,
	Initialize,
	Demo,
	Finance,
	Member,
	Community,
	Retail,
	Statistical
} from '../Containers';

import Master from '../master';

export default (

	<Route path="/" component={Master}>

		<IndexRoute component={Welcome}  onEnter={({params}, replace) =>{
			Store.dispatch(Actions.switchSidebarNav(false));
		}} onLeave={({params},replace)=>{
			Store.dispatch(Actions.switchSidebarNav(true));
		}}/>

		<Route path="index" component={Welcome}  onEnter={({params}, replace) =>{
			Store.dispatch(Actions.switchSidebarNav(false));
		}} onLeave={({params},replace)=>{
			Store.dispatch(Actions.switchSidebarNav(true));
		}}/>

		<Redirect from="messages/:id" to="/messages/:id" />

		<Route path="initialize" component={Initialize}/>

		{/*demo*/}
		<Route path="demo" component={Demo} name="demo"/>

		{/*会员中心*/}
		<Route path="member" component={Basic}>
             <IndexRedirect to="memberManage/list" />

		<Route path="memberManage" component={Basic}>
				<Route path="list"  component={Member.MemberManage.List}/>
				<Route path=":memberId/detail/:companyId"  component={Member.MemberManage.Detail}/>
				<Route path="setting"  component={Member.MemberManage.Setting}/>

			</Route>

		</Route>

		{/*统计看板*/}
		<Route path="statistical" component={Basic}>
			<Route path="index" component={Statistical.Home}/>
			<IndexRedirect to="index" />
		</Route>



		{/*社区经营*/}
		<Route path="community" component={Basic}>
             <IndexRedirect to="communityManage/detail" />
			{/*计划表*/}

			<Route path="communityManage" component={Basic}>
					<Route path="detail" component={Operation.CommunityManage.Detail}/>
			</Route>
			{/*公司成员*/}

			<Route path="companyMembers" component={Basic}>
					<Route path=":companyId/list/:communityId" component={Operation.CommunityManage.CompanyMembers}/>
			</Route>
		</Route>

		{/*OA办公*/}
		<Route path="oa" component={Basic}>
			<Route path="index" component={OA.Home}/>
		</Route>

		{/*商品零售*/}
		<Route path="retail" component={Basic}>
			<Route path="index" component={Retail.Home}/>
		</Route>


		{/*运营管理*/}
		<Route path="operation" component={Basic}>
				<Route path="index" component={Operation.Home}/>
                 {/*分组模版管理*/}
                <Route path="groupSetting" component={Operation.GroupSetting}/>
                 {/*客户管理*/}
				<Route path="customerManage" component={Basic}>
					<Route path="List" component={Operation.CustomerManage.List} name="customerManage_list"/>

					<Route path=":customerId/" component={Basic} >

								{/*订单*/}
								<Route path="order" component={Basic}>
									<Route path="create" component = {Operation.CustomerManage.Order.Create} name="customerManage_order_create"/>
									<Route path=":orderId/detail" component = {Operation.CustomerManage.Order.Detail} name="customerManage_order_detail"/>
									<Route path=":orderId/Edit" component = {Operation.CustomerManage.Order.Edit} name="customerManage_order_edit"/>


									{/*合同信息*/}
									<Route path=":orderId/agreement" component={Basic}>

																	{/*入驻协议书*/}
																	<Route path="join" component={Basic}>
																		<Route path=":id/edit" component={Operation.CustomerManage.Agreement.Join.Edit}/>
																		<Route path=":id/detail" component={Operation.CustomerManage.Agreement.Join.Detail}/>
																		<Route path="create" component={Operation.CustomerManage.Agreement.Join.Create}/>
																	</Route>

																	{/*承租意向书*/}
																	<Route path="admit" component={Basic}>
																		<Route path="create" component={Operation.CustomerManage.Agreement.Admit.Create}/>
																		<Route path=":id/edit" component={Operation.CustomerManage.Agreement.Admit.Edit}/>
																		<Route path=":id/detail" component={Operation.CustomerManage.Agreement.Admit.Detail}/>
																	</Route>

																	{/*增租协议书*/}
																	<Route path="increase" component={Basic}>
																		<Route path="create" component={Operation.CustomerManage.Agreement.Increase.Create}/>
																		<Route path=":id/edit" component={Operation.CustomerManage.Agreement.Increase.Edit}/>
																		<Route path=":id/detail" component={Operation.CustomerManage.Agreement.Increase.Detail}/>
																	</Route>

																	{/*续租协议书*/}
																	<Route path="renew" component={Basic}>
																		<Route path="create" component={Operation.CustomerManage.Agreement.Renew.Create}/>
																		<Route path=":id/edit" component={Operation.CustomerManage.Agreement.Renew.Edit}/>
																		<Route path=":id/detail" component={Operation.CustomerManage.Agreement.Renew.Detail}/>
																	</Route>

																	{/*减租协议书*/}
																	<Route path="reduce" component={Basic}>
																		<Route path="create" component={Operation.CustomerManage.Agreement.Reduce.Create}/>
																		<Route path=":id/edit" component={Operation.CustomerManage.Agreement.Reduce.Edit}/>
																		<Route path=":id/detail" component={Operation.CustomerManage.Agreement.Reduce.Detail}/>
																	</Route>

																	{/*退租协议书*/}
																	<Route path="exit" component={Basic}>
																		<Route path="create" component={Operation.CustomerManage.Agreement.Exit.Create}/>
																		<Route path=":id/edit" component={Operation.CustomerManage.Agreement.Exit.Edit}/>
																		<Route path=":id/detail" component={Operation.CustomerManage.Agreement.Exit.Detail}/>
																	</Route>

																</Route>
							   </Route>

					</Route>

					{/*合同配置*/}
					<Route path="agreement" component={Basic} >

							{/*出租方管理*/}
							<Route path="lessorManage" component={Basic}>
								<Route path="list" component={Operation.CustomerManage.Agreement.LessorManage.List}/>
							</Route>

							{/*基础配置*/}
							<Route path="setting" component={Basic}>
								<Route path="list" component={Operation.CustomerManage.Agreement.Setting.List}/>
							</Route>
					</Route>



				</Route>

				{/*入驻订单*/}
				<Route path="joinOrder" component={Basic}>
					<Route path="list" component={Operation.JoinOrder.List}/>
					<Route path="customer" component={Basic}>
						<Route path="edit" component = {Operation.JoinOrder.Customer.Edit}/>
						<Route path="detail" component = {Operation.JoinOrder.Customer.Detail}/>
					</Route>
				</Route>
		</Route>

			{/*财务管理*/}
				<Route path="finance" component={Basic}>

					<IndexRedirect to="manage/orderbill/orderList" />

					<Route path="manage" component={Basic}>
						<Route path="orderbill" component={Basic}>
						<Route path="receiptList" component={Finance.Manage.OrderBill.ReceiptList}/>

						{/*订单账单*/}
						<Route path="orderList" component={Finance.Manage.OrderBill.OrderList}/>
						{/*订单账单明细*/}
						<Route path=":orderId/detail" component={Finance.Manage.OrderBill.OrderBillDetail}/>
					</Route>

					{/*开票列表*/}
					<Route path="invoice" component={Basic}>
						<Route path="list" component={Finance.Manage.Invoice}/>
					</Route>

					{/*代码配置*/}
					<Route path="codeSetting" component={Basic}>
						<Route path="attribute" component={Finance.Manage.CodeSetting.Attribute}/>
						<Route path="subject" component={Finance.Manage.CodeSetting.Subject}/>
					</Route>
					</Route>
			</Route>


		{/*权限管理*/}
		<Route path="permission" component={Basic}>
{/*
	<Route path="index" component={Permission.Home}/>
	<Route path="notify" component={Permission.Notify}/>
	<Route path="memo" component={Permission.Memo}/>
	<Route path="docs" component={Permission.Docs}/>
	<Route path="order" component={Permission.Order}/>

	*/}

	<Route path="personalCenter" component={Permission.PersonalCenter}/>
			<Redirect from="permission" to="permission/personalCenter" />
		</Route>

		{/*文档管理*/}
		<Route path="document" component={Basic}>
			<Route path="index" component={Document.Home}/>
		</Route>

		{/*帮助*/}
		<Route path="help" component={Help}/>

		{/*404*/}
		<Route path="undefined" component={Undefined}/>
		<Route path="*" component={Undefined}/>

	</Route>

);
