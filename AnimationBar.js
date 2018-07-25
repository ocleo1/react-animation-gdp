import React from 'react';
import PropTypes from 'prop-types';

export default class AnimationBar extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    speed: PropTypes.number,
    value: PropTypes.number.isRequired,
    style: PropTypes.shape({
      height: PropTypes.number.isRequired
    })
  };

  static defaultProps = {
    color: 'black',
    speed: 1
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      width: 0
    };

    this._increase = this.increase.bind(this);
  }

  componentDidMount() {
    this._animationID = requestAnimationFrame(this._increase);
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
    const { speed } = this.props;

    this.setState((prevState, props) => {
      return {
        value: prevState.value + speed * 100,
        width: prevState.width + parseFloat(speed.toFixed(2))
      };
    });
  }

  render() {
    const { color, style } = this.props;
    const { value, width } = this.state;

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

