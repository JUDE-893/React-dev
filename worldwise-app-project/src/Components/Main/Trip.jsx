import {memo} from 'react';
import {useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {useActiveTrip} from '../../Providers/ActiveTripProvider';

export default memo( function Trip() {

  const {active} = useActiveTrip();
  const navigate = useNavigate();

  return (
    <div className="Trip">

      <div className="">
        <p className='sec-title'>City Name</p>
        <div className="">
          <span className="flag">{active.trip.countryFlag}</span>
          <span className="">{active.trip.cityName}</span>
        </div>
      </div>

      <div className="">
        <p className='sec-title freak'>You Went To {active.trip.cityName}</p>
        <p className="trip-date">{format(new Date(active.trip.date), 'EEE, MMMM d,yyyy')}</p>
      </div>

      {active.trip.description && <div className="">
        <p className='sec-title freak'>Your Notes</p>
        <p className="trip-desc">{active.trip.description}</p>
      </div>}

      <div className="">
        <p className='sec-title'>Learn More</p>
        <a href='https://en.wikipedia.org/wiki/Sotillo_del_Rinc%C3%B3n' className="wiki-link" target="_blank">Check out {active.trip.cityName} on Wikipedia <FontAwesomeIcon icon={faArrowRight} /></a>
      </div>

      <div className='dual-btn'>
        <button className="btn" type="button" name="button" onClick={() => navigate('/app/cities')} >MODIFY</button>
        <button className=" btn btn-outline" type="button" name="button" onClick={() => navigate('/app/cities')} ><FontAwesomeIcon icon={faArrowLeft} />BACK</button>
      </div>

    </div>
  )
})
