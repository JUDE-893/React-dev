import {useState, useEffect} from 'react';
import {HiXMark} from 'react-icons/hi2'
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import Button from "../../ui/Button";

export default function CreateEditCabin({withButton=true,cabinToEdit={},initialState=null}){

  const [clicked,setClicked] = useState(initialState ?? false);

  //update the state
  useEffect( () => {
    setClicked(initialState)
  },[initialState])

  return (
    <>
      {clicked ? <Modal.Overlay>
        <Modal>
          <Modal.Button onClick={() => setClicked(false)}><HiXMark /></Modal.Button>
          <CreateCabinForm cancel={() => setClicked(false)} cabinToEdit={cabinToEdit} />
        </Modal>
      </Modal.Overlay>
      :<>{withButton && <Button variation='primary' size='medium' onClick={() => setClicked((clk) => !clk)}>Create Cabin</Button>}</>}
    </>
  )
}
