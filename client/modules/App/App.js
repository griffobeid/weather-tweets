import React, { Component } from 'react';

// Import Components
import Helmet from 'react-helmet';
import Mapbox from '../Mapbox/Mapbox.js';
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
          <Mapbox token="pk.eyJ1IjoiZ29iZWlkIiwiYSI6ImNqY2plOTY3cjNjZGEzNG1tYTBhNDR4ODcifQ.Gk_662sQu4i6GmshCbCQ8Q" />
        </div>
      </div>
    );
  }
}

export default App;
