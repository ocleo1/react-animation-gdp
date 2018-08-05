import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class AnimationBarCSS extends React.Component {
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
    initValue: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.initValue
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const { ratio, value } = this.props;
      const width = parseFloat((value / ratio).toFixed(2));

      const barNode = ReactDOM.findDOMNode(this._bar);
      barNode.style.width = width + 'px';

      barNode.addEventListener('transitionend', () => {
        console.log('transitionend');
        this.props.onDone();
      });
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  render() {
    const { color, style, textStyle, ratio, duration, value: newValue } = this.props;
    const { value } = this.state;
    const width = parseFloat((value / ratio).toFixed(2));

    return (
      <div style={{...style, lineHeight: style.height + 'px'}}>
        <div
          ref={(ref) => this._bar = ref}
          style={{
            ...styles.inlineBlock,
            backgroundColor: color,
            width: width,
            transition: `width ${duration}s linear`,
          }} />
        <div style={{...textStyle, ...styles.inlineBlock}}>{newValue.toFixed(2)}</div>
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

