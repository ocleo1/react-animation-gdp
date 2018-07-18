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
      duration: 5 * 60, // 60Hz per second
      year: 0,
      provinces: [
        { name: 'guangdong', color: 'gray' },
        { name: 'jiangsu',   color: 'orange' }
      ]
    };

    this._onDone = this.onDone.bind(this);
    this._finished = new Array(this.state.provinces.length).fill(false);
  }

  onDone(index) {
    this._finished[index] = true;
    var unfinished = this._finished.filter(item => !item);
    if (unfinished.length === 0 && this.state.year < 9) {
      this.setState((prevState, props) => {
        return {
          year: prevState.year + 1
        }
      });
    }
  }

  render() {
    const { duration, provinces, year } = this.state;

    return (
      <div>
      {
        provinces.map((province, index) => {
          const gdp = GDP[province.name][year];
          const width = Math.floor(gdp / 100);

          let prevGDP = 0;
          if (year > 0) {
            prevGDP = GDP[province.name][year-1];
          }
          const speed = parseFloat(((gdp - prevGDP) / (100 * duration)).toFixed(2));

          return (
            <AnimationBar
              color={province.color}
              index={index}
              key={index}
              onDone={this._onDone}
              speed={speed}
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

