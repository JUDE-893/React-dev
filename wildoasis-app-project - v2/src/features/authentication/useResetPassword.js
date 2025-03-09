import {useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {apiTriggerPasswordReset,apiPasswordReset} from '../../services/apiAuthentication';


export function useTriggerResetPassword(){

  const {mutate,isPending,error} = useMutation({
    mutationFn: apiTriggerPasswordReset,
    onError : (e) => toast.error(e.message)
  })

  return {isPending, triggerSend: mutate}
}

export function useReset(){

  const {mutate,isPending,error} = useMutation({
    mutationFn: apiPasswordReset,
    onError : (e) => toast.error(e.message)
  });

  return {isResetting: isPending, resetPassword: mutate};
}
