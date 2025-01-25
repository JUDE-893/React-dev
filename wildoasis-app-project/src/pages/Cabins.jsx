import CreateEditCabin from './../features/cabins/CreateEditCabin';
import CabinsTable from './../features/cabins/CabinTable';
import CreateCabinForm from './../features/cabins/CreateCabinForm';
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";

function Cabins() {


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <CabinsTable/>
      <CreateEditCabin>
        <CreateEditCabin.OpenModal windowName='cabin/create'>
          <Button size="medium" variation="primary">Create NewCabin</Button>
        </CreateEditCabin.OpenModal>
        <CreateEditCabin.Window name='cabin/create'>
          <CreateCabinForm/>
        </CreateEditCabin.Window>
      </CreateEditCabin>
    </>
  );
}

export default Cabins;
