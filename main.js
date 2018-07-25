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
      ratio: 100, // value/width ratio
      duration: 5, // each keyframe duration
      year: 0,
      provinces: [
        { name: 'guangdong', color: 'gray' },
        { name: 'jiangsu',   color: 'orange' }
      ]
    };

    this._onDone = this.onDone.bind(this);
    this._count = 0;
  }

  onDone() {
    this._count++;
    const { provinces, year } = this.state;
    if (this._count === provinces.length && year < 9) {
      this._count = 0;
      this.setState((prevState, props) => {
        return {
          year: prevState.year + 1
        }
      });
    }
  }

  render() {
    const { duration, ratio, provinces, year } = this.state;

    return (
      <div>
      {
        provinces.map((province, index) => {
          const gdp = GDP[province.name][year];

          return (
            <AnimationBar
              style={{
                marginTop: 5,
                marginBottom: 5,
                height: 30
              }}
              color={province.color}
              key={index}
              duration={duration}
              ratio={ratio}
              value={gdp}
              onDone={this._onDone} />
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

