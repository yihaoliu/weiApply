import React from 'react';
import {
  Button,
  Dialog
} from 'kr-ui';


export default class AppBarExampleSimple extends React.Component{

	constructor(props) {
		super(props);

    this.state = {
      open:false
    }

	}

  openDialog = ()=>{

    this.setState({
      open:!this.state.open
    });

  }
    render(){


        return (

            <div>
              <Button label="Dialog" onClick={this.openDialog}/>
              <Dialog open={this.state.open} onClose={this.openDialog}/>
            </div>
        );
    }

}
