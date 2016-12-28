import React from 'react';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRowColumn from '../TableRowColumn';

import Pagination from '../../Pagination';

import {
	Button
} from 'kr-ui/Button';


import './index.less';

export default class TableFooter extends React.Component {

	static displayName = 'TableFooter';

	static defaultProps = {
		exportSwitch: false,
	}

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		page: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		pageSize: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		totalCount: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		displayCheckbox: React.PropTypes.bool,
		pagination: React.PropTypes.bool,
		onSelectAll: React.PropTypes.func,
		onExport: React.PropTypes.func,
		onPageChange: React.PropTypes.func,
		exportSwitch: React.PropTypes.bool,
		renderOther:React.PropTypes.func,
	}


	constructor(props) {
		super(props);

		this.onExport = this.onExport.bind(this);
		this.onPageChange = this.onPageChange.bind(this);
		this.onSelectAll = this.onSelectAll.bind(this);

		this.renderCheckbox = this.renderCheckbox.bind(this);
		this.renderPagination = this.renderPagination.bind(this);
		this.renderExport = this.renderExport.bind(this);

	}

	onSelectAll() {
		const {
			onSelectAll
		} = this.props;
		onSelectAll && onSelectAll();
	}

	onExport() {
		const {
			onExport
		} = this.props;
		onExport && onExport();
	}
	onImport=()=>{
		const {onImport}=this.props;
		onImport && onImport();
	}
	batchDelet=()=>{
		const {batchDelet} = this.props;
		batchDelet && batchDelet();
	}

	onPageChange(page) {
		const {
			onPageChange
		} = this.props;
		onPageChange && onPageChange(page);
	}


	renderCheckbox() {

		let {
			displayCheckbox
		} = this.props;

		if (!displayCheckbox) {
			return null;
		}

		return (<TableRowColumn width={this.props.defaultValue.checkboxWidth}><input type="checkbox" onTouchTap={this.onSelectAll}/></TableRowColumn>);

	}


	renderPagination() {

		let {
			pagination,
			totalCount,
			page,
			pageSize
		} = this.props;

		if (!pagination) {
			return null;
		}
		return (
			<Pagination totalCount={totalCount} page={page} pageSize={pageSize} onPageChange={this.onPageChange}/>
		);
	}

	renderExport() {

		let {
			exportSwitch
		} = this.props;

		if (!exportSwitch) {
			return;
		}

		return (
			<a style={{width:80,height:30,background:'#499df1',color:'#fff',display:'inline-block',borderRadius:'4px',lineHeight:'30px',textAlign:'center',boxShadow:' 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2)',marginRight:20,cursor: 'pointer'}}  onClick={this.onExport}>导&nbsp;&nbsp;出</a>
		);

	}

	render() {

		let {
			className,
			children,
			totalCount,
			page,
			pageSize,
			footer,
			batchDelet,
			onImport,
			renderOther,
			exportSwitch
		} = this.props;

		if (!footer) {
			return null;
		}
		let num = 1;
		if(onImport && batchDelet && exportSwitch){
			num = 4;
		}

		return (
			<tfoot className="tfoot">
				<tr>
				{/*
                  {this.renderCheckbox()}
				*/}
				<TableRowColumn style={{textAlign:'left'}} colSpan={num}>
					{this.renderExport()}
					{renderOther && renderOther()}
				</TableRowColumn>





				    <TableRowColumn  colSpan={100} align="right">
						{this.renderPagination()}
					</TableRowColumn>
				</tr>
			</tfoot>
		);

	}
}
