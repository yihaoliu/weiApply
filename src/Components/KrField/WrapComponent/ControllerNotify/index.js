
import React from 'react';

import './index.less';

export default class  ControllerNotify extends React.Component {

  static displayName = 'ControllerNotify';
	static PropTypes = {
		label:React.PropTypes.string,
		requireLabel:React.PropTypes.bool,
		children:React.PropTypes.node,
		notifys:React.PropTypes.array,
	}

	constructor(props){
		super(props)
	}

  renderNotifys = ()=>{

    const {notifys} = this.props;

    if(!notifys || !notifys.length){
        return null;
    }

    return notifys.map(function(item,index){
        return <div key={index} className="notify-item"><span>{item}</span></div>;
    });

  }

	render(){
    const {notifys} = this.props;

    if(!notifys || !notifys.length){
        return null;
    }



			return (
					<div className="ui-form-notify">
              {this.renderNotifys()}
					</div>
			);
	}
}
