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
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	Tooltips,
	BreadCrumbs
} from 'kr-ui';

import {
	findDOMNode
} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import dateFormat from 'dateformat';
import $ from 'jquery';

export default class D3Content extends Component {


	static defaultProps = {
		detail: [],
		finaBluePointVo: [],
		finaRedPointVo: [],
		whiteBar: [],
		BlueinfoList:[],
		infoList:[]
	}

	static propTypes = {
		params: React.PropTypes.object
	}

	constructor(props, context) {
		super(props, context);

		this.countDays = this.countDays.bind(this);
		this.dealTime = this.dealTime.bind(this);
		this.getSpace = this.getSpace.bind(this);
		this.appendDiv = this.appendDiv.bind(this);
		this.timeNode = this.timeNode.bind(this);
		this.getSameTime = this.getSameTime.bind(this);
		this.renderBlueNode = this.renderBlueNode.bind(this);
		this.renderRedNode = this.renderRedNode.bind(this);
		this.renderwhiteBar = this.renderwhiteBar.bind(this);
		this.state = {
			detail:this.props.detail,
			finaBluePointVo:this.props.finaBluePointVo,
			finaRedPointVo:this.props.finaRedPointVo,
			whiteBar:this.props.whiteBar,
		}
		this.NodeList = this.getSameTime();
		this.sameNode = this.NodeList[0];

	}

	componentDidMount() {

	}
	componentWillReceiveProps(nextProps) {


    if (!_.isEqual(this.props.detail, nextProps.detail)) {
      this.setState({
        detail: nextProps.detail
      });
    }
    if (!_.isEqual(this.props.finaBluePointVo, nextProps.finaBluePointVo)) {
      this.setState({
        detail: nextProps.finaBluePointVo
      });
    }
    if (!_.isEqual(this.props.finaRedPointVo, nextProps.finaRedPointVo)) {
      this.setState({
        detail: nextProps.finaRedPointVo
      });
    }
    if (!_.isEqual(this.props.whiteBar, nextProps.whiteBar)) {
      this.setState({
        detail: nextProps.whiteBar
      });
    }
    this.NodeList = this.getSameTime();
	this.sameNode = this.NodeList[0];


  }

