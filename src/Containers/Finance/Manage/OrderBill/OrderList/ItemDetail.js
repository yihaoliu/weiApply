import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector} from 'redux-form';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
} from 'kr-ui';


export default  class ItemDetail extends Component{

	 static PropTypes = {
		 detail:React.PropTypes.object,
		 onCancel:React.PropTypes.func,

	 }
    
	constructor(props){
		super(props);
		this.onCancel = this.onCancel.bind(this);
	}

	 onCancel(){
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	 }

	render(){

        let detail=this.props.detail;

        /*
        let detail={
            propcode:"shenghuoxiaofeihuikuan" ,
            propname:"生活消费类回款",
            proptype:"INCOME",
            ordernum:77,
            propdesc:"aaaaaaaaaa",
            enableflag:"ENABLE"
         }
         */
         if(detail.enableflag=="ENABLE"){
         	detail.enableflag="启用"
         }else if(detail.enableflag=="DISENABLE"){
         	detail.enableflag="不启用"
         }
        
         if(detail.proptype=="INCOME"){
         	detail.proptype="收入"
         }else if(detail.proptype=="PAYMENT"){
         	detail.proptype="回款"
         }

		return (

			<div>
               <KrField component="labelText" label="属性编码" value={detail.propcode}/>
               <KrField component="labelText" label="属性名称" value={detail.propname}/>
               <KrField component="labelText" label="属性类别" value={detail.proptype}/>
               <KrField component="labelText" label="排序号" value={detail.ordernum}/>
               
               <KrField component="labelText" label="是否启用"  value={detail.enableflag}/>
             
               <KrField component="labelText" label="描述" value={detail.propdesc}/>


               <Button  label="取消" type="button"  onTouchTap={this.props.onCancel} /> 
			</div>
			
		);
	}
}
