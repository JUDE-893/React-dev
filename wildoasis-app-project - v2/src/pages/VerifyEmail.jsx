import styled from 'styled-components';

const StyledBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 4rem;
  width: 100%;
  margin-left:-100px;
  text-align:center;
  overflow: hidden;
`;

export default function VerifyEmail() {

  return (
    <StyledBox>
      <h4>A verification email has been sent to your inbox. Please follow the instructions to activate your account.</h4>
    </StyledBox>
  )
}
