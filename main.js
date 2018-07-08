import React from 'react';
import ReactDOM from 'react-dom';
import AnimationBar from './AnimationBar';

const Example = () => {
	return <AnimationBar color="orange" speed={2} width={500} />;
}

ReactDOM.render(
  <Example />,
  document.getElementById('root')
);

