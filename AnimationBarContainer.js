import React from 'react';
import ReactDOM from 'react-dom';

export default class AnimationBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    };
  }

  componentDidMount() {
    if (!this._container) return;

    const node = ReactDOM.findDOMNode(this._container);
    this.setState({ width: node.offsetWidth });
  }

  render() {
    const { width } = this.state;

    return (
      <div ref={ ref => this._container = ref }>
      {
        width === 0 ? null :
          React.Children.map(this.props.children, (child) => {
            child.props.style.width = width;
            return child;
          })
      }
      </div>
    );
  }
}
