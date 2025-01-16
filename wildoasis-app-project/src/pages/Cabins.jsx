import {useState} from 'react';
import CabinsTable from './../features/cabins/CabinTable';
import CreateCabinForm from './../features/cabins/CreateCabinForm';
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";

function Cabins() {

  const [clicked,setClicked] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <CabinsTable/>
      <Button variation='primary' size='medium' onClick={() => setClicked((clk) => !clk)}>Create Cabin</Button>
      {clicked && <CreateCabinForm/>}
    </>
  );
}

export default Cabins;
