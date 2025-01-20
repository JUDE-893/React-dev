import {useState} from 'react';
import styled from "styled-components";
import toast from 'react-hot-toast';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteCabin} from '../../services/apiCabins';
import CreateCabinForm from './CreateCabinForm';


const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({cabin}) {

  const queryClient = useQueryClient();

  const {isPending, error,mutate} = useMutation({
    mutationFn: (toDelete) => deleteCabin(toDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cabins']});
      toast.success('Deleted Successfully!');
    },
    onError: (e) => {
      toast.error(e.message);
    }
  })

  const [editting, setEditting] = useState(false)

  return (
    <>
      <TableRow id={cabin.id} key={cabin.id} >
        <Img src={cabin.image}/>
        <Cabin>{cabin.name}</Cabin>
        <Cabin>{cabin.max_capacity}</Cabin>
        <Price>{cabin.regular_price}</Price>
        <Discount>{cabin.discount}</Discount>
        <div style={{display:'flex',flexWrap: "nowrap"}}>
          <button onClick={() => setEditting((v) => !v)} disabled={isPending}>{editting ? 'cancel' : 'Edit'}</button>
          <button onClick={() => mutate({id:cabin.id,imageName: cabin.image})} disabled={isPending}>Delete</button>
        </div>
      </TableRow>
      {editting && <CreateCabinForm cabinToEdit={cabin}/>}
    </>
  )
}
