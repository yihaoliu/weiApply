import React, { PropTypes } from 'react';

import ReactDOM from 'react-dom';


import { isTouchDevice, isTransform, noop, slice } from '../Utils';

var rippleUniqueId = 0;
import { transitionEnd } from '../Utils';

const RippleContainerStyles = {
  normalStyle: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  },

  rippleStyle: {
    display: 'block',
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.04)',
    borderRadius: '50%',
    transform: 'scale(0)',
    transition: 'transform .25s linear, opacity .25s linear .2s'
  },

  rippleAnimationStyle: {
    transform: 'scale(2)'
  },

  rippleFadeoutStyle: {
    opacity: '0'
  }
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ripples: []
    };
  }

  static displayName = 'RippleContainer'
  static propTypes = {
    onClick: PropTypes.func,
    styles: PropTypes.object
  }

  componentDidMount() {
    if (!transitionEnd) {
      return;
    }
    ReactDOM.findDOMNode(this)
      .addEventListener(transitionEnd, this.endRipple.bind(this));
  }

  onMouseDown(e) {
    const domNode = ReactDOM.findDOMNode(this);
    const boundingRect = domNode.getBoundingClientRect();
    let height = domNode.offsetHeight;
    let width = domNode.offsetWidth;
    if (width > height) {
      height = width;
    } else {
      width = height;
    }
    const x = e.clientX - boundingRect.left - width / 2;
    const y = e.clientY - boundingRect.top - height / 2;

    const ripples = slice.call(this.state.ripples);
    let ripple = {
      id: rippleUniqueId++,
      height: height,
      width: width,
      x: x,
      y: y
    };
    ripples.push(ripple);

    this.setState({ ripples: ripples });

    setTimeout(this.startRipple.bind(this), 0);
  }

  onMouseUp(e) {
    this.onMouseLeave();
    const { onClick } = this.props;
    if (onClick) {
      e.preventDefault();
      onClick({
        target: ReactDOM.findDOMNode(this).parentNode,
        originalEvent: e
      });
    }
  }

  onMouseLeave() {
    // fade out
    const ripples = slice.call(this.state.ripples)
      .map(ripple => {
        ripple.fadeOut = true;
        ripple.transitioning = false;
        ripple.transitionComplete = true;
        return ripple;
      });
    this.setState({ ripples: ripples });

  }

  startRipple() {
    let ripples = slice.call(this.state.ripples);
    ripples[ripples.length - 1].transitioning = true;
    this.setState({ ripples: ripples });
  }

  endRipple(e) {
    let ripples = slice.call(this.state.ripples);
    if (isTransform(e.propertyName)) {
      ripples[0].transitioning = false;
      ripples[0].transitionComplete = true;
      this.setState({ ripples: ripples });

    } else if (e.propertyName === 'opacity') {
      ripples.shift();
      this.setState({ ripples: ripples });
    }
  }

  renderRipples(ripples, styles, animateStyle) {
    const l = ripples.length;
    return ripples.map((ripple, index) => {
      const rippleStyles = [styles];
      if (ripple.transitioning || ripple.transitionComplete) {
        rippleStyles.push(animateStyle);
      }

      if (index < (l - 1) || (ripple.transitionComplete && ripple.fadeOut)) {
        rippleStyles.push({ opacity: '0' });
      }

      rippleStyles.push({
        height: ripple.height,
        left: ripple.x,
        top: ripple.y,
        width: ripple.width
      });

      let endStyle = {};
      rippleStyles.map(function(item,index){
          endStyle = Object.assign({},endStyle,item);
      });


      return (
        <div
          key={ ripple.id }
          ref={ 'ripple_' + ripple.id }
          style={endStyle} />
      );
    });
  }

  render() {
    const {
      styles
    } = this.props;

    const {
      ripples
    } = this.state;

    const {
      normalStyle,
      rippleStyle,
      rippleAnimationStyle
    } = RippleContainerStyles;

    let endStyle = {};

     endStyle = Object.assign({},normalStyle,styles);

    return (
      <div
        onMouseDown={ !isTouchDevice ? this.onMouseDown.bind(this) : noop }
        onMouseLeave={ !isTouchDevice ? this.onMouseLeave.bind(this) : noop }
        onMouseUp={ !isTouchDevice ? this.onMouseUp.bind(this) : noop }

        onTouchCancel={ isTouchDevice ? this.onMouseLeave.bind(this) : noop }
        onTouchEnd={ isTouchDevice ? this.onMouseUp.bind(this) : noop }
        onTouchStart={ isTouchDevice ? this.onMouseDown.bind(this) : noop }
        style={endStyle}>
        { this.renderRipples(ripples, rippleStyle, rippleAnimationStyle) }
      </div>
    );
  }
}
