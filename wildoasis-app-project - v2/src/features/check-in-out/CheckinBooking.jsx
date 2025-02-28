import {useState, useEffect} from 'react';
import styled from "styled-components";
import useBooking from "../../features/bookings/useBooking";
import useSettings from "../../features/settings/useSettings";
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
  const [wantBreakfast, setWantBreakfast] = useState(false)

  const moveBack = useMoveBack();
  const {data,isPending,error} = useBooking()
  const {checkin,isPending:isCheckingIn,error: checkInError} = useCheckIn();
  const {isPending: gettingSetting,data:settings,error:seetingError} = useSettings();

  // update the confirmed state with remote booting paid state
  useEffect( () => {
    setPaidConfirmed(data?.is_paid ?? false)
    setWantBreakfast(data?.has_breakfast ?? false)
  },[data])


  // data did not arrived yet ?
  if (isPending || gettingSetting) return <Spinner />

  const {
    id: bookingId,
    guest,
    total_price: totalPrice,
    num_guests: numGuests,
    has_breakfast: hasBreakfast,
    num_nights: numNights,
  } = data;

  const extraPrice = settings.breakfast_price * numNights * numGuests;

  function handleCheckin() {
    let payload = {is_paid: true, status: 'checked-in'}
    if (wantBreakfast) {
      payload = {...payload, extra_price: extraPrice, total_price: extraPrice+totalPrice, has_breakfast: true}
    }
    checkin({id:bookingId, obj:payload})
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={data} />

      <Box>
        <Checkbox id={bookingId} checked={wantBreakfast} onChange={() => {setWantBreakfast((prev) => !prev); setPaidConfirmed((prev) => prev ? false : data.is_paid) }} disabled={data.has_breakfast} >
          Want to add breakfast for {formatCurrency(extraPrice)}
        </Checkbox>
      </Box>

      <Box>
        <Checkbox id={bookingId} checked={paidConfirmed} onChange={() => setPaidConfirmed((prev) => !prev)} disabled={data.is_paid && paidConfirmed} >
          I Confirme that the guest {guest.full_name} has paid the full amount of {!wantBreakfast ? formatCurrency(totalPrice): `${formatCurrency(totalPrice+extraPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(extraPrice)})`}
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
