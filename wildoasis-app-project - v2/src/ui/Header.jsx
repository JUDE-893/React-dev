import styled from 'styled-components';
import UserAvatar from '../features/authentication/UserAvatar';
import HeaderMenu from './HeaderMenu';
import Heading from "./Heading";
import Row from "./Row";

const StyledHeader = styled.div`
  color:red;
  font-size: 2rem;
  background-color:  var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 2.5rem
`;

const StyledFeats = styled.div`
  display: flex;
  justify-content:end;
  gap:2rem;
`;

function Header() {
  return (
    <div>
      <StyledHeader>
        <StyledFeats>
          <UserAvatar />
          <HeaderMenu />
        </StyledFeats>
      </StyledHeader>
    </div>
  );
}

export default Header;
