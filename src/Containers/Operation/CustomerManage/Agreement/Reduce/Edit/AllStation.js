import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import {
	Binder
} from 'react-binding';
import dateFormat from 'dateformat';
import {
	reduxForm,
	formValueSelector,
	change,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray
} from 'redux-form';

import {
	Actions,
	Store
} from 'kr/Redux';

import {
	Form,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	KrDate,
} from 'kr-ui';

class SelectStationForm extends Component {

	static PropTypes = {
		searchParams: React.PropTypes.object,
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}
	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);


		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.getLoadData = this.getLoadData.bind(this);
		this.onChangeRentBeginDate = this.onChangeRentBeginDate.bind(this);

		this.state = {
			stationVos: [],
			selected: [],
		}

	}

	componentDidMount() {
		this.getLoadData();
	}


	onChangeRentBeginDate(value) {
		value = dateFormat(value, 'yyyy-mm-dd') + ' 00:00:00';
		let {
			stationVos,
			selected
		} = this.state;


		let {
			leaseEnddate
		} = this.props.changeValues;
		//判断选择的时间是否大于租赁起始时间
		let endDate = leaseEnddate;
		let rentBeginDate = Date.parse(dateFormat(value, 'yyyy-mm-dd') + ' 00:00:00');

		if (endDate < rentBeginDate) {
			Notify.show([{
				message: '选择的减租开始时间不能大于租赁期限的终止时间',
				type: 'danger',
			}]);
			return false;
		}

		if (!selected.length) {
			Notify.show([{
				message: '未选择减租工位',
				type: 'danger',
			}]);
			return;
		}
		stationVos = [].concat(stationVos);
		//比较减租开始日期不能小于工位起始日期
		let isOK = true;
		stationVos.map(function(item, index) {
			let stationStartDate = Date.parse(dateFormat(item.leaseBeginDate, 'yyyy-mm-dd'));
			if (rentBeginDate < stationStartDate) {
				isOK = false;
			}
		});

		if (!isOK) {
			Notify.show([{
				message: '减租开始日期不能小于工位开始的时间',
				type: 'danger',
			}]);
			return;
		}

		stationVos.map(function(item, index) {
			if (selected.indexOf(index) !== -1) {
				item.rentBeginDate = value;
			} else {
				item.rentBeginDate = '';
			}
			return item;
		});

		this.setState({
			stationVos
		});

	}


	getLoadData() {
		var _this = this;
		let {
			params
		} = this.context;
		Store.dispatch(Actions.callAPI('getStationOrSettingList', {
			mainBillid: params.orderId,
			page: 1,
			pagesize: 100,
			contractId: params.id
		})).then(function(response) {
			_this.setState({
				stationVos: response.items
			});
		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员',
				type: 'danger',
			}]);
		});
	}

	onSelect(selected) {
		this.setState({
			selected
		}, function() {

		});
	}

	onSubmit() {

		let {
			stationVos,
			selected
		} = this.state;
		let selectedStationVos = [];

		selectedStationVos = stationVos.filter(function(item, index) {
			if (selected.indexOf(index) !== -1) {
				return true;
			}
			return false;
		});


		if (!selectedStationVos.length) {
			Notify.show([{
				message: '请选择工位',
				type: 'danger',
			}]);

			return;
		}

		//选中的必须要有租赁结束日期
		var someStartDate = true;

		selectedStationVos.forEach(function(item, index) {
			if (!item.rentBeginDate) {
				someStartDate = false;
			}
		});

		if (!someStartDate) {
			Notify.show([{
				message: '选择的工位必须要有租赁开始时间',
				type: 'danger',
			}]);
			return;
		}

		//工位结束时间相同
		var some = true;
		selectedStationVos.sort(function(pre, next) {
			var preDate = dateFormat(pre.leaseEndDate, 'yyyy-mm-dd');
			var nextDate = dateFormat(next.leaseEndDate, 'yyyy-mm-dd');
			if (preDate != nextDate) {
				some = false;
			}
			return -1;
		});

		if (!some) {
			Notify.show([{
				message: '请选择相同日期',
				type: 'danger',
			}]);
			return false;
		}

		//修改日期
		var resultStationVos = [];
		selectedStationVos.forEach(function(item, index) {
			var obj = {};
			obj.id = item.id;
			obj.stationId = item.stationId;
			obj.stationName = item.stationName;
			obj.unitprice = item.unitprice;
			obj.stationType = item.stationType;
			obj.stationBeginDate = dateFormat(item.leaseBeginDate, 'yyyy-mm-dd');
			obj.stationEndDate = dateFormat(item.leaseEndDate, 'yyyy-mm-dd');

			obj.leaseBeginDate = dateFormat(item.rentBeginDate, 'yyyy-mm-dd');
			obj.leaseEndDate = dateFormat(item.leaseEndDate, 'yyyy-mm-dd');
			obj.rentBeginDate = dateFormat(item.rentBeginDate, 'yyyy-mm-dd');

			resultStationVos.push(obj);
		});

		selectedStationVos = resultStationVos;

		//选择的减租开始日期必须要在工位的起始日期和结束日期范围内
		var isOK = 1;
		selectedStationVos.map(function(item, index) {
			var stationBeginDate = Date.parse(dateFormat(item.stationBeginDate, 'yyyy-mm-dd') + ' 00:00:00');
			var stationEndDate = Date.parse(dateFormat(item.stationEndDate, 'yyyy-mm-dd') + ' 00:00:00');
			var rentBeginDate = Date.parse(dateFormat(item.rentBeginDate, 'yyyy-mm-dd') + ' 00:00:00');

			if (stationBeginDate >= rentBeginDate || rentBeginDate >= stationEndDate) {
				isOK = 0;
			}
		});

		if (!isOK) {
			Notify.show([{
				message: '减租开始时间必须要在选择工位的租赁开始日期和结束日期之内',
				type: 'danger',
			}]);
			return false;
		}
		console.log('---->>>>', selectedStationVos)

		Store.dispatch(change('reduceCreateForm', 'leaseBegindate', selectedStationVos[0].leaseEndDate));

		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(selectedStationVos);
	}



	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	render() {

		let {
			error,
			handleSubmit,
			pristine,
			reset,
			submitting,
			changeValues
		} = this.props;
		let {
			stationVos
		} = this.state;
		const overfolw = {
			'overflow': 'hidden',
			maxHeight: 510,
		}
		const height = {
			height: stationVos.length * 45,
			maxHeight: 667,
		}
		return (
			<div style={{height:667,marginTop:20}}>
<form onSubmit={handleSubmit(this.onSubmit)}>
			<KrField grid={1/2}  name="rentBeginDate" component="date" label="减租开始时间：" onChange={this.onChangeRentBeginDate} inline={true}/>
			<KrField grid={1/2} name="leaseEnddate"  component="labelText" type="date" label="租赁期限终止时间：" value={changeValues.leaseEnddate} defaultValue="无"/>

      <Table onSelect={this.onSelect} style={overfolw}>
        <TableHeader>
          <TableHeaderColumn>类别</TableHeaderColumn>
          <TableHeaderColumn>编号／名称</TableHeaderColumn>
          <TableHeaderColumn>单价（元／月）</TableHeaderColumn>
          <TableHeaderColumn>起始日期</TableHeaderColumn>
          <TableHeaderColumn>结束日期</TableHeaderColumn>
          <TableHeaderColumn>减租开始日期</TableHeaderColumn>
      </TableHeader>
      <TableBody>
      {stationVos && stationVos.map((item,index)=>{
        return (
          <TableRow key={index}>
          <TableRowColumn >{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
          <TableRowColumn >{item.stationName}</TableRowColumn>
          <TableRowColumn >{item.unitprice}</TableRowColumn>
          <TableRowColumn ><KrDate value={item.leaseBeginDate}/></TableRowColumn>
          <TableRowColumn ><KrDate value={item.leaseEndDate}/></TableRowColumn>
          <TableRowColumn>
				{item.rentBeginDate&& dateFormat(item.rentBeginDate,'yyyy-mm-dd')}
          </TableRowColumn>
         </TableRow>
        );
      })}
      </TableBody>
      </Table>
      <Grid>
      <Row style={{marginTop:30,paddingBottom:24}}>
      <Col md={4}></Col>
      <Col md={2} align="center"> <Button  label="确定" type="submit" /> </Col>
      <Col md={2} align="center"> <Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/> </Col>
      <Col md={4}></Col>
      </Row>
      </Grid>
</form>
			</div>);
	}
}

export default reduxForm({
	form: 'selectStationForm',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(SelectStationForm);