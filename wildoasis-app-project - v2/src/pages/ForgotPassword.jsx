import styled from "styled-components";
import Logo from './../ui/Logo';
import Heading from './../ui/Heading';
import ForgotPasswordForm from './../features/authentication/ForgotPasswordForm';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 60rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function ForgotPassword() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h2" style={{textAlign: "center"}}>Reset Your Password</Heading>
      <ForgotPasswordForm />
    </LoginLayout>
  )
}

export default ForgotPassword;
