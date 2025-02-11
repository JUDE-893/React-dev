import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import useUser from './../features/authentication/useUser';
import Spinner from './Spinner';

const StyledContainer = styled.div`
  display:flex;
  flex-direction:column;
  aleign-items:center;
  justify-content:center;
  background-color: var(--color-grey-50);
  height:100vh;
  width:100vw
`;

export default function ProtectedRoutes({children}) {

  const navigate = useNavigate();
  const {user,isPending} = useUser();

  // if not logged
  useEffect( () => {
    if (user?.role !== "authenticated" && !isPending) navigate('/login')
  },[user]);

  // don't have the data yet ?
  if (isPending) return <StyledContainer><Spinner /></StyledContainer>

  // if logged
  return children;
}
