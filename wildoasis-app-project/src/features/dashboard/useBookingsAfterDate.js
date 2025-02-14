import {useQuery} from '@tanstack/react-query';
import {useSearchParams} from 'react-router-dom';
import {subDays} from 'date-fns';
import {getBookingsAfterDate} from '../../services/apiBookings';

export default function useBookingsAfterDate() {

  // get the filter value
  const [searchParams, setSearchParams] = useSearchParams();
  const days = searchParams.get("last") ? +(searchParams.get("last")) : 7;
  const date = subDays(new Date(), days).toISOString();

  const {data,isPending} = useQuery({
    queryKey: ['bookings',days],
    queryFn: () => getBookingsAfterDate(date)
  });

  return {bookings:data,isPending};
}
