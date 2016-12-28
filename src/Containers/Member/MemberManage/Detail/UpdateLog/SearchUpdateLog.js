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
	Actions,
	Store
} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	ListGroup,
	ListGroupItem
} from 'kr-ui';
class SearchDateForm extends Component {

	static PropTypes = {
		onStartChange: React.PropTypes.func,
		onEndChange:React.PropTypes.func,
		date_2:React.PropTypes.string,
	}

	constructor(props) {
		super(props);



	}
	componentDidMount() {


	}

    onStartChange=(value)=>{
      let values={
      	 startDate:value
      }
      const {
			onStartChange
		} = this.props;
		onStartChange && onStartChange(values);
    }
    onEndChange=(value)=>{
      let values={
      	 endDate:value
      }
      const {
			onEndChange
		} = this.props;
		onEndChange && onEndChange(values);
    }

	render() {
		const {
			error,
			handleSubmit,
			pristine,
			reset,
			date_2
		} = this.props;
		return (

			<form  style={{marginTop:-9,float:'right'}}>

				<div className='s-date-search'>

				    <ListGroup style={{width:'610'}}>
				        <span className='statis-date-title' style={{marginRight:'10'}}>注册时间：</span>
						<ListGroupItem><div className='statis-date-start' style={{width:'252'}}><KrField  style={{marginLeft:-10,}} name="startDate" component="date" onChange={this.props.onStartChange} placeholder={date_2}/></div></ListGroupItem>
						<div className='ui-line-down-list'><span style={{display:'inline-block',color:'#666',fontSize:'14',marginLeft:'-10'}}>至</span></div>
						<ListGroupItem><div className='statis-date-end' style={{width:'252'}}><KrField  name="endDate" component="date" onChange={this.props.onEndChange} placeholder={date_2}/></div></ListGroupItem>
					</ListGroup>

				</div>
			</form>
		);
	}
}


export default reduxForm({
	form: 'SearchDateForm'
})(SearchDateForm);
