import React from 'react';
import PropTypes from 'prop-types';

export default class AnimationBar extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    speed: PropTypes.number,
    width: PropTypes.number.isRequired,
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
      width: 0,
    };

    this._increase = this.increase.bind(this);
  }

  componentDidMount() {
    this._animationID = requestAnimationFrame(this._increase);
  }

  componentDidUpdate() {
    const { width, onDone } = this.props;

    if (this.state.width < width) {
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
        width: prevState.width + speed
      };
    });
  }

  render() {
    const { color, gdp, style } = this.props;
    const { width } = this.state;

    return (
      <div style={{...style, lineHeight: style.height + 'px'}}>
        <div
          style={{
            ...styles.inlineBlock,
            backgroundColor: color,
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
    verticalAlign: 'top',
    height: 'inherit',
    lineHeight: 'inherit',
  }
};

