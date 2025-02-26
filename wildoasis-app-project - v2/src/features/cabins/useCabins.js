import {useQuery} from '@tanstack/react-query';
import {getCabins} from '../../services/apiCabins';

export default function useCabins() {

  const {data,error,isPending} = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins
  })

  return {data,error,isPending}
}
