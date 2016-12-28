import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions,Store} from 'kr/Redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {reduxForm,formValueSelector,initialize} from 'redux-form';
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
	Notify,
	List,
 	ListItem,
	LabelText,
	Dialog,
	KrField,
	ButtonGroup,
} from 'kr-ui';



class BusinessBtnForm extends Component{

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
		initialValues:React.PropTypes.object,
		fiMoney:React.PropTypes.object,
  }

	constructor(props,context){
		super(props, context);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
		  this.state = {
			
	     }
   }

	componentDidMount() {
       let initialValues={
       	 id:this.props.initialValues.id,
       	 finaflowamount:'',
       }
	   Store.dispatch(initialize('BusinessBtnForm',initialValues));
		
	}
    
   
    onSubmit(values){
		 const {onSubmit} = this.props;
		 onSubmit && onSubmit(values);

	 }

	 onCancel(){
		 const {onCancel} = this.props;	
		 onCancel && onCancel();		 
	 }
	

	  

    

	render(){

	

        const { error, handleSubmit, pristine, reset,optionList,fiMoney} = this.props;
		
       let inputStyle={
       	 height:'36'
       }
       let heightStyle={
       	 width:'546',
       	 height:'72'
       }
	   let style={
       	 marginTop:'-10'
       }
 
		return(

			    <div className='ui-quit-wrap'>
                 
					      <form onSubmit={handleSubmit(this.onSubmit)}>
                            <KrField  name="id" type="hidden"/>
                            <KrField grid={1} label="款项金额"  component="labelText" value={fiMoney} inline={false} defaultValue="无"/>
                            <KrField grid={1/2} label="金额（元）" heightStyle={inputStyle} right={29} name="finaflowamount" component="input" type="text" requireLabel={true}/>
                            <KrField grid={1/2} label="上传附件" name="fileids" component="file"/>
                            <KrField grid={1} label="备注" style={style} name="finaflowdesc" heightStyle={heightStyle} component="textarea" type="text" placeholder='请输入备注,文字不能超过100字' maxSize={100} lengthClass='ui-length-textarea'/>
                           


					<Grid style={{marginBottom:5}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
									<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
								</ButtonGroup>
							</Col>
						</Row>
					</Grid>
					   
                  </form>
			</div>		

		);

	}

}

const validate = values =>{

		const errors = {}

		if(!values.finaflowamount){
			errors.finaflowamount = '请填写金额';
		}
		if (values.finaflowamount && isNaN(values.finaflowamount)) {
			errors.finaflowamount = '金额必须为数字';
		}
	
		return errors
	}

export default reduxForm({form:'BusinessBtnForm',validate})(BusinessBtnForm);




