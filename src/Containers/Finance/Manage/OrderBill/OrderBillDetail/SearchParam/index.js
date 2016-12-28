import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import {Actions,Store} from 'kr/Redux';
import './index.less';
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
	LineText,
	ListGroup,
	ListGroupItem
} from 'kr-ui';


export default class SearchParam extends Component{

	static defaultProps = {
		

	}

	static PropTypes = {
		detailPayment:React.PropTypes.object,
		detailIncome:React.PropTypes.object,
		detailBalance:React.PropTypes.object,
		params:React.PropTypes.object,
	}
     
	constructor(props,context){
		super(props, context);
        this.onHandleOver=this.onHandleOver.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onLeave=this.onLeave.bind(this);
		this.state = {	
		  primaryR:'true',
		  primaryI:'false',
		  active:10000,
		  activeI:this.props.params.accountType=='PAYMENT'?10000:this.props.params.index,
		  myReceive:10000,
		  myIncome:10000
		}
       
	}

	componentDidMount() {

		
       
	}

	onSearch(type,childType,id,propInfo,index){    
		const {onSearch,params} = this.props;

		//console.log('5555555',window.location.href+'?type='+type+'&index='+index);
		
        
        
        if(type=='PAYMENT'&&childType=='basic'){
          this.setState({
			primaryR:'true',
			primaryI:'false',
			activeI:10000,
		    active:10000,
	      });
        }
        if(type=='PAYMENT'&&childType!='basic'){
           this.setState({
           	primaryR:'false',
			primaryI:'false',
			active:index,
			activeI:10000	
	      });
        }
       
        if(type=='INCOME'&&childType=='basic'){
          this.setState({
			primaryR:'false',
			primaryI:'true',
			activeI:10000,
		    active:10000,
	      });
       }
	    if(type=='INCOME'&&childType!='basic'){
          this.setState({
            primaryR:'false',
			primaryI:'false',
			activeI:index,
		    active:10000,
	      });    
        }

		var searchParam = {};

		searchParam.accountType = type;
		searchParam.childType = childType;
		searchParam.propertyId = id;
		searchParam.propInfo=propInfo;
		searchParam.orderId = params.orderId;
		searchParam.index=index;
		searchParam.pageSize=30;
		onSearch && onSearch(searchParam);
	}

	onHandleOver(type,index){
	 var _this=this;
      if(type=='PAYMENT'){
          this.setState({
			myReceive:index,
			myIncome:10000	
	      });
        }
       
        if(type=='INCOME'){
          this.setState({
			myIncome:index,
		    myReceive:10000,
	      });
        }
	}
    onLeave(type,index){
       if(type=='PAYMENT'){
          this.setState({
			myReceive:10000,
			myIncome:10000	
	      });
        }
       
        if(type=='INCOME'){
          this.setState({
			myReceive:10000,
		    myIncome:10000,
	      });
        }
    }
	render(){
         const {detailPayment,detailIncome,detailBalance}=this.props;


         //console.log('props',this.props.params.accountType,this.props.params.index);
        

		return(

		<div>     

		            
		           <LineText title='回款' primary={this.state.primaryR} onClick={this.onSearch.bind(this,'PAYMENT','basic','','SETTLED')}/>

                   
                   <div className='ui-ListGroup'>
		            <ListGroup inline={false}>
		              {detailPayment.map((item,index)=>{
					        var className;
					        var classPic;
			                if (this.state.active== index) {
			                   className = 'active';
			                   classPic='activePic'
			                }else if(this.state.myReceive==index){
                               className = 'active_hover';
			                   classPic='pic_color'
			                }
			                 else{
			                   className = 'ui-listGroupItem';
			                   classPic='pic_color'
			                 }

			          return (
		            	<ListGroupItem key={index}>
                          <div className={className} onTouchTap={this.onSearch.bind(this,'PAYMENT',item.propcode,item.id,item.propInfo,index)} onMouseOver={this.onHandleOver.bind(this,'PAYMENT',index)} onMouseOut={this.onLeave.bind(this,'PAYMENT',index)}>
                           <span className={classPic}></span>
                            <span className={item.propname=='代收（水电、打印等）'?'receivedTextWater':'receivedText'}>{item.propname}</span>
                           <span className={item.propname=='代收（水电、打印等）'?'receivedTextWaterMoney':'receivedMoney'}>{item.propamount}</span>
		            	  </div>
		            	</ListGroupItem>)
		              })
		           }
		            </ListGroup>
                  </div>
					
                    
                  <LineText title='收入' primary={this.state.primaryI} onClick={this.onSearch.bind(this,'INCOME','basic','','SETTLED')}/>
					
				  <div className='ui-ListGroup'>
                    <ListGroup inline={false}>
		              {detailIncome.map((item,index)=>{
		              	    var className;
					        var classPic;

			                if (this.state.activeI== index) {
			                   className = 'active';
			                   classPic='activePic'
			                }else if(this.state.myIncome==index){
                               className = 'active_hover';
			                   classPic='pic_color'
			                }
			                 else{
			                   className = 'ui-listGroupItem';
			                   classPic='pic_color'
			                 }
                      return (
		            	<ListGroupItem key={index}>
		            	 <div className={className} onTouchTap={this.onSearch.bind(this,'INCOME',item.propcode,item.id,item.propInfo,index)} onMouseOver={this.onHandleOver.bind(this,'INCOME',index)} onMouseOut={this.onLeave.bind(this,'INCOME',index)}>
                          <span className={classPic}></span>
                            <span className={item.propname=='代收（水电、打印等）'?'receivedTextWater':'receivedText'}>{item.propname}</span>
                            <span className={item.propname=='代收（水电、打印等）'?'receivedTextWaterMoney':'receivedMoney'}>{item.propamount}</span>
		            	  </div>
		            	</ListGroupItem>)
		              })
		             }
		            </ListGroup>
                 </div>
					
                    <LineText title='余额' primary='false' style={{color:'#999',cursor:'default'}} styleLine={{background:'#999'}}/>
					
					<div className='ui-ListGroup'>
                     <ListGroup inline={false}>
		               <ListGroupItem>
		                <div className='ui-listGroupItem'>
                          <span className='receivedText' style={{cursor:'default'}}>余额</span>
                          <span className='receivedMoney' style={{cursor:'default'}}>{detailBalance}</span>
		            	</div>
		            	</ListGroupItem>
		            </ListGroup>
                   </div>
					
			
		</div>		

		);

	}
}




