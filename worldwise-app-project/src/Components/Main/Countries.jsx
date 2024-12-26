import {memo} from 'react';
import {useTrips} from '../../Providers/TripsProvider';


export default memo(function Countries() {

  const {trips} = useTrips();

  const countries = () => {
    if (trips !== null){
      return Array.from(new Set(trips.map((cnt) => {
                      return JSON.stringify({countryName :  cnt.countryName,
                      countryFlag : cnt.countryFlag})}
                    ))).map( (str) => JSON.parse(str));

    }else {
      return null;
    }}


  return (
    <div className="Countries">
      {countries() !== null && countries().map( (cnt) => {
        return <div className="trip-box">
          <span className="flag">{cnt.countryFlag}</span>
          <span className="">{cnt.countryName}</span>
        </div>
      })}


    </div>
  )
})
