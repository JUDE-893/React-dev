import useBookings from './useBookings';
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menu from "../../ui/Menus";
import Spinner from "../../ui/Spinner";

function BookingTable() {

  const {bookings,isPending,error} = useBookings();

  // no data yet ?
  if (isPending) return <Spinner/>;

  // // filtering & sort bookings data
  // const filterVal = searchParams.get('status') ?? "all";
  // const sortKeys = searchParams.get('sortBy')?.split('-') ?? ['num_nights','asc'];
  //
  // let bookings;
  // if (filterVal === "all") {
  //   bookings = data;
  // }else {
  //   bookings = data.filter( (booking) => booking.status === filterVal )
  // }
  //
  // //client-side cabin data sorting
  // let mod = sortKeys[1] === "asc" ? 1 : -1 ;
  // const sortNum = (boo,kin) => (boo[sortKeys[0]]-kin[sortKeys[0]])*mod;
  // const sortStr = (boo,kin) => (boo[sortKeys[0]].localeCompare(kin[sortKeys[0]]))*mod;
  // const sortObj = (boo,kin) => (boo[sortKeys[0][0]][sortKeys[0][1]].localeCompare(kin[sortKeys[0][0]][sortKeys[0][1]]))*mod;
  // const sortFunc = sortKeys[0] === 'name' ? sortStr : sortNum;
  //
  // console.log('data',data,bookings);
  // bookings.sort(sortFunc)


  return (
    <Menu>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menu>
  );
}

export default BookingTable;
