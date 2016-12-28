import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';

import {
  Form,
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
  Dialog,
  BreadCrumbs,
  KrField,
  Notify
} from 'kr-ui';


class SearchForm extends Component{

    constructor(props){
      super(props);
    }

    render (){
          let initialValues = {
          lessorContacttel:'haa',
          age:1,
        }

      return (
        <Form name="searchForm" initialValues={initialValues} onSubmit={this.onSubmit}>

                <KrField grid={1/3} name="corporationName" type="text"  component="input" placeholder="搜索关键词"/>

                 <Button label="搜索"  type="submit" joinEditForm/>

          </Form>
        
      );
    }
} 

 
class EditDetailForm extends Component{

    constructor(props){
      super(props);
    }

    render (){
          let initialValues = {
          lessorContacttel:'haa',
          age:1,
        }

      return (
        <Form name="EditDetailForm" initialValues={initialValues} onSubmit={this.onSubmit}>

               <KrField  name="corporationName" type="text"  component="input" label="租金总额"/>
                <KrField  name="corporationName" type="text"  component="input" label="已开票总额"/>
                <KrField  name="corporationName" type="text"  component="input" label="票据内容"/>
                <KrField  name="corporationName" type="text"  component="input" label="金额（元）"/>
                <KrField  name="corporationName" type="text"  component="input" label="开票日期"/>
                <KrField  name="corporationName" type="text"  component="input" label="票据类型"/>
                <KrField  name="corporationName" type="text"  component="input" label="发票号码"/>
                <KrField  name="corporationName" type="text"  component="input" label="备注"/>
                <KrField  name="corporationName" type="text"  component="input" label="上传附件"/>

                 <Button label="确定"  type="submit" joinEditForm/>
                   <Button label="取消"  type="button" joinEditForm/>

          </Form>
        
      );
    }
} 
class ItemDetail extends Component{

    constructor(props){
      super(props);
    }

    render (){
          let initialValues = {
          lessorContacttel:'haa',
          age:1,
        }

      return (
        <Form name="ItemDetail" initialValues={initialValues} onSubmit={this.onSubmit}>

                <KrField grid={1/3} name="corporationName" type="text"  component="input" placeholder="搜索关键词"/>

                 <Button label="搜索"  type="submit" joinEditForm/>

          </Form>
        
      );
    }
} 



export default class AttributeSetting  extends Component{

  constructor(props,context){
    super(props, context);

    this.onOperation = this.onOperation.bind(this);
    this.state = {
      openNewCreate:false,
      openView:false,
      openEditDetail:false,
      openDelete:false,
      itemDetail:{},
      Params:{
        page:1,
        pageSize:10,
        operatedate:'',
        operateName:'',
        invoiceType:'',
        creater:''
      }
    }

  }

  componentDidMount() {
  }
//操作相关
  onOperation(type,itemDetail){

    this.setState({
      itemDetail
    });

    if(type == 'view'){
      this.openViewDialog();
    }else if(type == 'edit'){
      this.openEditDetailDialog();
    }else if(type == 'delete'){
      this.openDeleteDialog();
    }
  }
 //编辑
  openEditDetailDialog(){
    this.setState({
      openEditDetail:!this.state.openEditDetail
    });
  }
  
  //查看
  openViewDialog(){
    this.setState({
      openView:!this.state.openView
    });
  }
  //删除
  openDeleteDialog(){
    this.setState({
      openDelete:!this.state.openDelete
    });
  }

  render(){
   
   let initialValues = {
      lessorContacttel:'haa',
      age:1,
    }
    
    return(

      <div>
      <BreadCrumbs children={['系统运营','财务管理','开票列表']}/>
          <Section title="开票列表" description="" >
             <div> 
                  <SearchForm onSubmit={this.searchParams}/>
            </div>
            <Table style={{marginTop:10}} ajax={true}  ajaxUrlName='getFnaInvoiceModelListByAjax' ajaxParams={this.state.Params} ajaxFieldListName="fnaInvoiceModelVOList" onOperation={this.onOperation} >
              <TableHeader>
                  <TableHeaderColumn>票据类型</TableHeaderColumn>
                  <TableHeaderColumn>发票号码</TableHeaderColumn>
                  <TableHeaderColumn>开票金额</TableHeaderColumn>
                  <TableHeaderColumn>开票日期</TableHeaderColumn>
                  <TableHeaderColumn>操作人</TableHeaderColumn>
                  <TableHeaderColumn>备注</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                    <TableRowColumn name="invoiceType"></TableRowColumn>
                    <TableRowColumn name="invoiceNumber"></TableRowColumn>
                    <TableRowColumn name="invoiceAmount"></TableRowColumn>
                    <TableRowColumn name="createDate"></TableRowColumn>
                    <TableRowColumn name="operateName"></TableRowColumn>
                    <TableRowColumn name="invoicedesc"></TableRowColumn>
                    <TableRowColumn>
                        <Button label="查看"  type="link" joinEditForm operation="view"/>
                        <Button label="编辑"  type="link" joinEditForm operation="edit"/>
                        <Button label="删除"  type="link" joinEditForm operation="delete"/>
                    </TableRowColumn>
                  </TableRow>
              </TableBody>
            </Table>

         </Section>
      


          <Dialog
            title="编辑"
            modal={true}
            open={this.state.openEditDetail}
          >
            <EditDetailForm  detail={this.state.itemDetail} onSubmit={this.onEditSubmit} onCancel={this.openEditDetailDialog} />
          </Dialog>

          <Dialog
            title="查看"
            modal={true}
            open={this.state.openView}
          >
            {/*<ItemDetail  detail={this.state.itemDetail} onCancel={this.openViewDialog} />*/}
          </Dialog>

      </div>    

    );

  }

}

