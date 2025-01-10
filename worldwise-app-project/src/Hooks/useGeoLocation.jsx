import {useState} from 'react';


export function useGeoLocation (){
  const [position ,setPosition] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState(false);


  // function that fetches the user's current geolocation & update the state variables
  const getGeoLocation = () => {
    if (!navigator.geolocation) {
      setError("Your Browser doesn't support geolocation");
    }else {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log('lat:::',pos.coords.latitude);
          setIsLoading(false);
          setPosition([pos.coords.latitude,pos.coords.longitude]);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    )
    }
  };

  return {position, isLoading,error, getGeoLocation,setIsLoading};
}
