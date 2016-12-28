import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import {
	Actions,
	Store
} from 'kr/Redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {
	Button,
	Section,
	Grid,
	Row,
	Col,
	Notify,
	List,
	ListItem,
	KrField,
	LabelText,
	KrDate,
} from 'kr-ui';
export default class  CompanyInfo extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	static defaultProps = {

	}

	static PropTypes = {

	}

	constructor(props, context) {
		super(props, context);
		this.state = {
			companyInfo:{}
		}
	}
	componentDidMount() {

	}

	render() {
		let {detail} = this.props;
		let companyInfo = detail;
		return (

			<div className='ui-detail-order'>
			           <KrField grid={1/3} alignRight={true} label="公司名称:" component="labelText" value={companyInfo.customerCompany} defaultValue="无" style={{marginRight:'20px'}}/>

			           <KrField grid={1/3}  alignRight={true} component="labelText"  label="投资轮次:" value={companyInfo.round} defaultValue="无" />

								 <KrField grid={1/3}  alignRight={true} component="labelText"  label="项目名称:" value={companyInfo.projectCategoryName} defaultValue="无" style={{marginLeft:'-20px'}}/>

                <KrField grid={1/3} alignRight={true} label="办公城市:" component="labelText"  value={companyInfo.cityName} defaultValue="无" style={{marginRight:'20px'}}/>

			           <KrField grid={1/3} alignRight={true} label="详细地址:" component="labelText"  value={companyInfo.detailAddress} defaultValue="无"/>

			           <KrField grid={1/3} alignRight={true} label="公司网址:" component="labelText" type="date" value={companyInfo.website} defaultValue="无" style={{marginLeft:'-20px'}}/>
			</div>

		)

	}

}
