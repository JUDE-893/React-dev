import {useQuery} from '@tanstack/react-query';
import styled from "styled-components";
import {getCabins} from '../../services/apiCabins';
import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;


export default function CabinsTable({children}) {

  // fetching the cabins data periodically [60s] using the react-Query
  // the data is kept in the cach as long as it is  fresh
  const {data,error,isPending} = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins
  })

  console.log(data);

  return (
    <>
      {!isPending ?<Table role='table'>
        <TableHeader>
          <div></div>
          <div>Name</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </TableHeader>
        {data.map( (cabin) =>{ return <CabinRow cabin={cabin} /> })}
      </Table>
      :<Spinner/>}
    </>
  )
}
