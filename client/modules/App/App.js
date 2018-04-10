import React, { Component } from 'react';

// Import Components
import Helmet from 'react-helmet';
import GoogleMap from '../GoogleMap/GoogleMap';
// import DevTools from './components/DevTools';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }


  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development'/* && <DevTools /> */}
        <div>
          <Helmet
            title="Weather Tweets"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <GoogleMap />
        </div>
      </div>
    );
  }
}

export default App;
