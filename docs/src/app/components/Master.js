import React, {Component, PropTypes} from 'react';

import {AppBar,Drawer,List,ListItem} from 'kr-ui';

export default class Master extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  	static childContextTypes =  {
        openSidebarHanlder: React.PropTypes.func.isRequired,
    }

  	getChildContext() {
  			return {
  				openSidebarHanlder:this.openSidebarHanlder
  			};
  	}

  constructor(props){
    super(props);

    this.state = {
      openSidebar:true
    }

  }

  openSidebarHanlder=()=>{

     this.setState({
       openSidebar:!this.state.openSidebar
     })
  }

  render() {

    const { children } = this.props;

    let containerStyles = {
      marginLeft:0,
      paddingLeft:20,
      paddingTop:20,
      paddingRight:20,
      paddingBottom:20
    };

    if(this.state.openSidebar){
      containerStyles.marginLeft = 180;
    }

    return (
      <div>
        <AppBar title="KR-UI" onLeftIconButtonTouchTap={this.openSidebarHanlder}/>

        <div style={containerStyles}>
              { children }
        </div>
        <Drawer width={180} open={this.state.openSidebar}>
            <AppBar title="KR-UI" onLeftIconButtonTouchTap={this.openSidebarHanlder}/>
            <List>
              <ListItem href="/#/components/section">Section</ListItem>
              <ListItem href="/#/components/appbar">AppBar</ListItem>
              <ListItem href="/#/components/button">Button</ListItem>
              <ListItem href="/#/components/krdate">KrDate</ListItem>
              <ListItem href="/#/components/dialog">Dialog</ListItem>
              <ListItem href="/#/components/form">Form</ListItem>
              <ListItem href="/#/components/krfield">KrField</ListItem>
              <ListItem href="/#/components/grid">grid</ListItem>
              <ListItem href="/#/components/iframecontent">IframeContent</ListItem>
              <ListItem href="/#/components/list">List</ListItem>
              <ListItem href="/#/components/listitem">ListItem</ListItem>
              <ListItem href="/#/components/listGroup">List</ListItem>
              <ListItem href="/#/components/linetext">LineText</ListItem>
              <ListItem href="/#/components/loading">Loading</ListItem>
              <ListItem href="/#/components/pagination">pagination</ListItem>
              <ListItem href="/#/components/table">Table</ListItem>
              <ListItem href="/#/components/searchforms">SearchForms</ListItem>
              <ListItem href="/#/components/fonticon">FontIcon</ListItem>
              <ListItem href="/#/components/Notify">Notify</ListItem>
              <ListItem href="/#/components/checkbox">Checkbox</ListItem>
              <ListItem href="/#/components/pageheader">PageHeader</ListItem>
              <ListItem href="/#/components/divider">Divider</ListItem>
              <ListItem href="/#/components/breadcrumbs">BreadCrumbs</ListItem>
            </List>
        </Drawer>
      </div>
    );
  }
}
