import React from 'react';
import ReactDOM from 'react-dom';
import AnimationBar from './AnimationBar';

const GDP = {
  guangdong: [
    31777.01, 36796.71, 39482.56, 46013.06, 53210.28,
    57067.92, 62474.79, 67809.85, 72812.55, 80854.91
  ],
  jiangsu: [
    26018.48, 30981.98, 34457.30, 41425.48, 49110.27,
    54058.22, 59753.37, 65088.32, 70116.38, 77388.28
  ]
};

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 0,
      provinces: [
        { name: 'guangdong', color: 'gray' },
        { name: 'jiangsu',   color: 'orange' }
      ]
    };
  }

  componentDidMount() {
    this._intervalID = setInterval(() => {
      if (this.state.year > 9) {
        clearInterval(this._intervalID);
      } else {
        this.setState((prevState, props) => {
          return {
            year: prevState.year + 1
          }
        });
      }
    }, 10000);
  }

  render() {
    const { provinces, year } = this.state;

    return (
      <div>
      {
        provinces.map((province, index) => {
          const width = Math.floor(GDP[province.name][year] / 100);
          return (
            <AnimationBar
              color={province.color}
              key={index}
              speed={2}
              width={width} />
          );
        })
      }
      </div>
    );
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('root')
);

