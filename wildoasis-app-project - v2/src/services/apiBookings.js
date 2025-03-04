import { getToday } from "../utils/helpers";
import {supabase} from "./supabase";
import axiosClient from "./axiosClient";

// returns all bookings records
export async function getBookings({filters,sortBy,page}) {

  let payload = {};
  // filter
  if (filters) {
    payload = {filterColumn: filters[0].field, filterValue: filters[0].value };
  }

  //sortBy
  console.log(process.env.REACT_APP_PAGE_LENGTH);
  payload = {...payload, page:page,
            pageLength:process.env.REACT_APP_PAGE_LENGTH,
            sortByColumn:sortBy.field,
            order:sortBy.order
          };

  const { data } = await axiosClient.post('/Bookings/get',JSON.stringify(payload));
  // error handling
  if (!data?.success) {
    console.error(data?.error);
    throw new Error("Can't retrieve bookings data");
  }
  console.log(data.totalBookings);
  const bookingsData = {data:data.bookings, count:data?.totalBookings};

  return bookingsData;
}

// returns a single booking record by id
export async function getBooking(id) {
  const { data } = await axiosClient.get('/Bookings/'+id);

  if (!data?.success) {
    console.error(data?.error);
    throw new Error("Booking not found");
  }

  return data?.booking;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {

    let payload = JSON.stringify({
      column: 'created_at',
      startDate: date,
      endDate:  getToday({ end: true })
    });

    const { data } = await axiosClient.post('/Bookings/get-stats-after-date',payload);


  if (!data?.success) {
    console.error(data?.error);
    throw new Error("Bookings could not get loaded");
  };

  return data?.bookings;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
    let payload = JSON.stringify({
      column: 'start_date',
      startDate: date,
      endDate:  getToday()
    });

    const { data } = await axiosClient.post('/Bookings/get-stats-after-date',payload);


  if (!data?.success) {
    console.error(data?.error);
    throw new Error("Bookings could not get loaded");
  };

  return data?.bookings;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {

  const payload = JSON.stringify({
    filterColumn: "status",
    values : [
      {timeColumn: 'start_date',
      filterValue: 'unconfirmed'},
      {timeColumn: 'end_date',
      filterValue: 'checked-in'}
    ]});

  const { data } = await axiosClient.post('/Bookings/get-today-activities',payload);

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.start_date))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.end_date)))

  if (!data?.success) {
    console.error(data?.error);
    throw new Error("Bookings could not get loaded");
  }
  return data?.bookings;
}

export async function updateBooking({id, obj}) {
  const { data } = await axiosClient.put('Bookings/'+id, obj);

  if (!data?.success) {
    console.error(!data?.error);
    throw new Error("Booking could not be updated");
  }
  return data?.booking;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data } = await axiosClient.delete('Bookings/'+id);

  if (!data?.success) {
    console.error(!data?.error);
    throw new Error("Booking could not be updated");
  }
  return data?.booking;
}
