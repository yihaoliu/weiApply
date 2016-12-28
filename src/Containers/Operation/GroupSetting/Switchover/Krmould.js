import React from 'react';

import AppBar from 'material-ui/AppBar';

export default class KrMould extends React.Component {

  //自定义属性的初始化
	static defaultProps = {
    //每一条内容的整体样式初始化
		contentStyle:{
      width:"100%",
      height:"26px",
      lineHeight:"26px",
      paddingLeft:"10px",
      cursor:"pointer",
      fontSize:"14px",
      color:"#666666",
      boxSizing:"border-box",
    }
    //下移按钮的样式
    downStyle:{
      cursor:"pointer",
      float:"right",
      marginRight:"30px",
      visibility:"hidden",

    }
    //上移按钮的样式
    upStyle:{
      cursor:"pointer",
      float:"right",
      marginRight:"30px",
      visibility:"hidden",
    }
	}
  //自定义属性
	static propTypes = {
		/**
		 * 添加类名
		 */
    className:React.PropTypes.string,
    /**
     * 每一条内容的整体样式
     */
    contentStyle:React.PropTypes.object，
    /**
     * 每一条内容被点击
     */
    contentClick:React.PropTypes.func,
    /**
     * 上移按钮被点击
     */
    upMoves:React.PropTypes.func,
    /**
     * 下移箭头被点击
     */
    downMove:React.PropTypes.func,
    /**
     * 下移箭头的样式
     */
    downStyle:React.PropTypes.object,
    /**
     * 上移箭头的样式
     */
    upStyle:React.PropTypes.object,
    /**
     * 要展示的数据内容
     */
    text:React.PropTypes.string,

	}



  //state初始化
  constructor(props){
		super(props);
		this.state = {

		}

	}

	render() {
		let {className,contentStyle,contentClick,downMove,upMoves,downStyle,upStyle,text} = this.props;
    let upShow,downShow;
    if(this.props.iconShow=="false"){
        upShow="hidden";
        downShow="hidden";
      }
      if (this.props.iconShow=="true") {
        upShow=this.props.upShow==true?"visible":"hidden";
        downShow=this.props.downShow==true?"visible":"hidden";
      }
      downStyle.visibility=downShow;
      upStyle.visibility=upShow;
		return (
            <div className={"ui-groupMould "+className} style={contentStyle} onClick={contentClick}>
               <span >{text}</span>
               <span onClick={downMove} style={downStyle}>下</span>
               <span onClick={upMoves} style={upStyle}>上</span>
            </div>
          )
		);

	}

}
