import {memo} from 'react';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {useTrips} from '../../Providers/TripsProvider';
import useActiveTrip from '../../Hooks/useActiveTrip';

export default memo( function Cities(props) {

  const {trips,tripsDispatcher,deleteTrip} = useTrips();
  const {active, activate} = useActiveTrip();

//  console.log('trps: ',trips);
 console.log('active: ',active);

  return (
    <div className="Cities">

      {trips !== null && trips.map((item, i) => {

        return <div key={i} id={i} className="trip-box" onClick={()=>activate({index:i,trip:item})}>
              <div className="">
              <span className="flag">{item.countryFlag}</span>
              <span className="">{item.cityName}</span>
              </div>
              <div className="">
              <p>{format(new Date(item.date), 'MMMM d,yyyy')}</p>
              <FontAwesomeIcon id={item.id} icon={faCircleXmark} onClick={ (e) =>{deleteTrip(item.id,item.user_id); e.stopPropagation()}} />
              </div>
              </div>
            })
      }




    </div>
  )
})
