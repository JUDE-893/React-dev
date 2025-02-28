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

  const { data } = await axiosClient.post('/bookings/get',JSON.stringify(payload));
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
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extra_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, nationality, country_flag)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.start_date))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.end_date)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
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
