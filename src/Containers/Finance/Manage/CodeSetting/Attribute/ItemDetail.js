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

         if(detail.enableflag=="ENABLE"){
         	detail.flag="启用"
         }else if(detail.enableflag=="DISENABLE"){
         	detail.flag="不启用"
         }

         if(detail.proptype=="INCOME"){
         	detail.type="收入"
         }else if(detail.proptype=="PAYMENT"){
         	detail.type="回款"
         }

		return (

			<div>
               <KrField component="labelText" label="属性编码" value={detail.propcode}/>
               <KrField component="labelText" label="属性名称" value={detail.propname}/>
               <KrField component="labelText" label="属性类别" value={detail.type}/>
               <KrField component="labelText" label="排序号" value={detail.ordernum}/>
               <KrField component="labelText" label="是否启用"  value={detail.flag}/>
               <KrField component="labelText" label="描述" value={detail.propdesc}/>
			</div>

		);
	}
}
