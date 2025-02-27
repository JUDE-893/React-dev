import CreateEditCabin from './../features/cabins/CreateEditCabin';
import CabinsTable from './../features/cabins/CabinTable';
import CreateCabinForm from './../features/cabins/CreateCabinForm';
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import HeadingMenu from "../ui/HeadingMenu";



function Cabins() {


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <HeadingMenu>
        <Filter name='discount'
          options={[
            {label:'All',value:'all'},
            {label:'With discount',value:'with-discount'},
            {label:'No discount',value:'no-discount'}
          ]}
        />
        <SortBy
          options={[
            {label:'Name (A-z)',value:'name-asc'},
            {label:'Name (Z-a)',value:'name-desc'},
            {label:'Price asc',value:'price-asc'},
            {label:'Price desc',value:'price-desc'},
            {label:'Capacity asc',value:'max_capacity-asc'},
            {label:'Capacity desc',value:'max_capacity-desc'},
            {label:'Discount asc',value:'discount-asc'},
            {label:'Discount desc',value:'discount-desc'},
          ]}
          type='white'
        />
        </HeadingMenu>
      </Row>
      <CabinsTable/>
      <CreateEditCabin>
        <CreateEditCabin.OpenModal windowName='cabin/create'>
          <Button size="medium" variation="primary">Create New Cabin</Button>
        </CreateEditCabin.OpenModal>
        <CreateEditCabin.Window name='cabin/create'>
          <CreateCabinForm/>
        </CreateEditCabin.Window>
      </CreateEditCabin>
    </>
  );
}

export default Cabins;
