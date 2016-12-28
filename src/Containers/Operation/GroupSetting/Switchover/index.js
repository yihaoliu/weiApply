import React from 'react';

import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup
} from 'kr-ui';

/**
 * 左右框内内容调换组件
 * @type {[type]}
 */

export default class Switchover extends React.Component{
  getInitialState(){
    return {

        allData:this.props.allData,
        okData:this.props.okData,

    }
  }
  rightAdd(value){
    var arr=this.state.okData;
    arr.push(value);
    this.setState({okData:arr});
  }
  leftAdd(value){
    var arr=this.state.allData;
    console.log(arr)
    arr.push(value);
    this.setState({allData:arr});
  }
  render(){

    var moddleStyle={
      display:"inline-block",
      width:"40px",
      height:"250px",
      verticalAlign:"middle",
    }

    return (
      <div>
          <ZhuanHuan  iconShow="false"
                      Data={this.state.allData}
                      addOther={this.rightAdd}

          />
          <div style={moddleStyle}>
            243
          </div>
          <ZhuanHuan  iconShow="true"
                      Data={this.state.okData}
                      addOther={this.leftAdd}
                      />
      </div>
    );

  }
}



class ZhuanHuan extends React.Component{
  getInitialState(){
    return {mouldSort:this.props.Data};
  },
  swapItems (arr, index1, index2) {
       arr[index1] = arr.splice(index2, 1, arr[index1])[0];
       this.setState({mouldSort:arr});
   },
   //上移
  upMove(index,event){
    if(index==0){
      return;
    }
     this.swapItems(this.state.mouldSort, index, index- 1);
     console.log(React.SyntheticEvent);


  },
  //下移
  downMove(index,event){
    if(index == this.state.mouldSort.length -1) {
           return;
       }

    this.state.mouldSort=this.swapItems(this.state.mouldSort, index, index + 1);

  },
  upArrow(index){
    return index>0?true:false;
  },
  downArrow(index){
    return index<this.state.mouldSort.length-1?true:false;
  },
  //点击删除
  removeMould(arr,index){

    var remove=arr.splice(index,1)[0];
    this.setState({mouldSort:arr});
    this.props.addOther(remove);
  },

  render(){
    var _this=this;
    var boxStyle={
      border:"1px solid #dfdfdf",
      width:"252px",
      height:"250px",
      display:'inline-block',
      overflow:"auto"
    }
    var arr=this.state.mouldSort.map(function(item,index){
      var j=index;

      return <Krmould
                        upMoves={

                          function(event,index){

                             _this.upMove(j);
                             event.stopPropagation();


                           }
                        }


                        downMove={_this.downMove}


                        downMove={
                          function(event,index){

                             _this.downMove(j);

                             event.stopPropagation();

                           }
                        }
                        iconShow={_this.props.iconShow}
                        upShow={_this.upArrow(index)}
                        downShow={_this.downArrow(index)}
                        text={item}
                        onClick={_this.removeMould.bind(this,_this.state.mouldSort,index)}
                        />
    })


    return (
      <div style={boxStyle}>
          {arr}
      </div>

    )
  }
}




 /**
  * 模板条组件
  * @return {[type]} [description]
  */
  class KrMould extends React.Component{
    render(){
      var upShow,downShow;


      if(this.props.iconShow=="false"){
        upShow="hidden";
        downShow="hidden";
      }
      if (this.props.iconShow=="true") {
        upShow=this.props.upShow==true?"visible":"hidden";
        downShow=this.props.downShow==true?"visible":"hidden";
      }
      var contentStyle={
          width:"100%",
          height:"26px",
          lineHeight:"26px",
          paddingLeft:"10px",
          cursor:"pointer",
          fontSize:"14px",
          color:"#666666",
          boxSizing:"border-box",
      }
      //上移箭头的样式
      var upStyle={
        display:"inline-block",
        cursor:"pointer",
        float:"right",
        marginRight:"30px",
        visibility:upShow
      }
      //下移箭头的样式
      var downShow={
        cursor:"pointer",
        float:"right",
        marginRight:"30px",

        visibility:downShow
      }

      return(
        <div className="ui-groupMould " style={contentStyle} onClick={this.props.onClick}>
          <span >{this.props.text}</span>
          <span onClick={this.props.downMove} style={downShow}>下</span>
          <span onClick={this.props.upMoves} style={upStyle}>上</span>

        </div>)
    }

  }