	// 计算第几天
	countDays(date) {
			var {
				currentYear
			} = this.props;
			let year = `${currentYear}-1-1`;
			// var initial = (new Date('2016-1-1')).getTime();
			var initial = (new Date(year)).getTime();
			var offset = date - initial;
			return (offset / 24 / 3600 / 1e3) + 1;
			// return Math.ceil(offset / 24 / 3600) + 1;
		}
		// 处理时间段
	dealTime() {
			var {
				detail
			} = this.props;

			detail = Object.assign({}, detail);

			let width;
			var _this = this;
			let newArr = [];

			for (let j in detail) {
				for (let prop in detail[j]) {
					if (prop != '' || detail[j][prop] != '') {
						newArr.push(detail[j]);
					}
				}
			};
			var unique = {};
			newArr.forEach(function(a) {
				unique[JSON.stringify(a)] = 1
			});
			newArr = Object.keys(unique).map(function(u) {
				return JSON.parse(u)
			});

			var timeList = newArr.map(function(item) {
				item.start = _this.countDays(item.begindate);
				item.end = _this.countDays(item.enddate);
				item.Begindate = dateFormat(item.begindate, "yyyy.mm.dd");
				item.Enddate = dateFormat(item.enddate, "yyyy.mm.dd");
				// item.width = parseInt((item.end - item.start) / 365 * width); //时间段的长度
				width = (item.end - item.start) / 365; //时间段的长度
				// item.width = Math.ceil(width*100)/100;
				// item.left = Math.ceil((item.start*10000/365)*100)/10000 ;
				item.width = (width * 100) / 100;
				item.left = ((item.start * 10000 / 365) * 100) / 10000;
				item.left = item.left;
				return item;
			});
			return timeList;
		}
		// 获取分期前的空白时间段
	getSpace(timeList) {
		let whiteLength;
		// var whiteWidth = parseInt((timeList[0].start) / 365 * width);
		var whiteWidth = (timeList[0].start) / 365;
		var whiteNode = {
			start: 0,
			end: timeList[0].start,
			// width: Math.ceil(whiteWidth*100)/100
			width: (whiteWidth * 100) / 100
		}
		return whiteNode;
	}
	appendDiv(list, time) {
			var nowNode;
			list && list.map((item, index) => {
				if (index === 0 && item.begindate > time) {
					nowNode = 0;
				}
				if (index === list.length - 1 && item.end < time) {
					nowNode = index + 1;
				}
				if (item.start <= time && item.end >= time) {
					nowNode = index;
				}
			});
			return nowNode;
		}
		// 催款时间和工位变更时间节点位置（px）
	timeNode(date) {
			var days = this.countDays(date);
			var marginLeft = days / 365;
			marginLeft = Math.round(marginLeft * 100) / 100
				// var marginLeft = parseInt(days / 365 * width);
			return marginLeft;
		}
		// 获取相同时间节点天数(天)
	getSameTime() {
		var that = this;
		let finaBluePointVo = this.renderBlueNode();
		let finaRedPointVo = this.renderRedNode();
		let finaBluePointVoList = [].concat(finaBluePointVo);
		let finaRedPointVoList = [].concat(finaRedPointVo);
		let sameNode = [];

		finaBluePointVo.map((item) => {
			finaRedPointVo.map((value) => {
				if (item.pointDay === value.pointDay) {
					var obj = value;
					// obj.arr = [];
					// obj.arr.concat(value.plan);
					let node = $.extend(item, obj);
					sameNode.push(node);
				}
			});

		})
		if (sameNode.length) {
			sameNode.map((item) => {
				item.pointDay = that.countDays(item.pointDate);
				finaRedPointVoList.map((value, index) => {
					if (item.pointDay === value.pointDay) {
						finaRedPointVoList.splice(index, 1);
						//console.log('finaRedPointVoList-----', finaRedPointVoList)



					}
				})
			})

		}
		if (sameNode.length) {
			sameNode.map((item) => {
				item.pointDay = that.countDays(item.pointDate);
				finaBluePointVoList.map((value, index) => {
					if (item.pointDay === value.pointDay) {
						finaBluePointVoList.splice(index, 1);
					}
				})
			})

		}

		var unique = {};
		sameNode.forEach(function(a) {
			unique[JSON.stringify(a)] = 1
		});
		sameNode = Object.keys(unique).map(function(u) {
			return JSON.parse(u)
		});
		let NodeList = [sameNode, finaBluePointVoList, finaRedPointVoList];
		return NodeList;
	}

	renderBlueNode() {

		let {
			finaBluePointVo
		} = this.props;

		const that = this;
		let finaBluePointVoList = finaBluePointVo.map((item,index) => {
			item.pointDay = that.countDays(item.pointDate);
			item.left = (Math.round((that.countDays(item.pointDate)/365)*100)/100)*100;
			return item
		});
		return finaBluePointVoList;

	}

