import React from 'react';
import ReactDOM from 'react-dom';
import AnimationBar from './AnimationBar';
import AnimationBarCSS from './AnimationBarCSS';
import AnimationBarCanvas from './AnimationBarCanvas';
import AnimationBarContainer from './AnimationBarContainer';

const GDP = {
  guangdong: [
    31777.01, 36796.71, 39482.56, 46013.06, 53210.28,
    57067.92, 62474.79, 67809.85, 72812.55, 80854.91
  ],
  jiangsu: [
    26018.48, 30981.98, 34457.30, 41425.48, 49110.27,
    54058.22, 59753.37, 65088.32, 70116.38, 77388.28
  ],
  shandong: [
    25776.91, 30933.28, 33896.65, 39169.92, 45361.85,
    50013.24, 55230.32, 59426.59, 63002.33, 68024.49
  ],
  zhejiang: [
    18753.73, 21462.69, 22990.35, 27722.31, 32318.85,
    34665.33, 37756.59, 40173.03, 42886.49, 47251.36
  ],
  fujian: [
    9248.53, 10823.01, 12236.53, 14737.12, 17560.18,
    19701.78, 21868.49, 24055.76, 25979.82, 28810.58
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
        { name: 'shandong',  color: 'pink' },
        { name: 'zhejiang',  color: 'blue' },
        { name: 'fujian',    color: 'red' },
        { name: 'jiangsu',   color: 'orange' },
        { name: 'guangdong', color: 'gray' }
      ]
    };

    this._count = 0;
    this._count2 = 0;
    this._provinces = [];
    this._provinces2 = [];

    this._onDone = this.onDone.bind(this);
    this._onValueChange = this.onValueChange.bind(this);
    this._onTransitionCompleted = this.onTransitionCompleted.bind(this);
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

  onTransitionCompleted() {
    this._count2++;
    const { provinces } = this.state;
    if (this._count2 === provinces.length) {
      this._count2 = 0;
      this.setState({
        province: this._provinces2
      });
    }
  }

  onValueChange(value, rank) {
    const { provinces } = this.state;
    this._provinces.push(Object.assign({value: value, rank: rank}, provinces[rank]));

    if (this._provinces.length === provinces.length) {
      this._provinces2 = this._provinces
        .sort((a, b) => a.rank > b.rank)
        .map((item, index) => Object.assign({prevRank: index}, item));
      this._provinces2.sort((a, b) => a.value < b.value)
        .map((province, index) => {
          this._provinces[province.prevRank].rank = index
          delete this._provinces[province.prevRank].value;
          delete province.value;
        });

      this.setState({
        provinces: this._provinces
      }, () => {
        this._provinces = [];
      });
    }
  }

  render() {
    const { duration, ratio, provinces, year } = this.state;

    let type = 'canvas';
    let Bar = null;
    switch (type) {
      case 'canvas':
        Bar = AnimationBarCanvas;
        break;
      case 'css':
        Bar = AnimationBarCSS;
        break;
      default:
        Bar = AnimationBar;
    }

    return (
      <AnimationBarContainer>
      {
        provinces.map((province, index) => {
          const gdp = GDP[province.name][year];
          const rank = isNaN(province.rank) ? index : province.rank;

          return (
            <Bar
              style={{
                marginTop: 5,
                marginBottom: 5,
                height: 30,
                transition: 'all 3s'
              }}
              textStyle={{
                color: 'black',
                font: '16px serif',
                marginLeft: 5
              }}
              color={province.color}
              key={province.name}
              name={province.name}
              rank={rank}
              duration={duration}
              ratio={ratio}
              value={gdp}
              onDone={this._onDone}
              onTransitionCompleted={this._onTransitionCompleted}
              onValueChange={this._onValueChange} />
          );
        })
      }
      </AnimationBarContainer>
    );
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('root')
);

