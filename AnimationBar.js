import React from 'react';
import PropTypes from 'prop-types';

export default class AnimationBar extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    height: PropTypes.number,
    speed: PropTypes.number,
    width: PropTypes.number.isRequired,
    labelWidth: PropTypes.number
  };

  static defaultProps = {
    color: 'black',
    height: 30,
    speed: 1
  };

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
    };

    this.increase = this.increase.bind(this);
  }

  componentDidMount() {
    this._requestID = requestAnimationFrame(this.increase);
  }

  componentDidUpdate() {
    const { width, onDone } = this.props;

    if (this.state.width < width) {
      this._requestID = requestAnimationFrame(this.increase);
    } else {
      cancelAnimationFrame(this._requestID);
      onDone();
    }
  }

  increase() {
    const { speed } = this.props;

    this.setState((prevState, props) => {
      return {
        width: prevState.width + speed
      };
    });
  }

  render() {
    const { color, gdp, style, label, labelWidth } = this.props;
    const { width } = this.state;

    return (
      <div style={style}>
        <div style={{...styles.inlineBlock, width: labelWidth}}>{label}</div>
        <div
          style={{
            ...styles.inlineBlock,
            backgroundColor: color,
            height: 'inherit',
            width: width
          }} />
        <div style={styles.inlineBlock}>{gdp}</div>
      </div>
    );
  }
}

const styles = {
  inlineBlock: {
    display: 'inline-block',
    lineHeight: 'inherit',
    verticalAlign: 'top'
  }
};

