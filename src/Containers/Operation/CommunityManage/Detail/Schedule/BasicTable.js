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
	KrField,
	Form,
	Row,
	Col,
	SearchForms,
	Loading,
} from 'kr-ui';
import $ from 'jquery';
import './index.less';
import ReactDOM from 'react-dom';

import EmployessTable from './EmployessTable';
import ItemTable from './ItemTable';
import DismantlingForm from './DismantlingForm';

class SearchForm extends Component {
	// static contextTypes = {
	// 	onSetCommunity: React.PropTypes.func.isRequired,
	// 	communityId: React.PropTypes.string.isRequired,
	// }
	static defaultProps = {
		tab: '',
		Ids: React.PropTypes.string,
	}

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			currentYear: '2016',
			dismantling: false,
			formValues: {},
			Installmentplan: [],
			rate: ['0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%'],
			communityIdList: [],
			page: 1,
			pageSize: 15,
			type: 'BILL',
			ids: '',
			istip: false,

		};
		this.getcommunity = this.getcommunity.bind(this);
		this.selectCommunity = this.selectCommunity.bind(this);
		this.getcommunity();


	}


	onSubmit(form) {

		let {
			page,
			pageSize,
			communityids,
			ids,
			formValues,
			istip
		} = this.state

		formValues = {
			type: form.filter || 'BILL',
			value: form.content,
			communityids: communityids || 0,
			page: page,
			pageSize: pageSize

		}

		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(formValues, istip);



	}
	getcommunity() {
		let _this = this;
		let {
			communityIdList,
			page,
			pageSize,
			type
		} = this.state;
		Store.dispatch(Actions.callAPI('getCommunity')).then(function(response) {

			communityIdList = response.communityInfoList.map(function(item, index) {

				item.value = item.id;
				item.label = item.name;
				return item;
			});
			communityIdList.unshift({
				label: '请选择',
				value: '0'
			});

			_this.setState({
				communityIdList,
			});


		}).catch(function(err) {

			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	selectCommunity(personel) {
		let id = 0;
		if (!personel) {
			this.setState({
				communityids: 0
			})
		} else {
			id = personel.value;
			this.setState({
				communityids: personel.value,
			})
		}

		// this.context.onSetCommunity(id);
		const {
			onChange
		} = this.props;

		onChange && onChange(id);
	}
	onFilter=(value)=>{
		let {onFilter} = this.props;
		onFilter && onFilter(value);
	}



	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
		let {
			communityIdList
		} = this.state;
		let options = [{
			label: '订单名称',
			value: 'BILL'
		}, {
			label: '员工姓名',
			value: 'MEMBER'
		}, {
			label: '手机号',
			value: 'PHONE'
		}];

		return (
			<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,marginTop:12,height:45}}>
				{/*<KrField  name="wherefloor"  grid={1/2} component="select" label="所在楼层" options={optionValues.floorList} multi={true} requireLabel={true} left={60}/>*/}

				<SearchForms onSubmit={this.onSubmit} searchFilter={options} style={{marginTop:5}} onFilter={this.onFilter}/>
				<KrField name="community"  grid={1/5} component="select" label="社区" search={true}  options={communityIdList} onChange={this.selectCommunity} />
			</form>



		);
	}
}

SearchForm = reduxForm({
	form: 'searchForm'
})(SearchForm);


export default class BasicTable extends Component {
	// static contextTypes = {
	// 	onSetCommunity: React.PropTypes.func.isRequired,
	// 	communityId: React.PropTypes.string.isRequired,
	// }


	constructor(props, context) {
		super(props, context);

		this.onPreYear = this.onPreYear.bind(this);
		this.onNextYear = this.onNextYear.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.openDismantlingDialog = this.openDismantlingDialog.bind(this);
		this.onDismantling = this.onDismantling.bind(this);
		this.getInstallmentplan = this.getInstallmentplan.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onStation = this.onStation.bind(this);
		this.scrollLoading = this.scrollLoading.bind(this);
		this.onSetState = this.onSetState.bind(this);



		this.state = {
			currentYear: '2016',
			dismantling: false,
			formValues: {},
			Installmentplan: [],
			rate: ['0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%'],
			value: '',
			communityIdList: [],
			page: 1,
			pageSize: 15,
			type: 'BILL',
			detail: {},
			activity: false,
			nowDate: '',
			isIscroll: true,
			totalCount: '',
			isLoading: false,
			totalPages: '',
			istip: false,
			dataLoading: true,
			communityids: 0,

		};

		this.currentYear = '2016';

	}


