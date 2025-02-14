import {HiOutlineMoon,HiOutlineSun} from 'react-icons/hi2';
import {useDarkMode} from './../hooks/DarkModeProvider';
import ButtonIcon from './ButtonIcon';

export default function DarkModeToggler() {

  const {setIsDark,isDark} = useDarkMode();

  return (
    <ButtonIcon onClick={() => setIsDark((md) => !md)}>
      {!isDark ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  )
}
