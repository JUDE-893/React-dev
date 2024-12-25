import {memo} from 'react';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {useTrips} from '../../Providers/TripsProvider';

export default memo( function Cities(props) {

  const {trips,tripsDispatcher} = useTrips();
  console.log('trps: ',trips);

  return (
    <div className="Cities">

      {trips.map((item, i) => {

        return <div key={i} id={i} className="trip-box">
              <div className="">
              <span className="flag">{item.countryFlag}</span>
              <span className="">{item.cityName}</span>
              </div>
              <div className="">
              <p>{format(new Date(item.date), 'MMMM d,yyyy')}</p>
              <FontAwesomeIcon id={item.id} icon={faCircleXmark} />
              </div>
              </div>
            })
      }




    </div>
  )
})
