import {useState,useEffect,useRef} from 'react'
import {useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {useAuth} from '../../Providers/AuthProvider';
import {useTrips} from '../../Providers/TripsProvider';
import {useActiveTrip} from '../../Providers/ActiveTripProvider';


export default function AddForm() {

  const location = useLocation();
  const cords = new URLSearchParams(location.search).get('lat')?.split('?lng=');
  const navigate = useNavigate();
  const submitRef = useRef(null);

  const {userData} = useAuth();
  const {tripsDispatcher} = useTrips();
  const {active} = useActiveTrip();
  const isModify = location.pathname.includes('/modify');
  const [lat,lng] = cords ?? active.cors;
  const [data, setData] = useState({
    date: (isModify ? active.trip.date : new Date().toISOString().split('T')[0]),
    description : null,
  });

  // fetching the city information
  useEffect( ()=> {
    //axios.get(`http://localhost:9600/city`)
    axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
    .then( (response) =>{
      setData({...data,lat: response.data.latitude,
        lng : response.data.longitude,
        cityName : response.data.city,
        countryName: response.data.countryName,
        countryFlag: countryFlag(response.data.countryCode),
        wikipediaId : response.data.localityInfo.administrative[3].wikidataId
       });
       // wikipediaId : response.data.wikidataId
    })
    .catch( (e) => {console.log(e);})
  },[lat,lng])

  // updating the state with the old trip data
  useEffect( () => {
    if (isModify) {
      setData({...active.trip});
    }
  },[isModify])

  // function that ..
  var handleTyping = (e) => {
    var col = e.target.name,
    val = e.target.value;

    setData({...data, [col]: val });
  }

  // function that returns the country flag from the country geocode
  var countryFlag = (GC) => {
    return GC.toUpperCase().split('').map( (c) => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))).join('');
  }

  // function that handles submitting the trip data to the server
  const handleSubmit = () => {
    if ( data.cityName !== "" && typeof data.cityName === 'string' ) {
      var Data = {...data, 'user_id' : userData.data.id};
      var url = 'http://127.0.0.1:8000/api/add_trip';

      if (isModify){
         Data = {...Data, 'id' : active.trip.id};
         url = 'http://127.0.0.1:8000/api/trips/modify';
       };

       axios.post(url,Data)
       .then( (respond) => {tripsDispatcher({operation:'reset'}); navigate('/app/cities'); console.log('trip',respond);})
      .catch( (e) => {console.log(e);});
      submitRef.current.disabled = true;
    };
  }

  return (
    <div className="add-form">
      <form className="Login" action="" method="post">
        <label for="cityName">City name</label>
        <div className="cityInput">
          <input type="text" name="cityName" value={data.cityName} onChange={(e) => {handleTyping(e)}}/>
          <span>{data.countryFlag}</span>
        </div>
        <label for="tripdate">When did you go to {data.cityName}?</label>
        <input type='date' name="date" value={data.date} onChange={(e) => {handleTyping(e)}}/>
        <label for="description">Notes about your trip to {data.cityName}</label>
        <textarea name="description" rows="0" cols="0" value={data.description} onChange={(e) => {handleTyping(e)}}></textarea>
        <div className='dual-btn'>
          <button ref={submitRef} className="btn" type="button" name="button" onClick={handleSubmit} >{isModify ? 'MODIFY':'ADD'}</button>
          <button className=" btn btn-outline" type="button" name="button" onClick={() => navigate('/app/cities')} ><FontAwesomeIcon icon={faArrowLeft} />BACK</button>
        </div>
      </form>
    </div>
  )
}
