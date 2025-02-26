import {useQuery, useMutation,useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {getSettings,updateSetting} from '../../services/apiSettings';



export default function useSetting() {

  // permanantly fetch and cach the settings data
  const {isPending,data,error} = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings
  });

  // set Query client
  const queryClient = useQueryClient();

  // set query mutation
  const {error:updateError,data:updatedSettings,isPending:isUpdating,mutate} = useMutation({
    mutationFn: updateSetting,
    onSuccess: () =>{toast.success('updated successfuly!');
                     queryClient.invalidateQueries({queryKey: ['settings']})
  },
    onError: (e) => toast.error(/*"Oops! can't update setting. Try again.."*/e.message)
  })

  return {updateError,updatedSettings,isUpdating,mutate, isPending,data,error}
}
