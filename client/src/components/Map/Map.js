//https://www.npmjs.com/package/@react-google-maps/api
import React, { useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useGeolocated } from "react-geolocated";


const containerStyle = {
  width: '400px',
  height: '400px'
};


function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAAnHKToKQ9imzJRKXzFVU8optXACQsr8M"
  })
  
  const [map, setMap] = React.useState(null)

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
            useGeolocated({
                positionOptions: {
                    enableHighAccuracy: false,
                },
                userDecisionTimeout: 5000,
            });
    
    const onLoad = React.useCallback(function callback(map) {
        if(coords != undefined){
            const bounds = new window.google.maps.LatLngBounds(center);
            map.fitBounds(bounds);
            setMap(map)
        }
    }, [])

    if(coords == undefined){
        return;
    }
    
    const center = {
        lat: coords.latitude,
        lng: coords.longitude
    };
    
    console.log(coords)
  return (isGeolocationAvailable && isLoaded) ?  (
    
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}


export default React.memo(MapComponent)