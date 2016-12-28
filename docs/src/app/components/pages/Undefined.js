import React, {Component, PropTypes} from 'react';
import {Button} from 'kr-ui';


export default class HomePage extends Component {


  constructor(props,context){
    super(props,context)
  }

  render() {

    const style = {
      paddingTop: 20,
    };

    return (
      <div style={style}>
        <p>还没来得及添加文档</p>
      </div>
    );
  }
}
