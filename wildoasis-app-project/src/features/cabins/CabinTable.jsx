import {useSearchParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import styled from "styled-components";
import {getCabins} from '../../services/apiCabins';
import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Menu from '../../ui/Menus';

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;
//
// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;


export default function CabinsTable({children}) {

  // fetching the cabins data periodically [60s] using the react-Query
  // the data is kept in the cach as long as it is  fresh
  const {data,error,isPending} = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins
  })

  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner/>;

  const discountFilterVal = searchParams.get("discount");
  const sortKeys = searchParams.get("sortBy")?.split('-') ?? ['name','asc'];
  // client-side data filtering
  let filteredData;
  if (discountFilterVal === "with-discount") {
    filteredData = data.filter( (cabin) => cabin.discount > 0 )
  }else if (discountFilterVal === "no-discount") {
    filteredData = data.filter( (cabin) => cabin.discount === 0 )
  }else{
    filteredData = data;
  }

  //client-side cabin data sorting
  let mod = sortKeys[1] === "asc" ? 1 : -1 ;
  const sortNum = (ca,bin) => (ca[sortKeys[0]]-bin[sortKeys[0]])*mod;
  const sortStr = (ca,bin) => (ca[sortKeys[0]].localeCompare(bin[sortKeys[0]]))*mod;
  const sortFunc = sortKeys[0] === 'name' ? sortStr : sortNum;

  filteredData.sort(sortFunc)

  return (
      <Menu>
        <Table columns="1.1fr 1.8fr 1.5fr 1.5fr 1.5fr 0.2fr">
          <Table.Header>
            <div></div>
            <div>Name</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>
            <Table.Body data={filteredData} render={(cabin) => {
              return <CabinRow key={cabin.id} cabin={cabin} /> }} />
        </Table>
      </Menu>
  )
}
