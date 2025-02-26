import styled from "styled-components";
import Row from "./Row";

const StyledFormRow = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: 1fr;
  gap: 0.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-grey-600);
  letter-spacing: 0.4px;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  background-color: var(--color-red-100);
  padding: 8px;
  border-radius: var(--border-radius-sm)

`;

export default function FormRow({label,message,children}) {

  return (
    <StyledFormRow>
      <Label htmlFor="name">{label}</Label>
      <Row style={{gap:10}}>
        {children}
        {message && <Error>{message}</Error>}
      </Row>
    </StyledFormRow>
  )
}