	renderRedNode() {

		let {
			finaRedPointVo
		} = this.props;
		let finaRedPointVoList = finaRedPointVo;
		var {
				currentYear
			} = this.props;
		let year = `${currentYear}-1-1`;
		var initial = (new Date(year)).getTime();

		const that = this;
		let newArr = [];

		for (let j in finaRedPointVoList) {
			finaRedPointVoList[j].pointDay = that.countDays(finaRedPointVoList[j].pointDate);
		};

		for (let j in finaRedPointVoList) {
			if (finaRedPointVoList[j].pointDate < initial) {
				finaRedPointVoList.splice(j, 1);
			}
		};
		//判断时间点是否重合,若重合，合并数据
		// if (finaRedPointVoList.length === 1) {
		// 	finaRedPointVoList[0].arr = [];
		// 	finaRedPointVoList[0].arr = finaRedPointVoList[0].arr.concat(finaRedPointVoList[0].plan);
		// }	
		// for (var i = 0; i <= finaRedPointVoList.length - 1; i++) {
		// 	finaRedPointVoList[i].arr = [];
		// 	finaRedPointVoList[i].arr = finaRedPointVoList[i].arr.concat(finaRedPointVoList[i].plan);
		// 	for (var j = finaRedPointVoList.length - 1; j >= 0; j--) {
		// 		if (finaRedPointVoList[i].pointDate === finaRedPointVoList[j].pointDate && i != j) {
		// 			finaRedPointVoList[i].arr = finaRedPointVoList[i].arr.concat(finaRedPointVoList[j].plan);
		// 		}
		// 	}
		// }


		return finaRedPointVoList;

	}
	renderwhiteBar() {
		let {
			whiteBar
		} = this.props;
		let that = this;
		whiteBar = whiteBar.map((item) => {
				let days = that.countDays(item);
				let num = (days * 10000 / 365) / 10000 * 100;
				// let num = Math.ceil((days*10000/365)/10000*100) ;
				return num;
			})
			// if(whiteBar.length>1){whiteBar.pop();}

		return whiteBar;
	}
	getLeft=(value)=>{
		var {
				currentYear
			} = this.props;
		let start = `${currentYear}-1-1`;
		let end = `${currentYear-1}-12-31 12:00:00`;
		let startTime = `${currentYear}-1-1 12:00:00`;
		let left = '-5px';
		start = (new Date(start)).getTime();
		end = (new Date(end)).getTime();
		if(value == end || value >= start){
			left = '-5px';
		}
		if(value == startTime){
			left = "10px";
		}
		return left;
	}
	getRedInfo(data){
		let _this =this;
		let id = this.props.id;
		let remindDate = dateFormat(data.pointDate,'yyyy-mm-dd HH:MM:ss');
	    Store.dispatch(Actions.callAPI('getRedPoint',{billId:id,remindDate:remindDate})).then(function(response) {

	      

	      _this.setState({
	        infoList:response,
	      },function(){
	        this.renderRedInfo(data)
	      });
	      


	    }).catch(function(err) {
	    	console.log(err,err);
	    });
	}
	renderRedInfo=(itemData)=>{
		let {infoList} = this.state;
		let item = infoList || [];
		let id = this.props.id;
		let top = 250;
		let place = 'top';
		if(item.length>1){
			place = 'bottom';
			top = 250*item.length;
		}
		return (
			<Tooltips  place={place} type="dark" effect="solid" scroll={false} id={`${item.pointDate}${id}`} offsetTop={top}>
			<div className="react-tooltips-content">
			{item.map((value,i)=>{
				return(
					<div key={i} className="react-tooltip-content">
						<span>{value.contractName}分期催款</span>
						<p>{dateFormat(itemData.pointDate, "yyyy.mm.dd")}日催款({dateFormat(value.installmentBegindate, "yyyy.mm.dd")}-{dateFormat(value.installmentEnddate, "yyyy.mm.dd")})</p>
						<p>工位:<span className='red-content'>{value.stationnum}</span> &nbsp; 会议室:<span className='red-content'>{value.boardroomNum}</span>({dateFormat(value.billStartDate, "yyyy.mm.dd")}-{dateFormat(value.billEndDate, "yyyy.mm.dd")})</p>
						<p>负责人：<span className='red-content'>{value.name?value.name:'—'}</span></p>
						<p>电话：<span className='red-content'>{value.phone?value.phone:'—'}</span></p>
						<p>催款金额：<span className='red-content'>{value.installmentAmount}</span></p>
						<span className="content-lines"></span>
						<p>回款金额：<span className='red-content'>{value.installmentBackamount}</span></p>
						<p>回款时间：<span className='red-content'>{value.installmentBackamountDate?dateFormat(value.installmentBackamountDate, "yyyy.mm.dd"):'—'}</span></p>
					</div>
				)
			})}
				</div>							
			</Tooltips>
		)
	}
	getBlueInfo(data){
		let _this =this;
		let id = this.props.id;
	    Store.dispatch(Actions.callAPI('getBluePoint',{billId:id,detailId:data.detailId})).then(function(response) {

	      

	      _this.setState({
	        BlueinfoList:response,
	      },function(){
	        this.renderBlueInfo()
	      });
	      


	    }).catch(function(err) {
	    	console.log(err,err);
	    });
	}
	renderBlueInfo=()=>{
		let {BlueinfoList} = this.state;
		let item = BlueinfoList || [];
		let id = this.props.id;
		return (
			<Tooltips  place="top" type="dark" effect="solid" id={`${item.pointDate}${id}sameblue`} offsetTop={130}>
					<div className="react-tooltip-content">
						<span>工位变更</span>
						<p>{item.finaName}({dateFormat(item.leaseBeginDate, "yyyy.mm.dd")}-{dateFormat(item.leaseEndDate, "yyyy.mm.dd")})</p>
						<p>变更前工位：<span className='blue-content'>{item.oldStationNum}</span> &nbsp; 会议室：<span className='blue-content'>{item.oldBoardroomNum}</span></p>
						<p>变更后工位：<span className='blue-content'>{item.newStationNum}</span> &nbsp; 会议室：<span className='blue-content'>{item.newBoardroomNum}</span></p>
					</div>
											
			</Tooltips>
		)
	}

