import {memo, useState} from 'react';
import {MapContainer,TileLayer,Marker,Popup,useMapEvents,useMap} from 'react-leaflet';
import {useNavigate} from 'react-router-dom';
import Profile from './Profile'
import {useTrips} from '../../Providers/TripsProvider';
import {useActiveTrip} from '../../Providers/ActiveTripProvider';
//import useActiveTrip from '../../Hooks/useActiveTrip';



export default memo(function Map() {

  //const [position,setPosition] = useState([55.505, -0.09]);
  const {trips} = useTrips();
  const {active, activate} = useActiveTrip();

  console.log('roo',active);
  return (
    <MapContainer center={[51,-1]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {trips !== null && trips.map( (trp) => {
          return <Marker position={[trp.lat,trp.lng]}>
            <Popup>
              {trp.cityName} <br /> {trp.countryName}
            </Popup>
          </Marker>
        })}
        <Profile />
        <InteractiveMap/>
        <TripPointer position={active.cors} />
   </MapContainer>
  )
})

// functionnal component that navigate to add trip form and update the url with the current position cords on the map
function InteractiveMap() {
  const navigate = useNavigate();

  useMapEvents({
    click : e => {console.log(e.latlng.lng); navigate(`/app/add?lat=${e.latlng.lat}?lng=${e.latlng.lng}`)}
  })
}

// fuctionnal component that point to the position on the map of a trip selected by the user
function TripPointer({position}) {
  const map = useMap();
  console.log('position',position);
  map.setView(position ?? [44,4]);
  return null
}
