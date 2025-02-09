import {useMutation,useQueryClient} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import {updateBooking} from '../../services/apiBookings';

export default function useCheckIn(orn='in') {
  const {bookingId} = useParams();

  const queryClient = useQueryClient();

  const {mutate:checkin, error,isPending} = useMutation({
    mutationFn: updateBooking,
    onSuccess: () => {
      toast.success(`Booking got checked ${orn} successfully!` );
      queryClient.invalidateQueries({queryKey:['booking',bookingId]})
  },
    onError: (e) => toast.error(e)
  })

  return {checkin,isPending,error}
}
