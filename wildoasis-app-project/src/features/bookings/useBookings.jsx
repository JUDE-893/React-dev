import {useQuery,useQueryClient} from '@tanstack/react-query';
import {useSearchParams} from 'react-router-dom';
import {getBookings} from '../../services/apiBookings';

export default function useBookings() {

  const [searchParams,setSearchParams] = useSearchParams();
  const filterVal = searchParams.get('status') ?? 'all';
  const sortVal = searchParams.get('sortBy') ?? null;
  const page = searchParams.get('page') ? searchParams.get('page')-1 : 0;
  

  const filter = filterVal !== "all" ? {field:'status',value:filterVal,method:'eq'}:null;
  const filters = filter ? [filter] : filter;
  const sortBy = sortVal ? {field: sortVal.split('-')[0], order:sortVal.split('-')[1]} : {field: "created_at", order:"desc"};
  // const page = pageIndex ? +(pageIndex.split('-of-')[0])-1 :  0;


  const queryClient = useQueryClient();


  const {data,isPending,error} =  useQuery({
    queryKey: ['bookings',filter,sortBy,page],
    queryFn: () => getBookings({filters,sortBy,page})
  });



  // console.log(data.count);
  return {bookings:data,isPending,error}
}
