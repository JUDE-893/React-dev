import styled from "styled-components";
import Logo from './../ui/Logo';
import Heading from './../ui/Heading';
import SignupForm from './../features/authentication/SignupForm';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h2" style={{textAlign: "center"}}>Create new account</Heading>
      <SignupForm />
    </LoginLayout>
  )
}

export default Login;
