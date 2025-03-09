import styled from "styled-components";
import Logo from './../ui/Logo';
import Heading from './../ui/Heading';
import UpdatePasswordForm from './../features/authentication/UpdatePasswordForm';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 60rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function ResetPassword() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h2" style={{textAlign: "center"}}>Create A New Password</Heading>
      <UpdatePasswordForm />
    </LoginLayout>
  )
}

export default ResetPassword;
