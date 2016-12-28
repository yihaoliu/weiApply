/*
 *
 * 导航字典
 *
 */

module.exports = {

	current_parent: '',
	current_child: '',
	current_router: '',
	current_items: [{
		primaryText: "权限管理",
		router: 'order',
		menuCode: 'rightadmin',
		menuItems: [],
	}, ],
	items: [{
		primaryText: "首页",
		router: 'index',
		menuCode: 'index',
		originUrl: '/'
	}, {
		primaryText: "数据统计",
		menuCode: 'dataStat',
		router:'statistical',
		menuItems: [{
			primaryText: "数据统计",
			router: 'statistical',
			iconName: 'icon-com',
			iconColor: '#2b8dcd',
			menuCode: 'dataStat',
			menuItems: [{
				primaryText: "集团经营",
				router: '/statistical/index'
			},]
		}, ]
	},{
		primaryText: "社区经营",
		router: 'community',
		menuCode: 'op_manage',
		originUrl: '#/community/communityManage/detail',
		menuItems: [{
			primaryText: "社区管理",
			iconName: 'icon-com',
			iconColor: '#2b8dcd',
			menuCode: 'community_manage',
			menuItems: [{
				primaryText: '计划表',
				menuCode: 'plan_table',
				router: '/community/communityManage/detail',
			}, {
				primaryText: '访客记录',
				menuCode: 'sysVisitRecord',
				originUrl: '/krspace_operate_web/community/sysVisitRecord/toSysVisitrecordList?mid=112'
			}, ]
		}, ],
	}, {
		primaryText: "运营平台",
		router: 'operation',
		menuCode: 'operate',
		originUrl: '/krspace_operate_web/customerBase/toCoustomerInfoList?mid=103#share',
		menuItems: [{
			primaryText: "客户管理",
			iconName: 'icon-user',
			iconColor: '#2b8dcd',
			router: 'communityManage',
			menuCode: 'coustomerInfoList',
			menuItems: [{
				primaryText: '客户列表',
				originUrl: '/krspace_operate_web/customerBase/toCoustomerInfoList?mid=103#share',
				menuCode: 'coustomerInfoList',
			}, ]
		}, {
			primaryText: "社区配置",
			iconName: 'icon-community',
			iconColor: '#2b8dcd',

			router: 'communityManage',
			menuCode: 'communityBaseAdmin',
			menuItems: [{
				primaryText: '社区列表',
				menuCode: 'communityBaseList',
				originUrl: '/krspace_operate_web/commnuity/communityBase/toCommunityBaseList?mid=65'
			}, {
				primaryText: '会议室列表',
				menuCode: 'communityBoardroomList',
				originUrl: '/krspace_operate_web/commnuity/communityBase/toCityCommunityList?jumpType=toCommunityBoardroom&mid=66'
			}, {
				primaryText: '设备列表',
				menuCode: 'communityDeviceList',
				originUrl: '/krspace_operate_web/community/device/toDeviceList?mid=75'
			}, {
				primaryText: '工位列表',
				menuCode: 'communityStationList',
				originUrl: '/krspace_operate_web/commnuity/communityBase/toCityCommunityList?jumpType=toCommunityStation&mid=83'
			}, {
				primaryText: '平面图配置',
				menuCode: 'communityFloorPlanList',
				originUrl: '/krspace_operate_web/commnuity/communityBase/toCityCommunityList?jumpType=toCommunityFloorPlan&mid=90'
			}, {
				primaryText: '访客记录',
				menuCode: 'sysVisitRecordList',
				originUrl: '/krspace_operate_web/community/sysVisitRecord/toSysVisitrecordList?mid=102'
			}


		 ]
		}, {
			primaryText: "基础配置",
			iconName: 'icon-basis',
			iconColor: '#2b8dcd',
			router: 'BaseManage',
			menuCode: 'basic_config',
			menuItems: [{
				primaryText: "合同配置",
				menuCode: 'agreement_setting',
				router: '/operation/customerManage/agreement/setting/list',
			}, {
				primaryText: '参数配置',
				menuCode: 'retail_sysparamadmin',
				originUrl: '/krspace_operate_web/sys/sysParam/toSysParamList?mid=60'
			}, {
				primaryText: '代码分类',
				menuCode: 'codeCategoryList',
				originUrl: '/krspace_operate_web/codecategory/toCodeCategoryList?mid=85'
			}, {
				primaryText: '商圈列表',
				menuCode: 'businessAreaList',
				originUrl: '/krspace_operate_web/businessArea/toBusinessAreaList?mid=87'
			}, {
				primaryText: "出租方管理",
				menuCode: 'lessorManage',
				router: '/operation/customerManage/agreement/lessorManage/list',
			}, {
				primaryText: '设备定义',
				menuCode: 'sysDeviceDefinitionList',
				originUrl: '/krspace_operate_web/community/sysDeviceDefinition/toSysDeviceDefinitionList?mid=105'
			},{
				primaryText: '分组管理',
				menuCode: 'groupManage',
				router: '/operation/groupSetting'
			}
		]
		}, ]
	}, {
		primaryText: "会员中心",
		router: 'member',
		menuCode: 'member',
		originUrl: '#/member/memberManage/list?mid=94',
		menuItems: [
			/*
			{
			primaryText: '会员管理',
			iconName: 'icon-vip',
			iconColor: '#2b8dcd',
			menuCode: 'memberAdmin',
			router: 'memberAdmin',
			originUrl: '/krspace_member_web/member/toMemberList?mid=94'
		}
		*/
			{
				primaryText: '会员管理',
				iconName: 'icon-vip',
				iconColor: '#2b8dcd',
				menuCode: 'memberAdmin',
				router: '/member/memberManage/list',
				menuItems: [
					{
					primaryText: "会员看板",
					router: '/member/memberManage/board',
					menuCode: 'index',
					},
					{
					primaryText: "会员列表",
					router: '/member/memberManage/list',
					menuCode: 'memberList',
				},
					{
					primaryText: "会员卡管理",
					router: '/member/memberManage/card',
					menuCode: 'index',
				},
					{
					primaryText: "会员配置",
					router: '/member/memberManage/setting',
					menuCode: 'memberSetting',
				},

		]
		}

	],

	}, {
		primaryText: "财务系统",
		router: 'finance',
		menuCode: 'finance',
		menuItems: [{
			primaryText: "财务管理",
			router: 'manage',
			iconName: 'icon-money',
			iconColor: '#2b8dcd',
			menuCode: 'financeManage',
			menuItems: [{
				primaryText: "账单列表",
				router: '/finance/manage/orderbill/orderList',
				menuCode: 'billList',
			}, {
				primaryText: "科目配置",
				router: '/finance/manage/codeSetting/subject',
				menuCode: 'finaflowAccount',
			}, {
				primaryText: "属性配置",
				router: '/finance/manage/codeSetting/attribute',
				menuCode: 'propManage',
			}, ]
		}, ]
	}, {
		primaryText: "商品零售",
		iconName: 'icon-look',
		iconColor: '#2b8dcd',

		router: 'retail',
		menuCode: 'krspace_retail',
		originUrl: '/krspace_retail_web/retail/charts/retailCharts/toRetailCharts?mid=92',
		menuItems: [{
			primaryText: '零售看板',
			menuCode: 'retailCharts',
			router: 'retailCharts',
			originUrl: '/krspace_retail_web/retail/charts/retailCharts/toRetailCharts?mid=92'
		}, {
			primaryText: '商品管理',
			menuCode: 'goodsAdmin',
			iconName: 'icon-commodityManage',
			iconColor: '#2b8dcd',

			router: 'goodsAdmin',
			menuItems: [{
					primaryText: '商品品牌',
					menuCode: 'goodsBrandAdmin',
					router: 'goodsBrandAdmin',
					originUrl: '/krspace_retail_web/retail/goods/goodsBrand/toEGoodsBrandList?mid=72'
				}, {
					primaryText: '商品类别',
					menuCode: 'goodsTypeAdmin',
					router: 'goodsTypeAdmin',
					originUrl: '/krspace_retail_web/retail/goods/goodsType/toGoodsTypeList?mid=73'
				}, {
					primaryText: '中心商品',
					menuCode: 'goodsbase',
					router: 'goodsbase',
					originUrl: '/krspace_retail_web/retail/goods/goodsBase/toEGoodsBaseList?mid=78'
				}, {
					primaryText: '社区商品',
					menuCode: 'goodscommunity',
					router: 'goodscommunity',
					originUrl: '/krspace_retail_web/retail/goods/goodsCommunity/toEGoodsCommunityList?mid=79'
				},

			]
		}, {
			primaryText: '订单管理',
			iconName: 'icon-orderForm',
			iconColor: '#2b8dcd',

			menuCode: 'ordersManager',
			router: 'ordersManager',
			menuItems: [{
					primaryText: '全部订单',
					menuCode: 'allOrders',
					router: 'allOrders',
					originUrl: '/krspace_retail_web/retail/orders/allOrders/toOrdersList?mid=81'
				}, {
					primaryText: '社区订单',
					menuCode: 'communityOrders',
					router: 'communityOrders',
					originUrl: '/krspace_retail_web/retail/orders/communityOrders/toOrdersList?mid=82'
				}

			]
		}, {
			primaryText: '系统信息',
			iconName: 'icon-system',
			iconColor: '#2b8dcd',

			menuCode: 'sysmsgmanger',
			router: 'sysmsgmanger',
			menuItems: [{
					primaryText: '反馈信息',
					menuCode: 'user_submit_msg',
					router: 'user_submit_msg',
					originUrl: '/krspace_retail_web/retail/buyers/buyersfeedback/toBuyersFeedbackList?mid=86'
				}, {
					primaryText: '推送人员',
					menuCode: 'add_manager',
					router: 'add_manager',
					originUrl: '/krspace_retail_web/retail/sys/sysPushPerson/toSysPushPersonList?mid=89'
				}, {
					primaryText: '系统社区',
					menuCode: 'syscommunity',
					router: 'syscommunity',
					originUrl: '/krspace_retail_web/retail/sys/sysCommunity/toSysCommunityList?mid=76'
				}, {
					primaryText: '参数配置',
					menuCode: 'retail_sysparamadmin',
					router: 'retail_sysparamadmin',
					originUrl: '/krspace_retail_web/sys/sysParam/toSysParamList?mid=54'
				},

			]
		}]
	}, {
		primaryText: "OA办公",
		menuCode: 'oa',
		router: 'oa',
		originUrl: '/krspace_oa_web/hrm/hrmOrganization/main?mid=40',
		menuItems: [{
			primaryText: '组织架构',
			iconName: 'icon-schema',
			iconColor: '#2b8dcd',

			menuCode: 'hrmOrganization',
			router: 'hrmOrganization',
			originUrl: '/krspace_oa_web/hrm/hrmOrganization/main?mid=40'
		}, {
			primaryText: '基础配置',
			menuCode: 'hrmbasedataadmin',
			iconName: 'icon-basis',
			iconColor: '#2b8dcd',


			iconColor: '#2b8dcd',
			router: 'hrmbasedataadmin',
			menuItems: [{
					primaryText: '参数配置',
					menuCode: 'oa_sysparamadmin',
					router: 'oa_sysparamadmin',
					originUrl: '/krspace_oa_web/sys/sysParam/toSysParamList?mid=30'
				}, {
					primaryText: '职务类型',
					menuCode: 'dictJobType',
					router: 'dictJobType',
					originUrl: '/krspace_oa_web/dict/dictJobType/toDictJobTypeList?mid=38'
				}, {
					primaryText: '职务管理',
					menuCode: 'dictJob',
					router: 'dictJob',
					originUrl: '/krspace_oa_web/dict/dictJob/toDictJobList?mid=37'
				}, {
					primaryText: '职级管理',
					menuCode: 'dictJobLevel',
					router: 'dictJobLevel',
					originUrl: '/krspace_oa_web/dict/dictJobLevel/toEDictJobLevelList?mid=39'
				},

			]
		}, {
			primaryText: '人员管理',
			iconName: 'icon-administrator',
			iconColor: '#2b8dcd',

			iconColor: '#2b8dcd',
			menuCode: 'hrmresourceadmin',
			router: 'hrmresourceadmin',
			menuItems: [{
				primaryText: '在职列表',
				menuCode: 'hrmresourcelistactive',
				router: 'hrmresourcelistactive',
				originUrl: '/krspace_oa_web/hrm/hrmResource/toHrmResourceListActive?mid=45'
			}, {
				primaryText: '离职列表',
				menuCode: 'hrmresourcelistleave',
				router: 'hrmresourcelistleave',
				originUrl: '/krspace_oa_web/hrm/hrmResource/toHrmResourceListLeave?mid=55'
			}, ]
		}, ]
	}, {
		primaryText: "知识中心",
		menuCode: 'krspace_knowledge',
		router: 'document',
		originUrl: '/krspace_knowledge_web/doc/docFile/toDocTypeList?mid=67',
		menuItems: [{
			primaryText: '系统管理',
			iconName: 'icon-system',
			iconColor: '#2b8dcd',
			menuCode: 'sysadmin',
			router: 'sysadmin',
			menuItems: [{
				primaryText: '参数配置',
				menuCode: 'sysparamadmin',
				router: 'sysparamadmin',
				originUrl: '/krspace_knowledge_web/sys/sysParam/toSysParamList?mid=50'
			}, {
				primaryText: '文件类型',
				menuCode: 'docFiletypeAdmin',
				router: 'docFiletypeAdmin',
				originUrl: '/krspace_knowledge_web/doc/docFiletype/toDocFiletypeList?mid=56'
			}, {
				primaryText: '文件范围',
				menuCode: 'docFileRangeAdmin',
				router: 'docFileRangeAdmin',
				originUrl: '/krspace_knowledge_web/doc/docFileRange/toDocFileRangeList?mid=57'
			}, ]
		}, {
			primaryText: '文档管理',
			iconName: 'icon-file',
			iconColor: '#2b8dcd',
			menuCode: 'docadmin',
			router: 'docadmin',
			menuItems: [{
					primaryText: '来源系统',
					menuCode: 'docSourceServiceAdmin',
					router: 'docSourceServiceAdmin',
					originUrl: '/krspace_knowledge_web/doc/docSourceService/toDocSourceServiceList?mid=59'
				}, {
					primaryText: '文档设置',
					menuCode: 'docFileAdmin',
					router: 'docFileAdmin',
					originUrl: '/krspace_knowledge_web/doc/docFile/toDocTypeList?mid=67'
				},

			]
		}, ]
	}, {
		primaryText: "权限管理",
		menuCode: 'rightadmin',
		router: 'permission',
		originUrl: '/sys/sysParam/toSysParamList?mid=8',
		menuItems: [{
			primaryText: '系统管理',
			menuCode: 'sysadmin',
			router: 'sysadmin',
			menuItems: [{
					primaryText: '参数配置',
					menuCode: 'sysparamadmin',
					router: 'sysparamadmin',
					originUrl: '/sys/sysParam/toSysParamList?mid=8'
				}, {
					primaryText: '系统新闻',
					menuCode: 'sysnotice',
					router: 'sysnotice',
					originUrl: '/sys/sysNews/toSysNewsList?mid=21'
				}, {
					primaryText: '系统缓存',
					menuCode: 'syschache_admin',
					router: 'syschache_admin',
					originUrl: '/sys/sysCache/showAllCache?mid=34'
				}, {
					primaryText: '验证码列表',
					menuCode: 'sysverifycode',
					router: 'sysverifycode',
					originUrl: '/sys/sysVerifyCode/toVerifyCodeList?mid=25'
				}, {
					primaryText: '待办事项',
					menuCode: 'sysundo',
					router: 'sysundo',
					originUrl: '/sys/sysUndo/toSysUndoList?mid=33'
				},

				{
					primaryText: '常用列表',
					menuCode: 'sysMyusual',
					router: 'sysMyusual',
					originUrl: '/sys/sysMyusual/toSysMyusualList?mid=97'
				}, {
					primaryText: '系统日程',
					menuCode: 'sysschedule',
					router: 'sysschedule',
					originUrl: '/sys/sysSchedule/toSysScheduleList?mid=91'
				},

			]

		}, {
			primaryText: '权限管理',
			menuCode: 'rightadmin',
			iconName: 'icon-wendang',
			iconColor: '#2b8dcd',
			router: 'rightadmin',
			menuItems: [{
					primaryText: '未注册列表',
					menuCode: 'sysFunRightsNoRegisterAdmin',
					router: 'sysFunRightsNoRegisterAdmin',
					originUrl: '/sys/sysfunrights/sysFunRightsNoRegister/toSysFunRightsNoRegisterList?mid=35'
				}, {
					primaryText: '注册管理',
					menuCode: 'sysFunRightsRegisterAdmin',
					router: 'sysFunRightsRegisterAdmin',
					originUrl: '/sys/sysfunrights/sysFunRightsRegister/toSysFunRightsRegisterList?mid=36'
				}, {
					primaryText: '权限类型',
					menuCode: 'righttypeadmin',
					router: 'righttypeadmin',
					originUrl: '/sys/sysfunrights/sysRightType/toSysFunrighttypeList?mid=14'
				}, {
					primaryText: '权限项列表',
					menuCode: 'sysfunrightsadmin',
					router: 'sysfunrightsadmin',
					originUrl: '/sys/sysfunrights/sysFunrights/toSysFunRightsList?mid=17'
				}, , {
					primaryText: '角色类型',
					menuCode: 'sysroletypeadmin',
					router: 'sysroletypeadmin',
					originUrl: '/sys/sysfunrights/sysRoletype/toSysRoletypeList?mid=18'
				}, {
					primaryText: '功能角色',
					menuCode: 'sysfunroleadmin',
					router: 'sysfunroleadmin',
					originUrl: '/sys/sysfunrights/sysFunrole/toSysFunroleList?mid=19'
				}, {
					primaryText: '菜单管理',
					menuCode: 'sysmenuadmin',
					router: 'sysmenuadmin',
					originUrl: '/sys/sysfunrights/sysMenu/toSysMenuList?mid=9'
				}, {
					primaryText: '数据模板管理',
					menuCode: 'groupManage',
					router: '/statistical/groupSetting'
				},

			]
		}, {
			primaryText: '账户管理',
			menuCode: 'sysloginadmin',
			iconName: 'icon-account',
			iconColor: '#2b8dcd',
			router: 'sysloginadmin',
			menuItems: [{
					primaryText: '账户列表',
					menuCode: 'sysloginadmin',
					router: 'sysloginadmin',
					originUrl: '/sys/sysLogin/sysLogin/toSysLoginList?mid=12'
				}, {
					primaryText: '变更日志',
					menuCode: 'sysloginchangelog',
					router: 'sysloginchangelog',
					originUrl: '/sys/sysLogin/sysLoginChangelog/toSysLoginChangelogList?mid=13'
				}, {
					primaryText: '登录日志',
					menuCode: 'sysloginlog',
					router: 'sysloginlog',
					originUrl: '/sys/sysLogin/sysLoginLog/toSysLoginLogList?mid=15'
				},

			]
		}, {
			primaryText: '单点管理',
			menuCode: 'issoadmin',
			iconName: 'icon-dandian_nor',
			iconColor: '#2b8dcd',
			router: 'issoadmin',
			menuItems: [{
				primaryText: '单点服务',
				menuCode: 'issoserviceadmin',
				router: 'issoserviceadmin',
				originUrl: '/isso/issoService/toIssoServiceList?mid=10'
			}, {
				primaryText: '单点日志',
				menuCode: 'issolog',
				router: 'issolog',
				originUrl: '/isso/issoLog/toIssoLogList?mid=24'
			}, ]
		}, {
			primaryText: '系统监控',
			iconName: 'icon-control',
			iconColor: '#2b8dcd',
			menuCode: 'sysmonitor',
			router: 'sysmonitor',
			menuItems: [{
				primaryText: '用户监测',
				menuCode: 'onlineuser',
				router: 'onlineuser',
				originUrl: '/sys/onLineUser/onLineUserList?mid=42'
			}, ]
		}, ]
	}, ]
}
