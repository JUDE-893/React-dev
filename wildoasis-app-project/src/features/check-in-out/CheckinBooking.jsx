import {useState, useEffect} from 'react';
import styled from "styled-components";
import useBooking from "../../features/bookings/useBooking";
import useCheckIn from "./useCheckIn";
import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency } from "../../utils/helpers";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Row from "../../ui/Row";


const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {

  const [paidConfirmed, setPaidConfirmed] = useState(false)

  const moveBack = useMoveBack();
  const {data,isPending,error} = useBooking()
  const {checkin,isPending:isCheckingIn,error: checkInError} = useCheckIn();

  // update the confirmed state with remote booting paid state
  useEffect( () => {
    setPaidConfirmed(data?.is_paid ?? false)
  },[data])


  // data did not arrived yet ?
  if (isPending) return <Spinner />

  const {
    id: bookingId,
    guests,
    total_price: totalPrice,
    num_guests: numGuests,
    has_breakfast: hasBreakfast,
    num_nights: numNights,
  } = data;

  function handleCheckin() {
    let payload = {id:bookingId, obj: {is_paid: true, status: 'checked-in'}}
    checkin(payload)
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={data} />
      <Box>
        <Checkbox id={bookingId} checked={paidConfirmed} onChange={() => setPaidConfirmed((prev) => !prev)} disabled={data.is_paid} >
          I Confirme that the guest {guests.full_name} has paid the full amount of {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button variation='primary' size="medium" onClick={handleCheckin} disabled={!paidConfirmed || isCheckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
