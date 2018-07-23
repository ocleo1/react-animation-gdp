import React from 'react';
import PropTypes from 'prop-types';

export default class AnimationBar extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    height: PropTypes.number,
    speed: PropTypes.number,
    width: PropTypes.number.isRequired
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
    const { color, gdp, style, height, label } = this.props;
    const { width } = this.state;

    return (
      <div style={style}>
        {
          !!label ? <div>{label}</div> : null
        }
        <div
          style={{
            ...styles.inlineBlock,
            backgroundColor: color,
            height: height,
            lineHeight: height + 'px',
            width: width
          }} />
        <div style={{
          ...styles.inlineBlock,
          height: height,
          lineHeight: height + 'px',
          }}>
          {gdp}
        </div>
      </div>
    );
  }
}

const styles = {
  inlineBlock: {
    display: 'inline-block',
    verticalAlign: 'top'
  }
};

