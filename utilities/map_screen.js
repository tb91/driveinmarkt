import React from 'react';
import {withScriptjs, withGoogleMap,
  GoogleMap} from 'react-google-maps';
import PropTypes from 'prop-types';

import ShopMarker from './shop_marker';

const renderPositionMarker=({lat, lng})=>{
  return <ShopMarker key={lat+lng} position={{lat, lng}} />;
};

renderPositionMarker.propTypes={
  lat: PropTypes.number,
  lng: PropTypes.number,
};

const MapScreen = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.defaultZoom}
    defaultCenter={{lat: props.user.lat, lng: props.user.lng}} // TODO: add users location here
    {...props}
  >
    {props.isMarkerShown &&
    props.positions.map((position)=>renderPositionMarker(position))}

  </GoogleMap>,
));
MapScreen.propTypes={
  defaultZoom: PropTypes.number,
  isMarkerShown: PropTypes.bool,
  googleMapURL: PropTypes.string,
  positions: PropTypes.array,
  user: PropTypes.objectOf({lat: PropTypes.number, lng: PropTypes.number}),
};

MapScreen.defaultProps={
  user: {lat: 52.526967, lng: 13.436730},
  positions: [{lat: 52.526967, lng: 13.436730}],
  defaultZoom: 15,
  isMarkerShown: true,
  googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCpQoG4dkKnMyGd9-tJ79CGTZXm8ckeYbM',
};


export default MapScreen;
