import styled from 'styled-components';
import { HiMiniLockOpen } from "react-icons/hi2";
import {useTriggerResetPassword} from './useResetPassword';
import useUser from './useUser';

import SpinnerMini from '../../ui/SpinnerMini';
import Button from '../../ui/Button';


const StyledButton = styled(Button)`

`
const StyledBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 4rem;
  width: 100%;
  text-align:center;
  overflow: hidden;
`;

export default function UpdatePassword() {

  const {user,isPending:getting} = useUser();
  const {isPending, triggerSend} = useTriggerResetPassword();

  // function that handles truggering an email password reset verfication
  const handleClick = () => {
    triggerSend(user.email);
  };

  if (getting || isPending) return <StyledBox><SpinnerMini /></StyledBox>

  return (
    <StyledBox>
      <StyledButton variation='primary' size="large" onClick={handleClick}>
          <HiMiniLockOpen /> Update Password
      </StyledButton>
    </StyledBox>
  );
}
