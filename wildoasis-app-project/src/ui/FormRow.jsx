import styled from "styled-components";
import Row from "./Row";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
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
