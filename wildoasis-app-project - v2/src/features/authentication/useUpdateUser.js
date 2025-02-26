import { useNavigate } from "react-router-dom";
import {useMutation, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {apiUpdateUser} from '../../services/apiAuthentication'


export default function useLogin() {


  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Loging in
  const {mutate:updateUser,isPending} = useMutation({
    mutationFn: apiUpdateUser,
    onSuccess : (data) => {
      toast.success('User profile updated successfully!');
      queryClient.setQueryData(['user'],data.user)
    },
    onError : (e) => {toast.error(e.message);console.log(e);}
  })

  return {updateUser,isPending}
}
