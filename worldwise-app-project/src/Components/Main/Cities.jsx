import {useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {useTrips} from '../../Providers/TripsProvider';
import {useActiveTrip} from '../../Providers/ActiveTripProvider';
// import useActiveTrip from '../../Hooks/useActiveTrip';

export default function Cities(props) {

  const {trips,tripsDispatcher,deleteTrip} = useTrips();
  const {active, activate} = useActiveTrip();
  const navigate = useNavigate();


  console.log('cites');
  return (
    <div className="Cities">

      {trips !== null && trips.map((item, i) => {
        return <div key={i} id={i} className={`trip-box ${active.index === i ? 'trip-box-active' : ""}`} onClick={()=>{activate({index:i,trip:item}); navigate('/app/trip/'+ item.cityName)}}>
              <div className="">
              <span className="flag">{item.countryFlag}</span>
              <span className="">{item.cityName}</span>
              </div>
              <div className="">
              <p>({format(new Date(item.date), 'MMMM d,yyyy')})</p>
              <FontAwesomeIcon id={item.id} icon={faCircleXmark} onClick={ (e) =>{deleteTrip(item.id,item.user_id); e.stopPropagation()}} />
              </div>
              </div>
            })
      }
    </div>
  )
}
