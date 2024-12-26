import {memo, useState} from 'react';
import {MapContainer,TileLayer,Marker,Popup,useMapEvents} from 'react-leaflet';
import {useNavigate} from 'react-router-dom';
import Profile from './Profile'
import {useTrips} from '../../Providers/TripsProvider';



export default memo(function Map() {

  const [position,setPosition] = useState([51.505, -0.09]);
  const {trips} = useTrips();

  return (
    <MapContainer center={position} zoom={6} scrollWheelZoom={true}>
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
   </MapContainer>
  )
})

function InteractiveMap() {
  const navigate = useNavigate();

  useMapEvents({
    click : e => {console.log(e.latlng.lng); navigate(`/app/add?lat=${e.latlng.lat}?lng=${e.latlng.lng}`)}
  })
}
