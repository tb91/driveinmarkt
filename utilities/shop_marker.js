import React from 'react';
import {Marker} from 'react-google-maps';
import PropTypes from 'prop-types';


const ShopMarker = (props)=>{
  const {id} = props;

  const onMarkerClick = (evt) => {
    console.log(id);
  };

  return (<Marker onClick={onMarkerClick}
    {...props} />);
};
ShopMarker.propTypes={
  id: PropTypes.string,
};

export default ShopMarker;
