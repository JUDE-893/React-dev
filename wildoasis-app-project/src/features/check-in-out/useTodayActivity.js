import {useQuery} from '@tanstack/react-query';
import {getStaysTodayActivity} from '../../services/apiBookings';

export default function useTodayActivities() {

  const {data,isPending} = useQuery({
    queryKey: ['todayActivities'],
    queryFn: () => getStaysTodayActivity()
  });

  console.log(data);
  return {activities:data,gettingActivities :isPending};
}
