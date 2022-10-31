import React, {useState, useCallback , useRef, useEffect} from "react";
import Map from "./Map";
import DisplayRestaurants from './DisplayRestaurants';
import axios from 'axios';
function MapLoader(){

  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const classRef = useRef(null);

  const restaurantList=[];
    const changeSearch = useCallback((event) => {
      let res= [...restaurantDetails];
      res.push(event);
      restaurantList.push(event);
    
      if (restaurantList.length >=9)
      {
        classRef.current.updateRestaurants(restaurantList);
        setRestaurantDetails(restaurantList);
      }

      
    })
    return (
      <><br/>
          <DisplayRestaurants ref= {classRef} />

        <Map
        onLoad={map => {
          const bounds = new window.google.maps.LatLngBounds();
          map.fitBounds(bounds);
        }}
        onUnmount={map => {
          // do your stuff before map is unmounted
        }}
        changeSearch={changeSearch}
        />
      </>
    );
};

export default MapLoader;