import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector
} from 'redux-form';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
} from 'kr-ui';


export default class ItemDetail extends Component {

	static propTypes = {
		detail: React.PropTypes.object,
		onCancel: React.PropTypes.func,

	}

	constructor(props) {
		super(props);
		this.onCancel = this.onCancel.bind(this);
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	render() {

		let detail = this.props.detail;
		console.log('detail', detail)

		if (detail.enableflag == 'ENABLE') {
			detail.flag = "启用"
		} else if (detail.enableflag == 'DISENABLE') {
			detail.flag = "不启用"
		}


		return (

			<div className="itemDetail" style={{marginTop:40}}>
      			<KrField grid={1/2} name="corporationName" component="labelText"  label="出租方名称xz" value={detail.corporationName} inline={false} />
        		<KrField grid={1/2} left={30} name="enableflag" component="labelText"  label="是否启用" value={detail.flag} inline={false}/>
        		<KrField grid={1/2} name="corporationAddress" component="labelText" type="text" label="详细地址" value={detail.corporationAddress} inline={false} />
        		<KrField name="corporationDesc" component="labelText" label="备注"  placeholder="备注信息" value={detail.corporationDesc} inline={false}/>
			</div>

		);
	}
}
