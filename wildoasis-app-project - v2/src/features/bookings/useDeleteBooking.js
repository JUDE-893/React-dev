import {useMutation,useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {deleteBooking} from '../../services/apiBookings';

export default function useBooking() {

  const queryClient = useQueryClient();

  const {mutate,isPending,error} = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success(`Booking got deleted successfully!` );
      queryClient.invalidateQueries({queryKey:['bookings']})
  },
    onError: (e) => toast.error(e)
  })



  return {mutate,isPending,error}


}