	componentDidMount() {
			this.getRate();

		this.getInstallmentplan();
	}



	componentWillReceiveProps(nextProps) {

		if (nextProps.community !== this.props.communityids) {
			this.setState({
				communityids: nextProps.community

			});
			this.getInstallmentplan();
		}
	}

	scrollLoading() {

		var _this = this;
		
		// console.log('dataLoading',dataLoading);
		$(window).bind('scroll', function() {
			var top = $(window).scrollTop() || 0;
			var height = $(window).height() || 0;
			var num = $(document).height() - $(window).height();
			var scrollBottom = top - num;
			var {dataLoading} = _this.state;
			var isOutBoundary = scrollBottom >= -300;
			console.log(dataLoading,isOutBoundary);

			if (isOutBoundary && !dataLoading) {
				let {
					communityids,
					type,
					page,
					pageSize,
					value,
					Installmentplan,
					isIscroll,
					totalCount,
					totalPages,
					istip,
					currentYear,
					dataLoading
				} = _this.state;

				if (isIscroll) {
					_this.setState({
						isIscroll: !_this.state.isIscroll
					})

					var step = 1;
					var len = page;
					if (totalPages - page == 1) {
						window.setTimeout(function() {
							_this.setState({
								istip: !_this.state.istip
							})
						}, 2000)
					}

					if (totalPages > page) {
						len += step;
						_this.setState({
							page: len,
							isLoading: !_this.state.isLoading
						})
						Store.dispatch(Actions.callAPI('getInstallmentplan', {
							communityids: communityids,
							value: value,
							type: type,
							page: len,
							pageSize: 15,
							year: currentYear
						})).then(function(response) {

							if (response.vo) {

								var list = Installmentplan.concat(response.vo.items);
								// var list = $.extend(Installmentplan,response.vo.items);


							} else {
								var list = [];
							}


							_this.setState({
								Installmentplan: list, //response.vo.items,
								// rate: response.rate,
							});

							if (_this.state.page < _this.state.totalPages) {

								_this.setState({
									isIscroll: !_this.state.isIscroll
								})
							}
							window.setTimeout(function() {
									_this.setState({
										isLoading: !_this.state.isLoading
									})
								
							}, 10)

						}).catch(function(err) {
							Notify.show([{
								message: err.message,
								type: 'danger',
							}]);
						});


					}


				}



			}
		})


	}


	//撤场

	onDismantling(detail) {
		this.setState({
			detail: detail
		})
		this.openDismantlingDialog();
	}

	onCancel() {

	}


	//分配工位显示
	onStation() {
		this.setState({
			activity: !this.state.activity
		});
	}

