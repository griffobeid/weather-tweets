import React, { PureComponent } from 'react';

const pinStyle = {
  cursor: 'hand',
  fill: '#d00',
  stroke: 'none',
};

export default class TweetMarker extends PureComponent {
  render() {
    const { onClick } = this.props;
    return (
      <svg style={pinStyle} x="0px" y="0px" viewBox="0 0 100 125" enableBackground="new 0 0 100 100" width="17" height="auto" onClick={onClick}>
        <path
          d="M50,9.247c-13.44,0-24.375,10.934-24.375,24.375c0,5.375,1.723,10.476,4.981,14.75c3.039,3.984,7.299,6.984,12.043,8.49
          v21.744c0,0.131,0.035,0.26,0.101,0.375l6.582,11.398c0.135,0.232,0.381,0.375,0.648,0.375c0.27,0,0.516-0.143,0.65-0.375
          l6.48-11.227c0.146-0.137,0.238-0.332,0.238-0.547V56.863c4.746-1.508,9.006-4.506,12.043-8.492c3.26-4.274,4.982-9.375,4.982-14.75
          C74.375,20.181,63.441,9.247,50,9.247z M50,19.147c7.982,0,14.475,6.493,14.475,14.475S57.982,48.096,50,48.096
          c-7.981,0-14.474-6.493-14.474-14.475S42.019,19.147,50,19.147z"
        />
      </svg>
    );
  }
}
