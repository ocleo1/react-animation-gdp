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
    const { width } = this.props;
    if (this.state.width < width) {
      this._requestID = requestAnimationFrame(this.increase);
    } else {
      cancelAnimationFrame(this._requestID);
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
		const { height, color } = this.props;
    const { width } = this.state;

    return (
      <div>
        <div
          style={{
            height: height,
            width: width,
            backgroundColor: color
          }} />
      </div>
    );
  }
}

