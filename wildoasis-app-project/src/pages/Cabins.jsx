import CreateEditCabin from './../features/cabins/CreateEditCabin';
import CabinsTable from './../features/cabins/CabinTable';
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <CabinsTable/>
      <CreateEditCabin />
    </>
  );
}

export default Cabins;