	render() {
		var {
			finaBluePointVo,
			finaRedPointVo,
			id,
			detail,
			currentYear
		} = this.props;
		let that = this;
		if (detail.length) {
			// 获取当前时间
			var timestamp = new Date().getTime();
			var now = this.countDays(timestamp);
			// 处理时间段
			var list = this.dealTime();
			var whiteNode = this.getSpace(list);
			list.unshift(whiteNode);
			var nodeList = this.appendDiv(list, now);
			var redNodeList = this.NodeList[2];
			var blueNodeList = this.NodeList[1];
			var sameNode = this.NodeList[0];

		} else {
			var list = [{
				width: "100%",
			}];
		}
		let whiteBar = this.renderwhiteBar();




		return (

			<div className="d3-container">
			<div className="year">
				{list.map((item,index)=>{
						if(index == 0 ){
							return(
								<div className='white' style={{'width':`${item.width*100}%`}} key={index}>
									{item.content?<span></span>:''}
									
								</div>

								)
						}else if(index<nodeList && index !== 0){
							return(
								<div className='grey' style={{'width':`${item.width*100}%`,marginLeft:`${item.left}%`}} key={index} >
								</div>
							)
						}else{
							return (
								<div className='blue' style={{'width':`${item.width*100}%`,marginLeft:`${item.left}%`}} key={index}>
								</div>
							)
						}
					})}

				{
					whiteBar && whiteBar.map((item,index)=>{
						if(item<100){
							return(
								<span className="wihiteBar" style={{marginLeft:`${item}%`}} key={index}></span>
							)
						}
						
					})
				}
				{
					blueNodeList && blueNodeList.map((item,index)=>{
						return (
							<span className='blue-node' key={index} style={{marginLeft:`${item.left}%`}} data-tip data-for={`${item.pointDate}${id}sameblue`} onMouseOver={this.getBlueInfo.bind(this,item)}>
							{this.renderBlueInfo()}
							</span>
						)
						
						
					})
				}
				{
					redNodeList && redNodeList.map((item,index)=>{
						
						let nodeKind = item.color===1?'grey-circle':'red-node';
						let left = this.getLeft(item.pointDate);

						
						return (
							<span className={`${nodeKind}`} key={index} style={{marginLeft:`${(Math.round((item.pointDay/365)*100)/100)*100}%`,left:left,position:'absolute'}} data-tip data-for={`${item.pointDate}${id}`} onMouseOver={this.getRedInfo.bind(this,item)}>
								{this.renderRedInfo(item)}
							</span>
						)
					})
				}
				{
					sameNode && sameNode.map((item,index)=>{
						
						let nodeKind = item.color===1?'grey-circle':'red-node';
						return (
							<div className='same-div'  key={index} style={{marginLeft:`${(Math.round((item.pointDay/365)*100)/100)*100}%`}} >
								<span className='blue-node' data-tip data-for={`${item.pointDate}${item.newStationNum}${index}sameblue`} onMouseOver={this.getBlueInfo.bind(this,item)}>
									{this.renderBlueInfo()}
								</span>
								<span className={`${nodeKind}`} data-tip data-for={`${item.pointDate}${item.newStationNum}${index}samered`} onMouseOver={this.getRedInfo.bind(this,item)}>
									{this.renderRedInfo(item)}
							</span>
							</div>
						)
					})
				}
				

			</div>

			
		</div>
		);
	}
}