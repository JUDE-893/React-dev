import { useNavigate } from "react-router-dom";
import {useMutation, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {apiLogout} from '../../services/apiAuthentication'


export default function useLogout() {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Logoutg in
  const {mutate:logout,isPending: loggingOut} = useMutation({
    mutationFn: apiLogout,
    onSuccess : (data) => {
      navigate('/login');
      queryClient.removeQueries()
    },
    onError : (e) => toast.error(e.message)
  })

  return {logout,loggingOut}
}
