import React, {
	Component,
	PropTypes
} from 'react';

import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import './index.less';

@ReactMixin.decorate(LinkedStateMixin)
export default class Pagination extends Component {
	static displayName = 'Pagination';
	static defaultProps = {
		pageNumber: 10,
		pageJump:6,
	}
	static propTypes = {
		children: React.PropTypes.node,
		page: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		pageSize: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		totalCount: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		onPageChange: React.PropTypes.func,
		pageNumber: React.PropTypes.number,
		pageJump: React.PropTypes.number
	};

	constructor(props) {
		super(props);

		this.onPrev = this.onPrev.bind(this);
		this.onNext = this.onNext.bind(this);
		this.onFirst = this.onFirst.bind(this);
		this.onLast = this.onLast.bind(this);
		this.onPageChange = this.onPageChange.bind(this);
		this.onJumpPage = this.onJumpPage.bind(this);
		this.onFirst = this.onFirst.bind(this);

		this.renderPrev = this.renderPrev.bind(this);
		this.renderFirst = this.renderFirst.bind(this);
		this.renderLast = this.renderLast.bind(this);
		this.renderBody = this.renderBody.bind(this);
		this.createOther = this.createOther.bind(this);
		this.renderJump = this.renderJump.bind(this);
		this.onJump = this.onJump.bind(this);
		this.renderTotalCount = this.renderTotalCount.bind(this);
		this.renderNext = this.renderNext.bind(this);

		this.state = {
			jumpPageValue: ''
		}


	}

	onJump() {

		let {
			jumpPageValue
		} = this.state;

		let {
			pageSize,
			totalCount
		} = this.props;
		let pageMax = Math.ceil(totalCount / pageSize);

		if (jumpPageValue > pageMax) {
			jumpPageValue = pageMax;
		}

		if (jumpPageValue < 1) {
			jumpPageValue = 1;
		}

		this.onPageChange(jumpPageValue);
	}

	onPrev() {

		var {
			page
		} = this.props;

		if (page == 1) {
			return;
		}

		if (page > 0) {
			page--;
		}
		this.onPageChange(page);
	}

	onFirst() {
		this.onPageChange(1);
	}
	onLast() {
		let {
			pageSize,
			totalCount
		} = this.props;
		var page = Math.ceil(totalCount / pageSize);
		this.onPageChange(page);
	}

	onNext() {

		let {
			page,
			pageSize,
			totalCount
		} = this.props;

		if (page == Math.ceil(totalCount / pageSize)) {
			return;
		}


		if (page > 0 && page < Math.ceil(totalCount / pageSize)) {
			page++;
		}

		this.onPageChange(page);
	}

	onJumpPage(event) {
		this.onPageChange(event.target.getAttribute('data-page'));
	}

	onPageChange(page) {

		const {
			onPageChange
		} = this.props;
		onPageChange && onPageChange(page);
	}

	onFirst() {
		this.onPageChange(1);
	}

	renderFirst() {
		let {
			page,
			pageSize,
			totalCount
		} = this.props;

		let props = {};
		props.className = 'item';

		if (page == 1) {
			props.className += ' active';
		}

		return (
			<div className="item-first">
				<a className="item" {...props} onClick={this.onFirst}>1</a>
			</div>
		);
	}

	renderPrev() {

		let {
			page,
			pageSize,
			totalCount
		} = this.props;

		return (
			<div className="item-prev">
				<a className="item" onClick={this.onPrev}></a>
			</div>
		);

	}

	createOther(i) {

		let props = {
			className: 'item',
			key: i
		};

		const handlers = {
			onClick: this.onJumpPage
		}

		return React.createElement('a', {...props,
			...handlers,
			'data-page': i
		}, '...')

	}

	renderBody() {

		let {
			page,
			pageSize,
			totalCount,
			pageNumber,
			pageJump
		} = this.props;


		let pageBody = [];

		let props = {};


		const handlers = {
			onClick: this.onJumpPage
		}

		let pageStart = parseInt(page/pageJump)*pageJump;
		if(pageStart === 0){
					pageStart = 1;
		}
		let pageMax = Math.ceil(totalCount/pageSize);
		let pageEnd = pageStart + pageJump;

		if (pageEnd > pageMax) {
			pageEnd = pageMax;
		}
		if (pageStart == 1) {
			++pageStart;
		}

		let element = null;

		var i = pageStart;
		while (i < pageEnd) {
			props.key = i;
			props.className = 'item';

			if (page == i) {
				props.className += ' active';
			}

			element = React.createElement('a', {...props,
				...handlers,
				'data-page': i
			}, i);
			pageBody.push(element);
			i++;
		}

		return (
			<div className="item-body">
					{pageBody}
			</div>
		);
	}

	renderLast() {

		let {
			page,
			pageSize,
			totalCount
		} = this.props;

        var pageMax = Math.ceil(totalCount / pageSize);

		if (page == 1&&pageMax==1) {
			return;
		}



		let props = {};
		props.className = 'item';

		if (pageMax == page) {
			props.className += ' active';
		}

		return (
			<div className="item-last">
				<a className="item" {...props} onClick={this.onLast} page={pageMax}>{pageMax}</a>
			</div>
		);

	}

	renderNext() {

		let {
			page,
			pageSize,
			totalCount
		} = this.props;

		return (
			<div className="item-next">
				<a className="item" onClick={this.onNext} page={page+1}></a>
			</div>
		);

	}

	renderPrevMore = ()=>{

		let {page,pageJump} = this.props;
		let props = {
			className:'item'
		};
		if(page<pageJump){
				return null;
		}
		const handlers = {
			onClick: this.onJumpPage
		}


		var element = this.createOther(parseInt(page/pageJump)*pageJump-1);

		return(
			<div className="item-body">
					{element}
			</div>
		);
	}

	renderNextMore = ()=>{

		let {page,pageJump,totalCount,pageSize} = this.props;

		let props = {
			className:'item'
		};


		var pageMax = Math.ceil(totalCount/pageSize);


		if(Math.ceil(totalCount/pageSize)<pageJump || page>=(pageMax-pageJump)){
				return null;
		}
		const handlers = {
			onClick: this.onJumpPage
		}
		var element = this.createOther((parseInt(page/pageJump)+1)*pageJump+1);
		return(
			<div className="item-body">
					{element}
			</div>
		);
	}

	renderJump() {
		let {
			page,
			pageSize,
			totalCount
		} = this.props;
		return (
			<div className="item-jump">
				<span>到</span>
				<input type="text" name="age"  valueLink={this.linkState('jumpPageValue')} />
				<a style={{boxShadow:' 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2)'}}  onClick={this.onJump}>跳&nbsp;&nbsp;转</a>
			</div>
		);
	}

	renderTotalCount() {

		let {
			totalCount
		} = this.props;

		totalCount = totalCount || 0;

		return (
			<div className="item-total-count">
				<span>共</span>
				<span className="num">{totalCount}</span>
				<span>条记录</span>
			</div>
		);
	}
	render() {

		return (

			<div className="ui-pagination">
					{this.renderTotalCount()}
					{this.renderPrev()}
					{this.renderFirst()}
					{this.renderPrevMore()}
					{this.renderBody()}
					{this.renderNextMore()}
					{this.renderLast()}
					{this.renderNext()}
					{this.renderJump()}
		  </div>

		);
	}

}
