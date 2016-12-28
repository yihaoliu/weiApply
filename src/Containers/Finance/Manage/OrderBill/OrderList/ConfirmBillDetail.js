import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
  Loading,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeaderColumn
} from 'kr-ui';

 
 
 
 
var list1=[];
var list2=[];
var list3=[];

export default  class ConfirmBillDetail extends Component{

	 static PropTypes = {
		 params:React.PropTypes.object, 
		 onCancel:React.PropTypes.func,
	 }
    
	constructor(props){
		super(props);
		this.onCancel = this.onCancel.bind(this);
    this.getData = this.getData.bind(this);
    this.state={
      detail:{},
      basic:{},
      isLoading:true, 
    }
   
	}

  componentDidMount(){
     //this.getData(); 
  }

  componentWillReceiveProps(nextProps){
    this.getData(nextProps.params); 
  
  }


  getData(params = this.props.params){ 
    
      
     //发送获取基本信息的请求
      var _this = this;
     
      Store.dispatch(Actions.callAPI('getFinaDataDetailAdd',params)).then(function(response){ //?为神魔加this.props就可以获取到
      
      let data = response;
        
      data.income.items.map(function(item,index){
          var arr1=[];
          var obj = {};
           obj.type="消费";
           obj.name=item.finaflowAmount;
           obj.money=item.propname;          
           arr1.push(obj); 
           list1=arr1;
                 
      })
         
        
      data.payment.items.map(function(item,index){
          var arr2=[];
          var obj = {};
           obj.type= "缴费";
           obj.name=item.finaflowAmount;
           obj.money=item.propname;
           arr2.push(obj);
           list2=arr2;
      })
       data.otherPay.items.map(function(item,index){
          var arr3=[];
          var obj = {};
           obj.type= "其他费用";
           obj.name=item.finaflowAmount;
           obj.money=item.propname;
           arr3.push(obj);
           list3=arr3;
      })
     
     
     
      _this.setState({
          detail:data,
          basic:data.basic,       
          isLoading:false,
      });


    }).catch(function(err){
        _this.setState({
          isLoading:false,
      });

      Notify.show([{
        message:err.message,
        type: 'danger',
      }]);

    });

  }

	 onCancel(){
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	 }


   IncomeRender(){

   }

	render(){

  
       const {params}  = this.props;

       let {detail,basic,isLoading}  = this.state;
        
      
        /*if(isLoading){
          return <Loading/>
        }*/
         
  
 
		return (

			<div>
            <Grid style={{marginTop:30}}>

              
              <KrField grid={1} label="对账单" component="labelText" value={basic.corporationName} />
              
            </Grid>  
           
            <KrField grid={1/2} label="公司名称" component="labelText" value={basic.customername} />
            <KrField grid={1/2} label="操作日期" component="labelText" value={detail.actualDate} />
               

             <KrField grid={1/2} label="对账期间" component="group">
  						 <KrField  grid={1/2}  type="labelText" value={params.startDate}/> 
  						 <KrField  grid={1/2}  type="labelText" value={params.endDate}/> 
				     </KrField>

				    <KrField grid={1/2} label="订单编号" component="labelText" value={basic.mainbillcode}/>

   

         <Table displayCheckbox={false}>
          <TableHeader>
          <TableHeaderColumn>类别</TableHeaderColumn>
          <TableHeaderColumn>款项</TableHeaderColumn>
          <TableHeaderColumn>金额</TableHeaderColumn>
         </TableHeader>
         <TableBody>

          
          
          {list1.map((item,index)=><TableRow key={index}>
              <TableRowColumn>{item.type}</TableRowColumn>
              <TableRowColumn>{item.money}</TableRowColumn>
              <TableRowColumn>{item.name}</TableRowColumn>
            </TableRow>
         )}
         {list2.map((item,index)=><TableRow key={index}>
              <TableRowColumn>{item.type}</TableRowColumn>
              <TableRowColumn>{item.money}</TableRowColumn>
              <TableRowColumn>{item.name}</TableRowColumn>
            </TableRow>
         )}
         {list3.map((item,index)=><TableRow key={index}>
              <TableRowColumn>{item.type}</TableRowColumn>
              <TableRowColumn>{item.money}</TableRowColumn>
              <TableRowColumn>{item.name}</TableRowColumn>
            </TableRow>
         )}
         

             
           </TableBody>
       </Table>
			

                 
          <Row style={{marginTop:30}}>    
						<Col><KrField label="余额" component="labelText" value={detail.mount}/></Col>
                </Row> 

              <Grid style={{marginTop:30}}>
                <Row style={{marginTop:30}}>
                   <Col md={2}></Col>
                  <Col md={3}><Button  label="打印" type="button"  /> </Col>
                  <Col md={3}><Button  label="导出" type="button" /> </Col>
                  <Col md={3}><Button  label="关闭" type="button"  onTouchTap={this.onCancel}/></Col>
                  <Col md={1}></Col>
                </Row>
              </Grid>
			</div>
			
		  ); 
	 }
}
