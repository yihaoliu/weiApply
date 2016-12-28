import React from 'react';

export default class CodeBlockTitle extends React.Component{


  static PropTypes = {
    title: React.PropTypes.string,
    tooltip: React.PropTypes.string,
  }

  render(){

    return (

      <div style={{padding:'15px 20px', borderBottom:'1px solid #e0e0e0'}}>

        {this.props.title || 'Example'}

      </div>
    );

  }


}
