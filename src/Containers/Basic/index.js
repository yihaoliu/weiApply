import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

export default class Basic extends Component {

	constructor(props,context){
		super(props, context);
	}

  componentWillMount() {

  }

  render() {


    return (
      <div style={{marginBottom:"50px"}}>
					{this.props.children}
      </div>
    );
  }
}
