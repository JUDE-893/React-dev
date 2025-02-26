import {useMutation, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {deleteCabin} from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const {isPending, error,mutate} = useMutation({
    mutationFn: (toDelete) => deleteCabin(toDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cabins']});
      toast.success('Deleted Successfully!');
    },
    onError: (e) => {
      console.log(e);
      toast.error(e.message);
    }
  })
  return {isPending,mutate}
}
