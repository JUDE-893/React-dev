import {useState,useEffect,memo} from 'react'
import {useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';


export default memo( function AddForm() {

  const cords = new URLSearchParams(useLocation().search).get('lat').split('?lng='),
  [lat,lng] = cords;


  const [data, setData] = useState({
    date: new Date().toISOString().split('T')[0],
    description : null,
  });

  // fetching the city information
  useEffect( ()=> {
    axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
    .then( (response) =>{
      console.log('res : ',response);
      setData({...data,lat: response.data.latitude,
        lng : response.data.longitude,
        cityName : response.data.city,
        countryName: response.data.countryName,
        flag: countryFlag(response.data.countryCode),
        wikipediaId : response.data.localityInfo.administrative[3].wikidataId
       });
    })
    .catch( (e) => {})
  },[cords])

  // function that ..
  var handleTyping = (e) => {
    console.log(e.target);
    var col = e.target.name,
    val = e.target.value;

    setData({...data, [col]: val });
  }

  // function that returns the country flag from the country geocode
  var countryFlag = (GC) => {
    return GC.toUpperCase().split('').map( (c) => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))).join('');
  }

  console.log(data);
  return (
    <div className="add-form">
      <form className="Login" action="" method="post">
        <label for="cityName">City name</label>
        <div className="cityInput">
          <input type="text" name="cityName" value={data.cityName} onChange={(e) => {handleTyping(e)}}/>
          <span>{data.flag}</span>
        </div>
        <label for="tripdate">When did you go to {data.cityName}?</label>
        <input type='date' name="date" value={data.date} onChange={(e) => {handleTyping(e)}}/>
        <label for="description">Notes about your trip to {data.cityName}</label>
        <textarea name="description" rows="0" cols="0" value={data.description} onChange={(e) => {handleTyping(e)}}></textarea>
        <div className='dual-btn'>
          <button className="btn" type="button" name="button" >ADD</button>
          <button className=" btn btn-outline" type="button" name="button" ><FontAwesomeIcon icon={faArrowLeft} />BACK</button>
        </div>
      </form>
    </div>
  )
})
