import styled from "styled-components";
import useBookingsAfterDate from './useBookingsAfterDate';
import useCabins from '../../features/cabins/useCabins';
import useStaysAfterDate from './useStaysAfterDate';

import TodayActivity from '../../features/check-in-out/TodayActivity';
import DurationChart from './DurationChart';
import Spinner from '../../ui/Spinner';
import SalesChart from './SalesChart';
import Stats from './Stats';


const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


export default function DashboardLayout() {

  const {stays,confirmedStays,isPending:isGettingStays,days} = useStaysAfterDate();
  const {bookings,isPending:isGettingBookings} = useBookingsAfterDate();
  const {data:cabins,error,isPending} = useCabins()
  if(isGettingBookings || isGettingStays,isPending) return <Spinner />



  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} stays={stays} days={days} confirmedStays={confirmedStays} cabins={cabins} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} days={days} />
    </StyledDashboardLayout>
  )
};
