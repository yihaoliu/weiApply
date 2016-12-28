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
	ButtonGroup
} from 'kr-ui';




class SwitchBtnForm extends Component{

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
		optionList:React.PropTypes.arr,
		initialValues:React.PropTypes.object,
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
       	 contractcodeId:'',
       }
	   Store.dispatch(initialize('SwitchBtnForm',initialValues));
		
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
      
     let heightStyle={
       	 width:'546',
       	 height:'72'
       }
	let style={
       	 marginTop:'-10'
       }

        const { error, handleSubmit, pristine, reset,optionList} = this.props;
		

        
 
		return(

			    <div className='ui-quit-wrap'>                 
					      <form onSubmit={handleSubmit(this.onSubmit)}>                           
						    <KrField  name="id" type="hidden"/>
                            <KrField grid={1/2} label="合同编号" right={29} name="contractcodeId" type="select" options={optionList} requireLabel={true}/>
                            <KrField grid={1/2} label="上传附件" style={{marginLeft:-5}} name="fileids" component="file"/>
                            <KrField label="备注" style={style} name="finaflowdesc" heightStyle={heightStyle} component="textarea" type="text" placeholder='请输入备注,文字不能超过100字' maxSize={100} lengthClass='ui-length-textarea'/>
                            

						   <Grid style={{marginBottom:5}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div> 
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
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

		if(!values.contractcodeId){
			errors.contractcodeId = '请填写合同编号';
		}
	
		return errors
	}


export default reduxForm({form:'SwitchBtnForm',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(SwitchBtnForm);




