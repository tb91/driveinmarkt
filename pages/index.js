import React from 'react';
import MapScreen from '../utilities/map_screen';
import Layout from '../utilities/layout';

const Home = () => (
  <Layout>
    <div className="w-100">
      <MapScreen
        loadingElement={<div style={{height: 'calc(100vh - 56px)'}} />}
        containerElement=
          {<div style={{width: '100%', height: `calc(100vh - 56px)`}} />}
        mapElement={<div style={{height: 'calc(100vh - 56px)'}} />}
      />
    </div>
  </Layout>
);

export default Home;
