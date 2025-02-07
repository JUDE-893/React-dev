import {useState,useRef,useEffect,useContext,createContext,cloneElement} from 'react';
import {createPortal} from 'react-dom';
import styled from "styled-components";
import ButtonIcon from './ButtonIcon';


const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;



// create a menu context api
const MenuContext = createContext();

// setting the menu context provider
function Menu({children}) {

  // row id
  const [menuId, setMenuId] = useState(null);
  const [position, setPosition] = useState({y:0,x:0});

  // function that toggles the menuId eather to: new menu id || Null
  const handleToggle = (mid=null) => {
    if (!menuId || menuId !== mid) {
      setMenuId(mid);
    }else {
      setMenuId(null)
    }
  }

  return (
    <MenuContext.Provider value={{handleToggle,menuId,position,setPosition}}>
      {children}
    </MenuContext.Provider>
  )
};

// toggle trigger component
const Toggle = function({children,mid}) {

  const {handleToggle,setPosition} = useContext(MenuContext);

  return (
    <StyledToggle>
      {cloneElement(children, {onClick: (e) =>{ setPosition({x:e.pageX-200,y:e.pageY-30}); handleToggle(mid)}})}
    </StyledToggle>
  )
}

// menu list
const List = function ({children,idn}) {

  const {menuId,handleToggle,position} = useContext(MenuContext);
  const menuRef = useRef();

  // setting the onclick outside event handler
  useEffect( () => {

    //event handler
    function handleClickOutside (e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleToggle(null);
    }

  }

    //setting an Event listener
    idn === menuId && document.addEventListener('click', handleClickOutside, true);

    return () => document.removeEventListener('click', handleClickOutside, true);
  },[handleToggle]);

  if (idn !== menuId) return  null;
  return createPortal(
    <StyledList position={position} ref={menuRef} >
      {children}
    </StyledList>
    ,document.body)
};;

//menu list button
const Button = function ({children,icon,onClick,render}) {

  // DOes a onClick props apply on custom components?? ofcaurse not!!
  return (
    <StyledButton onClick={onClick ?? render}>
      <ButtonIcon>{children}</ButtonIcon>
    </StyledButton>
  )
};

// attach the menu layouts to the menu provider-component
Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export {MenuContext};
export default Menu;
