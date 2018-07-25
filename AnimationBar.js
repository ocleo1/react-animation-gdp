import React from 'react';
import PropTypes from 'prop-types';

const FREQUENCY = 60; // 60Hz per second;

export default class AnimationBar extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    value: PropTypes.number.isRequired,
    style: PropTypes.shape({
      height: PropTypes.number.isRequired
    })
  };

  static defaultProps = {
    color: 'black'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      speed: 0
    };

    this._increase = this.increase.bind(this);
  }

  componentDidMount() {
    const { value, duration } = this.props;
    let speed = value / (duration * FREQUENCY);
    speed = parseFloat(speed.toFixed(4));
    this.setState({speed});
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.state;
    const { value: newValue, duration } = nextProps;
    let speed = (newValue - value) / (duration * FREQUENCY);
    speed = parseFloat(speed.toFixed(4));
    this.setState({speed});
  }

  componentDidUpdate() {
    const { value, onDone } = this.props;

    if (this.state.value < value) {
      this._animationID = requestAnimationFrame(this._increase);
    } else {
      cancelAnimationFrame(this._animationID);
      onDone();
    }
  }

  increase() {
    const { speed } = this.state;

    this.setState((prevState, props) => {
      return {
        value: prevState.value + speed,
      };
    });
  }

  render() {
    const { color, style, ratio } = this.props;
    const { value } = this.state;
    const width = parseFloat((value / ratio).toFixed(2));

    return (
      <div style={{...style, lineHeight: style.height + 'px'}}>
        <div
          style={{
            ...styles.inlineBlock,
            backgroundColor: color,
            width: width
          }} />
        <div style={{...styles.inlineBlock, marginLeft: 5}}>{value.toFixed(2)}</div>
      </div>
    );
  }
}

const styles = {
  inlineBlock: {
    display: 'inline-block',
    verticalAlign: 'top',
    height: 'inherit',
    lineHeight: 'inherit',
  }
};