	onChange(id) {
		this.setState({
			page: 1,
			isIscroll: true
		})
		let {
			type,
			page,
			pageSize,
			totalPages,
			isIscroll,
			value,
			currentYear
		} = this.state

		var _this = this;
		_this.getRate(id);
		console.log('id',id);

		Store.dispatch(Actions.callAPI('getInstallmentplan', {
			communityids: id,
			value: value,
			type: type,
			page: 1,
			pageSize: pageSize,
			year: currentYear
		})).then(function(response) {
			_this.setState({
				Installmentplan: response.vo.items || [],
				// rate: response.rate,
				communityids: id,
				totalPages: response.vo.totalPages,
			});
			if(response.vo.totalPages == response.vo.page){
				_this.setState({
					istip:true
				})
			}else{
				_this.setState({
					istip:false
				})
			}

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	onSubmit(formValues, istip) {
		let year = this.state.currentYear;
		var _this = this;
		var activity = true;
		if (formValues.type == "BILL") {
			activity = false;
		}
		formValues.year = year;


		this.setState({
			istip: istip
		})

		this.setState({
			value: formValues.value,
			type: formValues.type,
			dataLoading: true,
		})

		Store.dispatch(Actions.callAPI('getInstallmentplan', formValues)).then(function(response) {

			var Installmentplan = response.vo.items;
			Installmentplan.forEach(function(item, index) {
				item.activity = activity;
			});

			_this.setState({
				Installmentplan,
				// rate: response.rate,
				totalPages: response.vo.totalPages,
				dataLoading: false
			});
			if(response.vo.totalPages == response.vo.page){
				console.log('fss======dfsd');
				_this.setState({
					istip:true
				})
			}




		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

	}



	openDismantlingDialog() {
		this.setState({
			dismantling: !this.state.dismantling
		})
	}


	onPreYear() {
		let {
			currentYear
		} = this.state;
		currentYear--;
		this.setState({
			currentYear,
			istip: false,
			page: 1,
			dataLoading: true,
		}, function() {
			this.getInstallmentplan();
			this.getRate();
		});

	}

	onNextYear() {
		let {
			currentYear,
			isLoading,
		} = this.state;
		let _this = this;
		currentYear++;

		this.setState({
			currentYear,
			istip: false,
			page: 1,
			dataLoading: true,
		}, function() {
			this.getRate();
			this.getInstallmentplan();
		});

	}


	onSetState(state) {

		if (this.currentYear != this.state.currentYear) {
			return;
		}
		this.setState(state);
	}
	//获取年份出租率
	getRate=(id)=>{
		let {
			type,
			page,
			value,
			pageSize,
			communityids,
			dataLoading
		} = this.state;
		this.setState({
			rate:['0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%']
		})
		if(!id && id != 0){
			id = communityids;
			console.log('dsadasda');
		}


		let _this = this;
		var year = this.state.currentYear;

		Store.dispatch(Actions.callAPI('getRate', {
			communityids: id ,
			year: year,
		})).then(function(response) {
			if(!response.rate.length){
				_this.setState({
					rate: ['0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%','0.00%']
				});
			}else{
				_this.setState({
					rate: response.rate,
				});
			}

			


			 

		}).catch(function(err) {

			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}

	//获取计划表数据
	getInstallmentplan() {
		var _this = this;

		let {
			community
		} = this.props;

		let {
			type,
			page,
			value,
			pageSize,
			communityids,
			dataLoading
		} = this.state;



		var year = _this.state.currentYear;

		Store.dispatch(Actions.callAPI('getInstallmentplan', {
			communityids: communityids,
			value: value,
			type: type,
			page: page,
			pageSize: 15,
			year: year,
		})).then(function(response) {

			_this.currentYear = response.year;

			var state = {};

			if (response.vo) {
				var list = response.vo.items;
				var totalCount = response.vo.totalCount;
				var totalPages = response.vo.totalPages;
			} else {
				var list = [];
				var totalCount = 0;
				var totalPages = 0;
			}
			console.log('response',response.vo.totalPages,response.vo.page);
			if(response.vo.totalPages == response.vo.page){
				console.log('fss======dfsd');
				_this.setState({
					istip:true
				})
			}
			_this.setState({
				dataLoading: false
			})


			state = {
				Installmentplan: list,
				// rate: response.rate,
				totalCount: totalCount,
				totalPages: totalPages,
				dataLoading: false
			};



			if (totalPages > page) {
				state.isIscroll = true;
			}


			_this.onSetState(state);


		}).catch(function(err) {

			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});



	}
	onFilter=(value)=>{
		this.setState({
			type:value
		})
	}
	renderNone=(showNone)=>{

		let {
			currentYear,
			Installmentplan,
			rate,
			communityids,
			totalCount,
			isLoading,
			dataLoading,
			totalPages,
			istip,
			page,
			isIscroll
		} = this.state;

		var _this = this;
		const id = communityids;
		console.log('show',dataLoading,showNone);

		if (dataLoading) {
			return (
				<tbody>
					<tr style={{height:200,position:'relative'}}>
						<td colSpan={14} style={{border:'none'}}>
						<div style={{left:'50%',top:'40%',zIndex:100}}><Loading/></div>
						</td>

					</tr>
				</tbody>
			)
		}

		if (!showNone || dataLoading) {
			return (
				<tbody>
				{/*入住率*/}
					<tr className="header-td">
						<td className='white'>
							<div className="header-title">
								<p className="title-right">出租率</p>

							</div>
						</td>
						{
							rate.map((value,index)=><td key={index}>{value}</td>)
						}
						<td className="last"></td>
					</tr>
					<tr style={{height:200}} className="nothing">
						<td colSpan={14} style={{border:'none'}}>
							<div style={{textAlign:'center'}}>
								<div className="ui-nothing">
									<div className="icon"></div>
									<p className="tip">暂时还没有数据呦~</p>
								</div>
							</div>
						</td>
					</tr>
				</tbody>

			)
		}
		if (showNone && !dataLoading) {
			return (
				<tbody>
					{/*入住率*/}
					<tr className="header-td">
						<td className='white'>
							<div className="header-title">
								<p className="title-right">出租率</p>

							</div>
						</td>
						{
							rate.map((value,index)=><td key={index}>{value}</td>)
						}
						<td className="last"></td>
					</tr>

					{
						showNone && Installmentplan.map((item,index)=>{
							let itemData = Object.assign(item);
							return (

							<ItemTable onDismantling={this.onDismantling}  communityids={id} detail={itemData}  key={index} onStation={this.onStation} activity={this.state.activity} currentYear={currentYear} />


							)

						})
					}
				</tbody>

			)

		}
	}

	

	render() {

		let {
			currentYear,
			Installmentplan,
			rate,
			communityids,
			totalCount,
			isLoading,
			dataLoading,
			totalPages,
			istip,
			page,
			isIscroll
		} = this.state;
		var _this = this;

		let {
			tab
		} = this.props;
		if (tab === 'table') {

			$(window).bind('scroll.table', this.scrollLoading());

		} else {
			$(window).off('scroll.table', this.scrollLoading());
		}
		let showNone;
		if (Installmentplan.length) {
			showNone = true;
		} else {
			showNone = false;
		}



		return (
			<div style={{position:'relative',minHeight:908}}>
			{(isLoading && !dataLoading)?<div style={{position:'fixed',left:'50%',top:'40%',zIndex:100}}><Loading/></div>:''}
			{(istip && !dataLoading && !isLoading)?<div style={{width:640,color:'#999',fontSize:'14px',position:'absolute',left:'50%',bottom:'-103px',marginLeft:'-320px',zIndex:100}}><p style={{width:260,borderBottom:'1px solid #cccccc',height:9,float:'left'}} ></p><p style={{float:'left',paddingLeft:'15px',paddingRight:'15px'}}>我是有底线的</p><p style={{width:260,height:9,borderBottom:'1px solid #cccccc',float:'left'}} ></p></div>:''}
		 	<div className="basic-con">
		 		<div className="legend">
		 			<div className="legend-left">
		 				<p>
		 					<span className="txts bule-div" >当前时间</span>
		 					<span className="txts grey-div">过去时间</span>
		 					<span className="circle red"></span>
		 					<span className="txt" >催款回款</span>
		 					<span className="circle green"></span>
		 					<span className="txt" >工位变更</span>
		 					<span className="circle grey-span"></span>
		 					<span className="txt" >回款完成</span>
		 				</p>
		 			</div>
		 		</div>
		 		<SearchForm  onSubmit={this.onSubmit} Ids={communityids} onChange={this.onChange} onFilter={this.onFilter}/>

		 	</div>

			<table className="basic-table" >
				<thead>
					<tr ref={tr=>{this.trLength = tr}}>
						<th onClick={this.onPreYear} className="pre-year">
							{currentYear -1}年 <span className="prev"></span>
						</th>
						<th>1月</th>
						<th>2月</th>
						<th>3月</th>
						<th>4月</th>
						<th>5月</th>
						<th>6月</th>
						<th>7月</th>
						<th>8月</th>
						<th>9月</th>
						<th>10月</th>
						<th>11月</th>
						<th>12月</th>
						<th onClick={this.onNextYear} className="next-year">
								{currentYear*1+1}年 <span className="next"></span>
						</th>
					</tr>
				</thead>
				{this.renderNone(showNone)}

				



			</table>


			<Dialog
				title="撤场日期"
				modal={true}
				onClose={this.openDismantlingDialog}
				open={this.state.dismantling}
				contentStyle={{width:445}}
				>
				<DismantlingForm   onCancel={this.openDismantlingDialog} detail={this.state.detail} />
			 </Dialog>

		</div>
		);


	}

}
