import React, {Component, PropTypes} from 'react';
//import IconButton from '../IconButton';
//import NavigationChevronLeft from '../svg-icons/navigation/chevron-left';
//import NavigationChevronRight from '../svg-icons/navigation/chevron-right';
import SlideInTransitionGroup from '../internal/SlideIn';
import Button from '../../Button';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'inherit',
    height: 48,
  },
  titleDiv: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
  },
  titleText: {
    height: 'inherit',
    paddingTop: 12,
  },
};

class CalendarToolbar extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    displayDate: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    nextMonth: PropTypes.bool,
    onMonthChange: PropTypes.func,
    prevMonth: PropTypes.bool,
  };

  static defaultProps = {
    nextMonth: true,
    prevMonth: true,
  };

  state = {
    transitionDirection: 'up',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.displayDate !== this.props.displayDate) {
      const direction = nextProps.displayDate > this.props.displayDate ? 'left' : 'right';
      this.setState({
        transitionDirection: direction,
      });
    }
  }

  handleTouchTapPrevMonth = () => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(-1);
    }
  };

  handleTouchTapNextMonth = () => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(1);
    }
  };

  render() {
    const {DateTimeFormat, locale, displayDate} = this.props;

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(displayDate);

    const monthNumber = dateTimeFormatted.split(' ').shift();
    const yearNumber = dateTimeFormatted.split(' ').pop();

    return (
      <div style={styles.root}>
      {/*
        <IconButton
          disabled={!this.props.prevMonth}
          onTouchTap={this.handleTouchTapPrevMonth}
        >
          <NavigationChevronLeft />
        </IconButton>
        */}
        <Button type="link" label='&lt;'   onTouchTap={this.handleTouchTapPrevMonth}/>
        <SlideInTransitionGroup
          direction={this.state.transitionDirection}
          style={styles.titleDiv}
        >
          <div key={dateTimeFormatted} style={styles.titleText}>
            {/*
            {dateTimeFormatted}
              */}
              <span onTouchTap={this.props.onTouchTapYear}> {yearNumber}年 </span>
              <span > {monthNumber} </span>
          </div>
        </SlideInTransitionGroup>

          <Button type="link" label='&gt;'   onTouchTap={this.handleTouchTapNextMonth}/>
          {/*
        <IconButton
          disabled={!this.props.nextMonth}
          onTouchTap={this.handleTouchTapNextMonth}
        >
          <NavigationChevronRight />
        </IconButton>
            */}
      </div>
    );
  }
}

export default CalendarToolbar;
