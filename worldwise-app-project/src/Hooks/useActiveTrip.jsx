import {useState} from 'react';


export default function useActiveTrip (){
  const [active ,setActive] = useState({index: null, cors: null});

  // function that update the state variable
  const activate = (data) => {
    setActive({index : data.index, trip : data.trip, cors : [ +(data.trip.lat), +(data.trip.lng)]});
  }
  return {active, activate};
}
