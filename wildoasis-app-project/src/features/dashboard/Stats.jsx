import {HiOutlineBriefcase,HiOutlineChartBar,HiOutlineBanknotes,HiOutlineCalendarDays} from 'react-icons/hi2';
import Stat from './Stat';
import {formatCurrency} from '../../utils/helpers';

export default function stats({stays,days,confirmedStays,bookings,cabins}) {
  //1 bookings
  const stayLength = bookings?.length;
  //2
  const sales = bookings?.reduce( (acc,cur) => acc + cur.total_price, 0)
  //3 check-ins
  const checkInsLength = stays?.filter( (bk) => bk.status === 'checked-in')?.length;
  const total_nights =  confirmedStays?.reduce( (acc,cur) => acc+cur?.num_nights,0)
  const occupancyRate = (total_nights/(days*cabins?.length)*100).toFixed(1)


  return (
    <>
      <Stat icon={<HiOutlineBriefcase/>} title="Bookings" color="blue" value={stayLength}/>
      <Stat icon={<HiOutlineBanknotes/>} title="Sales" color="green" value={formatCurrency(sales)}/>
      <Stat icon={<HiOutlineCalendarDays/>} title="Check-ins" color="indigo" value={checkInsLength}/>
      <Stat icon={<HiOutlineChartBar/>} title="Occupency rate" color="yellow" value={'~'+occupancyRate+"%"}/>
    </>
  )
}
