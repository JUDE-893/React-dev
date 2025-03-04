import {useNavigate} from "react-router-dom";
import {useQueryClient} from '@tanstack/react-query';
import styled from "styled-components";
import useCheckout from "./useCheckIn";

import Button from '../../ui/Button';
import {Flag} from '../../ui/Flag';
import Tag from '../../ui/Tag';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({booking={}}) {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {checkin:checkout,isPending: checkingOut,error:checkoutError} = useCheckout('out');


  const {id, status,num_nights, guest:guests} = booking;

  const callBack = status === 'checked-in' ? () => checkout({id:id, obj:{status:'checked-out'}}, {
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['todayActivities']})
    }})
  : () => navigate('/check-in/'+id);

  return (
    <StyledTodayItem key={id}>
      <Tag type={status==='unconfirmed' ? "green" : 'blue'}>{status?.replace('-'," ")}</Tag>
      {<Flag src={guests?.country_flag} alt={guests?.nationality}/>}
      <Guest>{guests?.full_name}</Guest>
      <div>{num_nights}</div>
      <Button variation={status==="checked-in" ? "secondary" : 'primary'} size="small" onClick={callBack} disabled={checkingOut} >{status==="checked-in" ? "Check out" : "Check in"}</Button>
    </StyledTodayItem>
  )
}
