import React from 'react';
import Krmould form './Krmould'
export default class Group extends React.Component {
	static defaultProps = {
		title:'KR-UI',
    iconShow:'false',
    boxStyle:{
      border:"1px solid #dfdfdf",
      width:"252px",
      height:"250px",
      display:'inline-block',
      overflow:"auto"
    }
	}
	static propTypes = {
		/**
		 * title
		 */
		title:React.PropTypes.string,
    iconShow:React.PropTypes.string,
    boxStyle:React.PropTypes.object,
	}
  constructor(props) {
		super(props);
    this.state={
      mouldSort:this.props.Data
    }
  }
//
//事件逻辑集合
//
  swapItems=function(arr, index1, index2)=>{
       arr[index1] = arr.splice(index2, 1, arr[index1])[0];
       this.setState({mouldSort:arr});
   }

   //上移
  upMove=(index,event)=>{
    if(index==0){
      return;
    }
     this.swapItems(this.state.mouldSort, index, index- 1);
  }

  //下移
  downMove=(index,event)=>{
    if(index == this.state.mouldSort.length -1) {
           return;
       }
    this.state.mouldSort=this.swapItems(this.state.mouldSort, index, index + 1);
  }

  upArrow=(index)=>{
    return index>0?true:false;
  }

  downArrow=(index)=>{
    return index<this.state.mouldSort.length-1?true:false;
  }
  //点击删除
  removeMould:function(arr,index){
    var remove=arr.splice(index,1)[0];
    this.setState({mouldSort:arr});
    this.props.addOther(remove);
  }
	render() {
		let {iconShow} = this.props;
    var _this=this;
    var arr=this.state.mouldSort.map(function(item,index){
        var j=index;
        return <Krmould
                          upMoves={
                            function(event,index){
                               _this.upMove(j);
                               event.stopPropagation();
                             }
                          }
                          downMove={
                            function(event,index){
                               _this.downMove(j);
                               event.stopPropagation();
                             }
                          }
                          iconShow={iconShow}
                          upShow={_this.upArrow(index)}
                          downShow={_this.downArrow(index)}
                          text={item}
                          onClick={_this.removeMould(_this.state.mouldSort,index)}
                          />
    })
		return (
        <div style={boxStyle}>
            {arr}
        </div>
		);

	}

}
