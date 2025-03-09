import styled from "styled-components";
import { HiOutlineArrowRight } from "react-icons/hi2";

import LoginForm from './../features/authentication/LoginForm';
import BottomFormLink from './../ui/BottomFormLink';
import Heading from './../ui/Heading';
import Logo from './../ui/Logo';

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
      <Heading as="h2" style={{textAlign: "center"}}>Login in to your account</Heading>
      <LoginForm />
      <BottomFormLink>
        Forgot password? <BottomFormLink.Link to='/forgot-password' > Reset Password <HiOutlineArrowRight /></BottomFormLink.Link>
      </BottomFormLink>
      <BottomFormLink>
        You don't have an account yet? <BottomFormLink.Link to='/signup' > Sign up <HiOutlineArrowRight /></BottomFormLink.Link>
      </BottomFormLink>
    </LoginLayout>
  )
}

export default Login;
