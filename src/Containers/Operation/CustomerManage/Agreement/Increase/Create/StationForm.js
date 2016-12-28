import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import Param from 'jquery-param';
import { Fields } from 'redux-form';

import {reduxForm,formValueSelector,initialize,arrayPush,arrayInsert} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Dialog,

	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	IframeContent,
	KrDate,
} from 'kr-ui';


class StationForm  extends Component{


	constructor(props,context){
		super(props, context);

		this.onStationDelete = this.onStationDelete.bind(this);
		this.onStationSelect = this.onStationSelect.bind(this);

	}

	//删除工位
	onStationDelete(){
		let {selectedStation,billList} = this.state;
		billList = billList.filter(function(item,index){

			if(selectedStation.indexOf(index) != -1){
				return false;
			}
			return true;
		});
		this.setState({
			billList
		});
	}

	onStationSelect(selectedStation){
		this.setState({
			selectedStation
		})
	}


	render(){

		return (

			<div>

				<Section title="租赁明细" description="" rightMenu = {
					<Menu>
						<MenuItem primaryText="录入单价" />
						<MenuItem primaryText="删除" onTouchTap={this.onStationDelete} />
						<MenuItem primaryText="租赁"  onTouchTap={this.openStationDialog} />
					</Menu>
				}>

				<Table  displayCheckbox={true} onSelect={this.onStationSelect}>
				<TableHeader>
				<TableHeaderColumn>类别</TableHeaderColumn>
				<TableHeaderColumn>编号／名称</TableHeaderColumn>
				<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
					<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
						<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
						</TableHeader>
						<TableBody>

								<TableRow>
									<TableRowColumn>'工位':'会议室'</TableRowColumn>
									<TableRowColumn></TableRowColumn>
									<TableRowColumn>
										<input type="text" name="hah" onChange={(event)=>{this.onStationInputChange}}/>
									</TableRowColumn>
									<TableRowColumn> <KrDate value={initialValues.leaseBegindate}/></TableRowColumn>
									<TableRowColumn><KrDate value={initialValues.leaseEnddate}/></TableRowColumn>

									</TableRow>
						{billList.map((item,index)=>{
							return (
								<TableRow key={index}>
									<TableRowColumn>{(item.type == 1) ?'工位':'会议室'}</TableRowColumn>
									<TableRowColumn>{item.name}</TableRowColumn>
									<TableRowColumn>
										<input type="text" name="hah" value={item.unitprice}  onChange={(event)=>{this.onStationInputChange.bind(this,event,index)}}/>
									</TableRowColumn>
									<TableRowColumn> <KrDate value={initialValues.leaseBegindate}/></TableRowColumn>
									<TableRowColumn><KrDate value={initialValues.leaseEnddate}/></TableRowColumn>

									</TableRow>
							);
						})}
						</TableBody>
						</Table>

						</Section>

			</div>);
	}
	}
