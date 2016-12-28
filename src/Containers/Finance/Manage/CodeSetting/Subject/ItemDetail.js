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


        /*let detail={
            accountcode:"feihuikuan" ,
            accountname:"niaho",
            accounttype:1,
            ordernum:66,
            accountdesc:"ttttt",
            enableflag:1
         }
        */
        console.log('detail.enableflag',detail.enableflag)
         if(detail.enableflag == "ENABLE"){
         	detail.flag="启用"
         }else if(detail.enableflag == "DISENABLE"){
         	detail.flag="不启用"
         }
         console.log('detail.accounttype',detail.accounttype)
         if(detail.accounttype=="INCOME"){
         	detail.type="收入"
         }else if(detail.accounttype=="PAYMENT"){
         	detail.type="回款"
         }

		return (

			<div>
               <KrField component="labelText" label="科目编码" value={detail.accountcode} inline={false}/>
               <KrField component="labelText" label="科目名称" value={detail.accountname} inline={false}/>
               <KrField component="labelText" label="科目类别" value={detail.type} inline={false}/>
               <KrField component="labelText" label="排序号" value={detail.ordernum} inline={false}/>

               <KrField component="labelText" label="是否启用"  value={detail.flag} inline={false}/>

               <KrField component="labelText" label="描述" value={detail.accountdesc} inline={false}/>


			</div>

		);
	}
}
