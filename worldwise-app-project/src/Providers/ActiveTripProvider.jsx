 import {useState,useContext,createContext} from 'react';

const ActiveTripContext = createContext();

function ActiveTripProvider ({children}){

  const [active ,setActive] = useState({index: null, cors: null});

  // function that update the state variable
  const activate = (data) => {
    setActive({index : data.index, trip : data.trip, cors : [ +(data.trip.lat), +(data.trip.lng)]});
  };
  return (
    <ActiveTripContext.Provider value={{active,activate}}>
      {children}
    </ActiveTripContext.Provider>
  )
}

// activeTrip custom context hook
function useActiveTrip() {
  const context = useContext(ActiveTripContext);

  if (!context) {
    throw new Error('useActiveTrip context hook was use outside of its respective scoop');
  }

  return context;
}

export {useActiveTrip,ActiveTripProvider};
