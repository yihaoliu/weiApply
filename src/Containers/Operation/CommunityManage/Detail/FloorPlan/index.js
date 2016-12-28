import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import {
	Actions,
	Store
} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';
import $ from 'jquery';
import dateFormat from 'dateformat';
import DatePicker from 'material-ui/DatePicker';
import {
	Dialog,
	Section,
	Grid,
	Form,
	Notify,
	KrField,
	BreadCrumbs,
	IframeContent,
	Button,
	Row,
	Col,
	ListGroup,
	ListGroupItem
} from 'kr-ui';
import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';


export default class FloorPlan extends Component {
	// static contextTypes = {
	// 	onSetCommunity: React.PropTypes.func.isRequired,
	// 	communityId: React.PropTypes.string.isRequired,
	// }
	static defaultProps = {
		tab: '',
	}

	constructor(props, context) {
		super(props, context);
		let _this = this;
		this.getStationUrl = this.getStationUrl.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.scrollLoad = this.scrollLoad.bind(this);
		this.onLoad = this.onLoad.bind(this);
		this.iframeWindow = null;
		this.state = {

			form: {},
			floors: '',
			community: '',
			communityIdList: [],
			communityInfoFloorList: [],
			url: '',
			dateend: dateFormat(new Date(), "yyyy-mm-dd"),
			date: dateFormat(new Date(), "yyyy-mm-dd")
		}

		this.getcommunity = this.getcommunity.bind(this);
		this.selectCommunity = this.selectCommunity.bind(this);
		this.getcommunity();
		this.getCommunityFloors = this.getCommunityFloors.bind(this);
		this.selectFloors = this.selectFloors.bind(this);
		Store.dispatch(change('FloorPlan', 'start', dateFormat(new Date(), "yyyy-mm-dd")));
		Store.dispatch(change('FloorPlan', 'end', dateFormat(new Date(), "yyyy-mm-dd")));


	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.url != this.props.url) {
			this.setState({
				url: nextProps.url
			}, function() {
				this.getStationUrl();
			});
		}
	}


	onLoad(iframeWindow) {
		this.iframeWindow = iframeWindow;

	}



	componentDidMount() {
		this.setState({
			url: this.getStationUrl()
		})


	}

	getStationUrl(form) {


		let url = "/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanList?communityId={communityId}&wherefloor={wherefloor}&date={date}&dateend={dateend}";

		var formList = form || {};
		let params;
		let {
			community,
			floors,
			date,
			dateend

		} = this.state;
		if (community == 0) {
			community = '';
		}

		params = {
			communityId: community,
			wherefloor: floors,
			date: date,
			dateend: dateend,
		}

		if (Object.keys(params).length) {
			for (let item in params) {
				if (params.hasOwnProperty(item)) {
					url = url.replace('{' + item + '}', params[item]);
					delete params[item];
				}
			}
		};

		return url;
	}
	onSubmit(form) {
			form = Object.assign({}, form);

			let {
				floors,
				community
			} = this.state;
			var that = this;
			var params = {
				communityId: community,
				wherefloor: floors,
				date: dateFormat(form.start, "yyyy-mm-dd") || dateFormat(new Date(), "yyyy-mm-dd"),
				dateend: dateFormat(form.end, "yyyy-mm-dd") || dateFormat(new Date(), "yyyy-mm-dd"),
			};
			if (form.start && form.end) {
				var datastart = Date.parse(form.start),
					dataend = Date.parse(form.end);
				if (datastart > dataend) {
					Notify.show([{
						message: '开始时间不能大于结束时间',
						type: 'danger',
					}]);

				} else {
					this.setState({
						date: dateFormat(form.start, "yyyy-mm-dd"),
						dateend: dateFormat(form.end, "yyyy-mm-dd"),
						url: this.getStationUrl(params)
					})
				}

			} else {
				Notify.show([{
					message: '注册时间不能为空',
					type: 'danger',
				}]);
			}


		}
		// 监听滚动事件
	scrollLoad() {
		var that = this;
		$(window).bind('scroll', function() {
			var top = $(window).scrollTop() || 0; //539滚出的距离
			var height = $(window).height() || 0; //705浏览器高度
			var num = $(document).height() - $(window).height(); //页面高-浏览器高度
			// var scrollBottom = $('#planTable').offset().top +1000 - top - height;
			var scrollBottom = top - num;
			var isOutBoundary = scrollBottom >= 0;
			if (isOutBoundary) {
				that.iframeWindow.pagequery();

			}
		})


	}
	getcommunity() {
		let _this = this;
		let {
			communityIdList
		} = this.state;
		Store.dispatch(Actions.callAPI('getCommunity')).then(function(response) {
			communityIdList = response.communityInfoList.map(function(item, index) {
				item.value = item.id;
				item.label = item.name;
				return item;
			});
			communityIdList.unshift({
				label: '请选择',
				value: '0',
				id: '0',
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
		let id = '';
		if (personel) {
			id = personel.id;
			this.getCommunityFloors(personel.id);
		}

		Store.dispatch(change('FloorPlan', 'floor', ''));

		this.setState({
			community: id,
			floors: '',

		})

	}

	getCommunityFloors(id) {
		let communityId = {
			communityId: parseInt(id)
		};
		var communityInfoFloorList;
		var that = this;
		Store.dispatch(Actions.callAPI('getCommunityFloors', communityId)).then(function(response) {
			communityInfoFloorList = response.floors.map(function(item, index) {
				var obj = {};
				obj.value = item;
				obj.label = item;
				return obj;
			});
			that.setState({
				communityInfoFloorList
			});
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	selectFloors(personel) {
		let value = '';
		if (personel) {
			value = personel.value;
		}
		this.setState({
			floors: value
		})
	}
	firstDate = (personel) => {

		// Store.dispatch(change('FloorPlan', 'start', dateFormat(new Date(), "yyyy-mm-dd")));
		let firstDate = new Date(personel);
		let {date} = this.state;
		if (this.state.dateend) {
			let endDate = new Date(this.state.dateend);
			let start = firstDate.getTime();
			let end = endDate.getTime();
			if (start <= end) {
				this.setState({
					date: personel
				})
			} else {
				Notify.show([{
					message: '结束时间不能小于开始时间',
					type: 'danger',
				}]);
				Store.dispatch(change('FloorPlan', 'start', dateFormat(date, "yyyy-mm-dd")));
			}
		} else {
			this.setState({
				date: personel
			})
		}
	}
	secondDate = (personel) => {
		let {dateend}= this.state;

		let secondDate = new Date(personel);
		let end = this.state.dateend;
		if (this.state.date) {
			let firstDate = new Date(this.state.date);
			let start = firstDate.getTime();
			let end = secondDate.getTime();
			if (start <= end) {
				this.setState({
					dateend: personel
				})
			} else {
				Notify.show([{
					message: '结束时间不能小于开始时间',
					type: 'danger',
				}]);
				Store.dispatch(change('FloorPlan', 'end', dateFormat(dateend, "yyyy-mm-dd")));
			}
		} else {
			this.setState({
				dateend: personel
			})
		}



	}

	render() {

		const {
			height,
			communityLabel,
			communityIdList,
			communityId,
			communityInfoFloorList,
			dateend,
			date
		} = this.state;
		let url = this.getStationUrl();

		let {
			tab,
			handleSubmit
		} = this.props;

		if (tab === 'floorplan') {
			$(window).bind('scroll.floorplan', this.scrollLoad());

		} else {
			$(window).unbind('scroll.floorplan', this.scrollLoad());
		}

		return (

			<div id="planTable" style={{margin:20,paddingBottom:30}}>
		 	<form name="planTable" onSubmit={handleSubmit(this.onSubmit)} className="form-list" style={{textAlign:'right'}}>
				
					<ListGroup>
						<ListGroupItem><span style={{display:'inline-block',lineHeight:'45px',textAlign:'left'}}>社区</span></ListGroupItem>
						<ListGroupItem style={{maxWidth:170,marginTop:'-6px',minWidth:110,width:'100%',textAlign:'left'}}><KrField grid={1/1} name="community" component="select"   options={communityIdList} onChange={this.selectCommunity} /></ListGroupItem>
						<ListGroupItem><span style={{display:'inline-block',lineHeight:'45px',textAlign:'left'}}>楼层</span></ListGroupItem>
						<ListGroupItem  style={{maxWidth:170,marginTop:'-6px',minWidth:100,width:'100%',textAlign:'left'}}><KrField name="floor" grid={1/1} component="select" options={communityInfoFloorList} onChange={this.selectFloors}/></ListGroupItem>
						<ListGroupItem style={{minWidth:100,marginTop:'-6px',marginLeft:'-3px',textAlign:'left'}}> <KrField name="start"  component="date"  simple={true} onChange={this.firstDate}/></ListGroupItem>
						<ListGroupItem style={{marginLeft:'10px',textAlign:'left'}}><span style={{display:'inline-block',lineHeight:'45px'}}>至</span></ListGroupItem>
						<ListGroupItem  style={{minWidth:100,marginTop:'-6px',textAlign:'left'}}> <KrField name="end" component="date" simple={true}  onChange={this.secondDate}/> </ListGroupItem>
						{/*<ListGroupItem style={{marginLeft:6,marginTop:4,textAlign:'left'}}> <Button  label="确定" type="submit" height={34}/></ListGroupItem>*/}
					</ListGroup>
			</form>
			<p style={{margin:10}}></p>
			<IframeContent src={url} onClose={this.getState} className="floorIframe" onLoad={this.onLoad} width={'100%'} height={800} scrolling="no"/>

		</div>
		);
	}
}

FloorPlan = reduxForm({
	form: 'FloorPlan'
})(FloorPlan);