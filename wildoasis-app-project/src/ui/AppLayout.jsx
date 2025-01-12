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
  height :100vh;
  padding : 4rem
`;

function AppLayout() {
  return (
    <StyledLayout>
      <SideBarre/>
      <div>
        <Header/>
        <StyledMain>
         <Outlet / >
        </StyledMain>
      </div>
    </StyledLayout>
  );
}

export default AppLayout;
