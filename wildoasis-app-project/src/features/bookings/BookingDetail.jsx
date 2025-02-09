import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import useBooking from './useBooking';
import useCheckout from "../../features/check-in-out/useCheckIn";

import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";

import { useMoveBack } from "../../hooks/useMoveBack";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;


function BookingDetail() {

  const navigate = useNavigate();
  const {data,isPending,error} = useBooking();
  const {checkin:checkout,isPending: checkingOut,error:checkoutError} = useCheckout('out');
  const moveBack = useMoveBack();

  if (isPending) return <Spinner />

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  // function that checks out a bookings
  const handleCheckout = () => {
    checkout({id:data.id,obj:{status: "checked-out"}})
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{data.id}</Heading>
          <Tag type={statusToTagName[data.status]}>{data.status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={data} />

      <ButtonGroup>
        {data.status === "unconfirmed" && <Button variation="primary" size="medium" onClick={() => navigate('/check-in/'+data.id)} >
          Check in booking #{data.id}
        </Button>}

        {data.status === "checked-in" && <Button variation="primary" size="medium" onClick={handleCheckout} disabled={checkingOut}>
          Check out booking #{data.id}
        </Button>}

        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
