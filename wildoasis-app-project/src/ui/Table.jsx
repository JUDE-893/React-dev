import {useContext,createContext} from 'react';
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
  text-align:start;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.37rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

//create table Context
const TableContext = createContext();

// create the table Provider-component
function Table({children,columns}) {
  return (
    <TableContext.Provider value={{columns}}>
      <StyledTable role='table'>
        {children}
      </StyledTable>
    </TableContext.Provider>
  )
}

// Table Header
function Header({children}) {
  const {columns} = useContext(TableContext);

  return (
    <StyledHeader  columns={columns}>
      {children}
    </StyledHeader>
  )
}

// Table Row
function Row({children}) {
  const {columns} = useContext(TableContext);

  return (
    <StyledRow columns={columns}>
      {children}
    </StyledRow>
  )
}

// table body
function Body({render,data}) {
  return (
    <StyledBody>
      {data ? data.map(render) : <Empty/>}
    </StyledBody>
  )
}

// // table footer
// function Footer({children}) {
//   return (
//     <StyledFooter>
//       {children}
//     </StyledFooter>
//   )
// }

// attaching the table layout component to the table Provider-component
Table.Row = Row;
Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;
Table.Empty = Empty;

// exporting the table Provider-component
export default Table;
