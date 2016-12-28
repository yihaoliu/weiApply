import React from 'react';
import Drawer from 'material-ui/Drawer';

export default class DrawerSimpleExample extends React.Component {

  static propTypes = {
    open:React.PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  render() {
    let {children} = this.props;
    return (
        <Drawer {...this.props}>
          {children}
        </Drawer>
    );
  }
}
