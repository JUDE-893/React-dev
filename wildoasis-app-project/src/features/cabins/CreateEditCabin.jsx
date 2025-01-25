import {useState, useContext, createContext,cloneElement,useEffect,useRef} from 'react';
import {createPortal} from 'react-dom';
import {HiXMark} from 'react-icons/hi2'
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import Button from "../../ui/Button";


// create context api
const CreateEditContext = createContext();

// Create/Edit Cabin modal provider
function CreateEditCabin({children}){

  const [openWindowName, setOpenWindowName] = useState('');

  //state Mutator functions
  const close = () => setOpenWindowName('');
  const open = (name) => setOpenWindowName(name);

  return (
    <CreateEditContext.Provider value={{open,close,openWindowName}} >
      {children}
    </CreateEditContext.Provider>
  )
}

// modal window
function Window({children, name}){

  const modalRef = useRef();
  const {openWindowName,close} = useContext(CreateEditContext);

  // click outside the modal event handling
  useEffect( function() {
    //function that handles the click
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        close();
      }
    }

    // setting the event listner
    if (name === openWindowName)  document.addEventListener('click',handleClick,true);

    // remove the event listener
    return () => document.removeEventListener('click',handleClick,true);

  },[close])


  if (name !== openWindowName ) return null;

  return createPortal(
      <Modal.Overlay >
        <Modal ref={modalRef}>
          <Modal.Button onClick={close}><HiXMark /></Modal.Button>
            {cloneElement(children,{cancel:close})}
        </Modal>
      </Modal.Overlay>

  ,document.body)
}
//<CreateCabinForm cancel={() => setClicked(false)} cabinToEdit={cabinToEdit} />

// modal open trigger
function OpenModal({children,windowName}) {
  const {open} = useContext(CreateEditContext);

  return (
    <>
      {cloneElement(children,{onClick: () => open(windowName)})}
    </>
  )
}

// attach the modal layouts to the provider component
CreateEditCabin.Window = Window;
CreateEditCabin.OpenModal = OpenModal;

export default CreateEditCabin;
