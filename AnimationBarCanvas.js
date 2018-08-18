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
      height: PropTypes.number.isRequired
    })
  };

  static defaultProps = {
    color: 'black',
    initValue: 0,
    width: 0
  };

  constructor(props) {
    super(props);
    this.state = {};

    this._value = props.initValue,
    this._speed = 0
    this._increase = this.increase.bind(this);
  }

  componentDidMount() {
    const { value, duration } = this.props;
    const speed = value / (duration * FREQUENCY);

    this._speed = parseFloat(speed.toFixed(4));
    this._ctx = ReactDOM.findDOMNode(this._ref).getContext('2d');
    this._animationID = window.requestAnimationFrame(this._increase);
  }

  componentWillReceiveProps(nextProps) {
    const { value: newValue, duration } = nextProps;
    const speed = (newValue - this._value) / (duration * FREQUENCY);

    this._speed = parseFloat(speed.toFixed(4));
    this._animationID = window.requestAnimationFrame(this._increase);
  }

  increase() {
    if (!this._ctx) return;

    const { color, style, ratio, textStyle, value, onDone } = this.props;
    const width = parseFloat((this._value / ratio).toFixed(2));

    this._ctx.clearRect(0, 0, style.width, style.height);
    this._ctx.fillStyle = color;
    this._ctx.fillRect(0, 0, width, style.height);
    this._ctx.fillStyle = textStyle.color;
    this._ctx.font = textStyle.font;
    this._ctx.fillText(this._value.toFixed(2), width + 10, style.height * 2 / 3);

    this._value += this._speed;
    if (this._value < value) {
      this._animationID = window.requestAnimationFrame(this._increase);
    } else {
      window.cancelAnimationFrame(this._animationID);
      onDone();
    }
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
