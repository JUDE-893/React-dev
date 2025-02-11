import {HiArrowRightOnRectangle} from 'react-icons/hi2';
import useLogout from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';
import ButtonIcon from '../../ui/ButtonIcon';

export default function Logout() {

  const {logout,loggingOut} = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={loggingOut}>{!loggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}</ButtonIcon>
  )
}
