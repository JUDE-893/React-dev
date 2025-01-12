import styled from 'styled-components';
import { HiOutlineHome,HiOutlineCog6Tooth,HiOutlineHomeModern,HiOutlineUsers,HiOutlineCalendarDateRange   } from "react-icons/hi2";
import Logo from "./Logo";
import {NavList,StyledNavLink} from "./MainNav";
import Heading from "./Heading";
import Row from "./Row";

const StyledsideBarre = styled.div`
  color:red;
  font-size: 2rem;
  background-color:  var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  padding : 3rem

`;

function SideBarre() {
  return (
    <>
    <StyledsideBarre>
      <Row>
        <Logo/>
        <NavList>
            <StyledNavLink to='/' exact>
              <HiOutlineHome />
              <span>DashBoard</span>
            </StyledNavLink>

            <StyledNavLink to='/bookings' >
              <HiOutlineCalendarDateRange   />
              <span>Booking</span>
            </StyledNavLink>

            <StyledNavLink to='/cabins' exact>
              <HiOutlineHomeModern  />
              <span>Cabins</span>
            </StyledNavLink>

            <StyledNavLink to='/users' exact>
              <HiOutlineUsers  />
              <span>Users</span>
            </StyledNavLink>

            <StyledNavLink to='/settings' >
              <HiOutlineCog6Tooth  />
              <span>Settings</span>
            </StyledNavLink>


        </NavList>
      </Row>
    </StyledsideBarre>
    </>
  );
}

export default SideBarre;
