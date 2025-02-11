import { useNavigate } from "react-router-dom";
import {useMutation, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {apiLogin} from '../../services/apiAuthentication'


export default function useLogin() {


  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Loging in
  const {mutate:login,isPending} = useMutation({
    mutationFn: apiLogin,
    onSuccess : (data) => {
      console.log(data);
      navigate('/');
      queryClient.setQueryData(['user'],data.user)
    },
    onError : (e) => toast.error(e.message)
  })

  return {login,isPending}
}
