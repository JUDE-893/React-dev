import { useNavigate } from "react-router-dom";
import {useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {apiSignUp} from '../../services/apiAuthentication'


export default function useSignup() {

  const navigate = useNavigate();

  // Loging in
  const {mutate:signup,isPending} = useMutation({
    mutationFn: apiSignUp,
    onError : (e) => toast.error(e.message)
  })

  return {signup,isPending}
}
