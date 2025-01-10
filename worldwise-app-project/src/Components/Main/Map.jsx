import {useState,useEffect} from 'react';
import {MapContainer,TileLayer,Marker,Popup,useMapEvents,useMap} from 'react-leaflet';
import L from 'leaflet';
import {useNavigate, useLocation} from 'react-router-dom';
import Profile from './Profile'
import {useTrips} from '../../Providers/TripsProvider';
import {useActiveTrip} from '../../Providers/ActiveTripProvider';
import {useGeoLocation} from '../../Hooks/useGeoLocation';



export default function Map() {

  const [position,setPosition] = useState([55.505, -0.09]);
  const {trips} = useTrips();
  const {active} = useActiveTrip();
  const {position : currentPosition, error : currentPositionError,isLoading,setIsLoading,getGeoLocation} = useGeoLocation();

  // updatting the state variable with e the user's current position
  useEffect( () => {
    console.log('currentPosition',currentPosition);
    if (currentPosition !== null){setPosition([...currentPosition])}
  },[currentPosition])

  // updatting the state variable with e the user's current position
  useEffect( () => {
    if (active.cors) setPosition([...active.cors]);
  },[active])

  const currentPositionIcon = new L.Icon({
    iconUrl : "https://cdn-icons-png.flaticon.com/128/2998/2998894.png" /*'https://cdn-icons-png.flaticon.com/128/4881/4881521.png'*/,
    iconSize :  [32,32],
    iconAnchor : [15,30],
    popupAnchor: [0, -30],
    className : 'current-marker'
  })

  // const activeTripMarker = new L.Icon({
  //   iconUrl : "https://cdn-icons-png.flaticon.com/128/2776/2776000.png",
  //   iconSize : [32,32],
  //   iconAnchor :  [15,30],
  //   popupAnchor : [0,-30],
  //   className : 'activetrip-marker'
  // })

  return (
    <MapContainer center={position} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {trips !== null && trips.map( (trp) => {
          return <Marker position={[trp.lat,trp.lng]} >
            <Popup>
              {trp.cityName} <br /> {trp.countryName}
            </Popup>
          </Marker>
        })}

        {currentPosition !== null && <Marker position={[...currentPosition]} icon={currentPositionIcon}>
          <Popup>
            You Are Here!
          </Popup>
        </Marker>}

        <Profile />
        <div className='btm-center'><button className='btn btn-position' onClick={(e) => {getGeoLocation();e.stopPropagation()}}>{isLoading ? 'loading..' : 'Get Your Position'}</button></div>
        <InteractiveMap/>
        <TripPointer position={position} />
   </MapContainer>
  )
}

// functionnal component that navigate to add trip form and update the url with the current position cords on the map
function InteractiveMap() {
  const navigate = useNavigate();
  const isModify = useLocation().pathname.includes('/modify');

  useMapEvents({
    click : e => {console.log('ee',e.originalEvent.target.className); if(e.originalEvent.target.className !== 'btn btn-position'){ navigate(`/app/trip/${isModify ? 'modify' : 'add'}?lat=${e.latlng.lat}?lng=${e.latlng.lng}`)}}
  })
}

// fuctionnal component that point to the position on the map of a trip selected by the user
function TripPointer({position}) {
  const map = useMap();
  console.log('position',position);
  map.setView(position ?? [44,4]);
  return null
}
