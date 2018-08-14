import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const FREQUENCY = 60; // 60Hz per second;

export default class AnimationBar extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    initValue: PropTypes.number,
    value: PropTypes.number.isRequired,
    style: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  };

  static defaultProps = {
    color: 'black',
    initValue: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.initValue,
      speed: 0
    };

    this._increase = this.increase.bind(this);
  }

  componentDidMount() {
    this._ctx = ReactDOM.findDOMNode(this._ref).getContext('2d');

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
      this._animationID = window.requestAnimationFrame(this._increase);
    } else {
      window.cancelAnimationFrame(this._animationID);
      onDone();
    }
  }

  increase() {
    if (!this._ctx) return;

    const { color, style, ratio, textStyle } = this.props;
    const { value, speed } = this.state;
    const width = parseFloat((value / ratio).toFixed(2));

    this._ctx.clearRect(0, 0, style.width, style.height);
    this._ctx.fillStyle = color;
    this._ctx.fillRect(0, 0, width, style.height);
    this._ctx.fillStyle = textStyle.color;
    this._ctx.font = textStyle.font;
    this._ctx.fillText(value.toFixed(2), width + 10, style.height * 2 / 3);

    this.setState((prevState, props) => {
      return {
        value: prevState.value + speed,
      };
    });
  }

  render() {
    const { style } = this.props;

    return (
      <canvas
        ref={ ref => this._ref = ref }
        width={style.width}
        height={style.height}>
        This text is displayed if your browser does not support HTML5 Canvas.
      </canvas>
    );
  }
}
