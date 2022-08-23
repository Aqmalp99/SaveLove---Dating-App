import React from "react";
import Map from "./Map";

function MapLoader(){
    return (
      
        <Map
        onLoad={map => {
          const bounds = new window.google.maps.LatLngBounds();
          map.fitBounds(bounds);
        }}
        onUnmount={map => {
          // do your stuff before map is unmounted
        }}
        />
      
    );
};

export default MapLoader;