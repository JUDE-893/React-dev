import styled from 'styled-components';
import {Outlet} from 'react-router-dom';
import SideBarre from "./SideBarre";
import Header from "./Header";

const StyledLayout = styled.div`
  display:grid;
  grid-template-columns: 26rem 1fr;
`;

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  height :91vh;
  padding : 4rem;
  overflow:scroll
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display:flex;
  flex-direction:column;
  gap: 4rem
`

function AppLayout() {
  return (
    <StyledLayout>
      <SideBarre/>
      <div>
        <Header/>
        <StyledMain>
          <Container>
            <Outlet / >
          </Container>
        </StyledMain>
      </div>
    </StyledLayout>
  );
}

export default AppLayout;
