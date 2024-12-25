import {useState,useEffect,memo} from 'react'
import {useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {useAuth} from '../../Providers/AuthProvider';


export default memo( function AddForm() {

  const cords = new URLSearchParams(useLocation().search).get('lat').split('?lng='),
  [lat,lng] = cords;

  const {userData} = useAuth();
  const [data, setData] = useState({
    date: new Date().toISOString().split('T')[0],
    description : null,
  });

  // fetching the city information
  useEffect( ()=> {
    //axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
    axios.get(`http://localhost:9600/city`)
    .then( (response) =>{
      setData({...data,lat: response.data.latitude,
        lng : response.data.longitude,
        cityName : response.data.city,
        countryName: response.data.countryName,
        countryFlag: countryFlag(response.data.countryCode),
        wikipediaId : response.data.wikidataId
       });
       //wikipediaId : response.data.localityInfo.administrative[3].wikidataId
    })
    .catch( (e) => {console.log(e);})
  },[lat,lng])

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
      axios.post('http://127.0.0.1:8000/api/add_trip',Data)
      .then( (respond) => {console.log('trip',respond);})
      .catch( (e) => {console.log(e);})
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
          <button className="btn" type="button" name="button" onClick={handleSubmit} >ADD</button>
          <button className=" btn btn-outline" type="button" name="button" ><FontAwesomeIcon icon={faArrowLeft} />BACK</button>
        </div>
      </form>
    </div>
  )
})
