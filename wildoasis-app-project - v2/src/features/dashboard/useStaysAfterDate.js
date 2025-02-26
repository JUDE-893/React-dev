import {useQuery} from '@tanstack/react-query';
import {useSearchParams} from 'react-router-dom';
import {subDays} from 'date-fns';
import {getStaysAfterDate} from '../../services/apiBookings';

export default function useStaysAfterDate() {

  // get the filter value
  const [searchParams, setSearchParams] = useSearchParams();
  const days = searchParams.get("last") ? +(searchParams.get("last")) : 7;
  const date = subDays(new Date(), days).toISOString();

  const {data,isPending} = useQuery({
    queryKey: ['stays',days],
    queryFn: () => getStaysAfterDate(date)
  });

  const confirmedStays = data?.filter( (stay) => (stay.status === 'checked-in' || stay.status === 'checked-out'));

  return {stays:data,confirmedStays,days,isPending};
}
