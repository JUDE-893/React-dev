import {useQuery} from '@tanstack/react-query';
import {getCurrentUser} from '../../services/apiAuthentication'


export default function useUser() {




  // Loging in
  const {data:user,isPending} = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  })

  return {user,isPending}
}
