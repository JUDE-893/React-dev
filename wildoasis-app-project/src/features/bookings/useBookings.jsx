import {useQuery,useQueryClient} from '@tanstack/react-query';
import {useSearchParams} from 'react-router-dom';
import {getBookings} from '../../services/apiBookings';

export default function useBookings() {

  const [searchParams] = useSearchParams();
  const filterVal = searchParams.get('status') ?? 'all';
  const sortVal = searchParams.get('sortBy') ?? null;

  const filter = filterVal !== "all" ? {field:'status',value:filterVal,method:'eq'}:null;
  const filters = filter ? [filter] : filter;
  const sortBy = sortVal ? {field: sortVal.split('-')[0], order:sortVal.split('-')[1]} : {field: "created_at", order:"desc"}

  const queryClient = useQueryClient();


  const {data,isPending,error} = useQuery({
    queryKey: ['bookings',filter,sortBy],
    queryFn: () => getBookings({filters,sortBy})
  });

  return {bookings:data,isPending,error}
}
