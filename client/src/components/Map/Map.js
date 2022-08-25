//https://www.npmjs.com/package/@react-google-maps/api
import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, LoadScript, places,StandaloneSearchBox } from '@react-google-maps/api';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useGeolocated } from "react-geolocated";


const containerStyle = {
  width: '900px',
  height: '900px'
};
var markerCluster;
var markers= [];

function MapComponent() {

  
  const [map, setMap] = React.useState(null);
  const [center,setCenter] = useState({lat:0, lng:1});
  
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
        if(coords !== undefined){
            // setCenter({
            //   lat: 0,
            //   lng: 0
            // });
            // if(center !== undefined){
              const bounds = new window.google.maps.LatLngBounds(center);
              map.fitBounds(bounds);
              setMap(map)
              console.log(markers)
            // }

        }
    }, [map,coords])
    const [places,setPlaces]=useState("");
    
    if(coords === undefined){
        return;
    }
    

    const handleLoad = ref =>{
      setPlaces(ref);
    };
  const handlePlacesChanged = () => {
    const google = window.google;
    const results=places.getPlaces();
    var service = new google.maps.places.PlacesService(map);
    var request = {
      location: results[0].geometry.location,
      radius: 5000,
      type: ['restaurant']
    }
    // console.log(service);
    // service.forEach((result) => {
    //   console.log(result);
    // })
    service.nearbySearch(request,callback);

    setCenter(results[0].geometry.location);
    // console.log(results[0].geometry.location)
    
  };
  
  function callback(results, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      // setMarkers([]);
      var tempArray=[];
      results.forEach((result)=> {
        tempArray.push(result.geometry.location);
        
      });
      console.log(markers);
      if(markers.length >0){

        
        markerCluster.removeMarkers(markers);
      }
      markers= [];
      tempArray.forEach((location) => {
        markers.push(
          new window.google.maps.Marker({
            position: location,
            map
          })
        )
      });
      console.log(markers);
      
      markerCluster =new MarkerClusterer({ markers, map });
      
      
      
    }
  }

    
   
  return (isGeolocationAvailable) ?  (
    <LoadScript id="script-loader" googleMapsApiKey="AIzaSyAAnHKToKQ9imzJRKXzFVU8optXACQsr8M" libraries={["places"]}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* {markers.map((mark,index) => <Marker key={index} position={mark} />)}
        {console.log(markers)} */}
        <StandaloneSearchBox
          onLoad={handleLoad}
          onPlacesChanged={handlePlacesChanged}
          
        >
          <input
            type="text"
            placeholder="Enter Suburb"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px"
            }}
          />
        </StandaloneSearchBox>
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      </LoadScript>
  ) : <></>
}


export default React.memo(MapComponent)