import React, {Component, PropTypes} from 'react';
import {Button} from 'kr-ui';


export default class HomePage extends Component {


  static contextTypes = {
    openSidebarHanlder: PropTypes.func.isRequired,
  };

  constructor(props,context){
    super(props,context)

  }

  componentDidMount(){
    this.context.openSidebarHanlder();
  }
  componentWillUnmount(){
    this.context.openSidebarHanlder();
  }

  handleTouchTapDemo(){
    window.location.href = '/#/components';
  }

  homePageHero() {

    const styles = {
      root: {
        backgroundColor: '#fff',
        overflow: 'hidden',
      },
      svgLogo: {
        marginLeft: window.innerWidth * 0.5 - 130,
        width: 420,
        height: 157,
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: 575,
      },
      label: {
        color: '#333',
      },
      githubStyle: {
        margin: '16px 32px 0px 8px',
      },
      demoStyle: {
        margin: '16px 32px 0px 32px',
      },
      h1: {
        color: '#333',
        fontWeight: 100,
      },
      h2: {
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
      },
      nowrap: {
        whiteSpace: 'nowrap',
      },
      taglineWhenLarge: {
        marginTop: 32,
      },
      h1WhenLarge: {
        fontSize: 56,
      },
      h2WhenLarge: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
      },
    };

    styles.h2 = Object.assign({}, styles.h1, styles.h2);

    styles.tagline = Object.assign({}, styles.tagline, styles.taglineWhenLarge);
    styles.h1 = Object.assign({}, styles.h1, styles.h1WhenLarge);
    styles.h2 = Object.assign({}, styles.h2, styles.h2WhenLarge);

    return (
      <div style={styles.root}>

        <div style={styles.tagline}>

          <div style={{marginTop:100}}>
            <h1 style={styles.h1}>KR-UI</h1>
          </div>

          <div style={{marginTop:20}}>
            <h2 style={styles.h2}> 简洁大方 </h2>
          </div>

          <div style={{marginTop:30}}>

                <Button label="进入" onTouchTap={this.handleTouchTapDemo}  />

          </div>
        </div>
      </div>
    );
  }


  render() {

    const style = {
      paddingTop: 20,
    };

    return (
      <div style={style}>
        {this.homePageHero()}
      </div>
    );
  }
}
