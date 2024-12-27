import {createContext,useState,useContext,useEffect,useReducer} from 'react';
import axios from 'axios';
import {useAuth} from './AuthProvider';

const tripsReducer = (state,action) => {
  switch (action.operation) {
    case "allTrips":
      return {trips : action.trips}
      break;
    case 'delete_success':
      return {...state, trips: state.trips.filter( (t) => t.id !== action.id)};
      break
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
    if (Object.keys(state).length === 0 ){
      axios.get(`http://127.0.0.1:8000/api/trips/${user_id}`).then( (response) => {
        tripsDispatcher({trips: response.data.trips, operation : 'allTrips'}); console.log('getTrips',response);})
        .catch( (e) => {
          console.log('getTrips',e);
    })};
  },[state])

  // function that delete a user's trip
  const deleteTrip = (id,user_id) => {
    axios.post(`http://127.0.0.1:8000/api/trips/delete`,{id:id,user_id:user_id}).then( (response) =>{
      tripsDispatcher({operation: "delete_success",id:id});
      })
      .catch( (e) => {
        console.log('delete',e);
    })
  }

  return (
    <TripsContext.Provider value={{
      trips : state.trips ?? null,
      tripsDispatcher,
      deleteTrip
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
