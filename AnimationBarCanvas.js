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
      height: PropTypes.number.isRequired,
      transition: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    color: 'black',
    initValue: 0,
    width: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      style: {}
    };

    this._inProgress = false;
    this._value = props.initValue;
    this._count = 0;
    this._speed = 0;
    this._increase = this.increase.bind(this);
  }

  componentDidMount() {
    const { value, duration, onTransitionCompleted } = this.props;
    const speed = value / (duration * FREQUENCY);

    this._speed = parseFloat(speed.toFixed(4));
    const node = ReactDOM.findDOMNode(this._ref);
    node.addEventListener('transitionend', () => {
      this._inProgress = true;
      onTransitionCompleted();
    });

    this._ctx = node.getContext('2d');
    this._animationID = window.requestAnimationFrame(this._increase);
  }

  componentWillReceiveProps(nextProps) {
    const { rank, style } = this.props;
    const { value: newValue, duration, rank: newRank } = nextProps;
    const speed = (newValue - this._value) / (duration * FREQUENCY);

    this._speed = parseFloat(speed.toFixed(4));
    this._animationID = window.requestAnimationFrame(this._increase);

    let distance = 0;
    if (newRank - rank !== 0) {
      distance = (newRank - rank) * (style.height + 4);
      const moveVertical = {
        transform: `translateY(${distance}px)`
      }
      this.setState({style: moveVertical});
    }
  }

  increase() {
    if (!this._ctx) return;

    const { color, style, ratio, textStyle, value, rank } = this.props;
    const { onDone, onValueChange } = this.props;
    const width = parseFloat((this._value / ratio).toFixed(2));

    this._ctx.clearRect(0, 0, style.width, style.height);
    this._ctx.fillStyle = color;
    this._ctx.fillRect(0, 0, width, style.height);
    this._ctx.fillStyle = textStyle.color;
    this._ctx.font = textStyle.font;
    this._ctx.fillText(this._value.toFixed(2), width + 10, style.height * 2 / 3);

    this._value += this._speed;
    this._count += 1;
    if (this._count === 180 && !this._inProgress) {
      this._count = 0;
      this._inProgress = true;
      onValueChange(this._value, rank);
    }

    if (this._value < value) {
      this._animationID = window.requestAnimationFrame(this._increase);
    } else {
      window.cancelAnimationFrame(this._animationID);
      onDone();
    }
  }

  render() {
    const { style } = this.props;
    const { style: newStyle } = this.state;

    return (
      <canvas
        style={{transition: style.transition, ...newStyle}}
        ref={ ref => this._ref = ref }
        width={style.width}
        height={style.height}>
        This text is displayed if your browser does not support HTML5 Canvas.
      </canvas>
    );
  }
}
