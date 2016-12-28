import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	KrDate
} from 'kr-ui';
import ConfirmBillDetail from './ConfirmBillDetail';



 class NewCreateForm extends Component{

	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
		 detail:React.PropTypes.object,

	 }

	constructor(props){
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		const detail = this.props.detail;


		Store.dispatch(initialize('newCreateForm',detail));



        //提交params
		this.state = {
			params:{
				startDate:'',
				endDate:'',
				id:detail.id
			}
		}




	}
	componentDidMount(){
	}

     //获取提交时的params
	 onSubmit(params){


 		 const {detail} = this.props;


 		 params.id = detail.id;
         params.startDate=detail.actualEntrydate;


		 this.setState({
			params
		 });





	 }

	 onCancel(){
		 const {onCancel} = this.props;
		 onCancel && onCancel();

	 }

	render(){

		const { error, handleSubmit, pristine, reset} = this.props;



		return (


			<div>

			<form onSubmit={handleSubmit(this.onSubmit)}>

				    <KrField name="id" type="hidden" label="id"/>

                    <KrField grid={1/2} label="对账期间" component="group">
                        <KrDate value={this.props.detail.actualEntrydate} format="yyyy-mm-dd"/>  					
  						<KrField  component="Date"  name="endDate" type="date" grid={1/2}/>
				     </KrField>

				<Grid style={{marginTop:10}}>
					<Row>
						<Col md={8}></Col>
						<Col md={2}> <Button  label="确定" type="submit" primary={true} /></Col>
					</Row>
				</Grid>
				</form>


				<ConfirmBillDetail  params={this.state.params} onCancel={this.onCancel}/>


			</div>

		);

	}
}


export default reduxForm({ form: 'newCreateForm',
	enableReinitialize:true,
	keepDirtyOnReinitialize:true
})(NewCreateForm);
