import {useMutation} from '@tanstack/react-query';
import {createCabin} from '../../services/apiCabins';

export function useCreateEditCabin() {
  const {error,isPending,mutate} = useMutation({
    mutationFn: createCabin,
  })
  return {error, isPending, mutate}
}
