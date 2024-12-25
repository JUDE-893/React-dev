import {createContext,useState,useContext,useEffect,useReducer} from 'react';
import axios from 'axios';
import {useAuth} from './AuthProvider';

const tripsReducer = (state,action) => {
  switch (action.operation) {
    case "allTrips":
      return {trips : action.trips}
      break;
    default:
    return state;

  }
}

const TripsContext =  createContext();

function TripsProvider({children}) {

  const [state,tripsDispatcher] = useReducer(tripsReducer,{});
  const {userData} = useAuth();
  const user_id = userData.data.id;

  // fetch all user's trips
  useEffect( () => {
    axios.get(`http://127.0.0.1:8000/api/trips/${user_id}`).then( (response) => {tripsDispatcher({trips: response.data.trips, operation : 'allTrips'}); console.log('getTrips',response);})
    .catch( (e) => {
      console.log('getTrips',e);
    });
  },[user_id])

  return (
    <TripsContext.Provider value={{
      trips : state.trips ?? null,
      tripsDispatcher
    }}>
      {children}
    </TripsContext.Provider>
  )
}

// trips retriever hook
function useTrips() {
  if (useContext(TripsContext)) {
    return useContext(TripsContext);
  }else {
    throw new Error('useTrips Hook ws used outside of its respective scoop.');
  }
}

export {useTrips,TripsProvider};
