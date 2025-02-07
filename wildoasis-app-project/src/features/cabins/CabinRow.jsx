import {useContext} from 'react';
import styled from "styled-components";
import {HiPencil, HiTrash, HiSquare2Stack, HiEllipsisVertical} from 'react-icons/hi2';
import {useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {useDeleteCabin} from './useDeleteCabin';
import {useCreateEditCabin} from './useCreateEditCabin';
import{MenuContext} from "../../ui/Menus"
import CreateEditCabin from './CreateEditCabin';
import CreateCabinForm from './CreateCabinForm';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menu from '../../ui/Menus';


// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;
//   background-color: ${props => props.active && 'var(--color-grey-50)'};
//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  max-width: 70%;
  min-width: 4.4rem;
  max-height: 90%;
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
  margin-left : 2.5rem ;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
  margin-left : 5rem ;
`;

export default function CabinRow({cabin}) {

  const {menuId,handleToggle} = useContext(MenuContext);
  const queryClient = useQueryClient();
  const {mutate,isPending} = useDeleteCabin();
  const {error,mutate:duplicate,isPending:duplicating} = useCreateEditCabin();



  // function that handles duplicating a cabin
  const handleDuplicate = () => {
    let suffix = (/^\w+\s*\(copy\)$/).test(cabin.name) ? '' : '(copy)' ;
    let {id, ...data} = {...cabin, name: `${cabin.name} ${suffix}`};
    duplicate({data:data,hasImage: true},{
      onSuccess: () => {
        toast.success(`Cabin has been duplicated Successfully`);
        queryClient.invalidateQueries();
      },
      onError: (errs) => {toast.error(errs.message);console.log("erre",errs);},
    });
  }

  return (
    <>
      <Table.Row id={cabin.id} key={cabin.id} >
        <Img src={cabin.image}/>
        <Cabin>{cabin.name}</Cabin>
        <Price>{cabin.max_capacity}</Price>
        <Price>{cabin.regular_price}</Price>
        <Discount>{cabin.discount}</Discount>
        <Menu.Toggle mid={cabin.id}><HiEllipsisVertical/></Menu.Toggle>
        <Menu.List position={{x:200,y:200}} idn={cabin.id} >

          <Menu.Button render={handleDuplicate} disabled={duplicating} icon={<HiSquare2Stack />}><HiSquare2Stack /> Duplicate cabin</Menu.Button>
          <CreateEditCabin>
            <CreateEditCabin.OpenModal windowName="cabin/edit">
              <Menu.Button icon={<HiPencil />}><HiPencil />Edit cabin</Menu.Button>
            </CreateEditCabin.OpenModal>
            <CreateEditCabin.Window closeParentMenu={() => handleToggle(menuId)} name='cabin/edit'>
              <CreateCabinForm  cabinToEdit={cabin}/>
            </CreateEditCabin.Window>
          </CreateEditCabin>
          <CreateEditCabin>
            <CreateEditCabin.OpenModal windowName='cabin/delete'>
              <Menu.Button disabled={isPending} icon={<HiTrash />}><HiTrash />Delete cabin</Menu.Button>
            </CreateEditCabin.OpenModal>
            <CreateEditCabin.Window name='cabin/delete'>
              <ConfirmDelete disabled={isPending} onConfirm={() => mutate({id:cabin.id,imageName: cabin.image,cabinName:cabin.name})}/>
            </CreateEditCabin.Window>
          </CreateEditCabin>

        </Menu.List>
      </Table.Row>
    </>
  );
}
