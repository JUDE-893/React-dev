import BookingTable from './../features/bookings/BookingTable';
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";
import HeadingMenu from "../ui/HeadingMenu";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <HeadingMenu>
        <Filter name='status'
          options={[
            {label:'All',value:'all'},
            {label:'unconfirmed',value:'unconfirmed'},
            {label:'checked in',value:'checked-in'},
            {label:'checked out',value:'checked-out'}
          ]}
        />
        <SortBy
          options={[
            {label:'Booking date (recent)',value:'created_at-desc'},
            {label:'Booking date (older)',value:'created_at-asc'},
            {label:'Stay nights asc',value:'num_nights-asc'},
            {label:'Stay nights desc',value:'num_nights-desc'},
            {label:'Start date (recent)',value:'start_date-desc'},
            {label:'Start date (older)',value:'start_date-asc'},
            {label:'End date (recent)',value:'end_date-desc'},
            {label:'End date (older)',value:'end_date-asc'},
            {label:'Total price asc',value:'total_price-asc'},
            {label:'Total price desc',value:'total_price-desc'},
            {label:'Cabin name (A-z)',value:'cabins.name-asc'},
            {label:'Cabin name (Z-a)',value:'cabins.name-desc'},
            {label:'Guest name (A-z)',value:'guests.full_name-asc'},
            {label:'Guest name (Z-a)',value:'guests.full_name-desc'},
          ]}
          type='white'
        />
        </HeadingMenu>
      </Row>
      <BookingTable/>
    </>
  );
}

export default Bookings;
