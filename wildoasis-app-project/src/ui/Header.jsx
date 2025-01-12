import styled from 'styled-components';
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
function Header() {
  return (
    <div>
      <StyledHeader>Header</StyledHeader>
    </div>
  );
}

export default Header;
