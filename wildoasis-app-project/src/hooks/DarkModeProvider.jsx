import {createContext,useContext} from 'react';
import {useLocalStorageState} from './useLocalStorageState';

const DarkModeContext = createContext();

export default function DarkModeProvider({children}) {
  const [isDarkMode,setIsDarkMode] = useLocalStorageState(false,'isDarkMode')

  const htmlElement = document.getElementsByTagName('html')[0];
  htmlElement.className = isDarkMode ? 'dark-mode' : 'light-mode';

  return (
    <DarkModeContext.Provider value={{isDarkMode,setIsDarkMode}}>
      {children}
    </DarkModeContext.Provider>
  )

}

export function useDarkMode() {
  const {isDarkMode,setIsDarkMode} = useContext(DarkModeContext);
  return {isDark:isDarkMode,setIsDark:setIsDarkMode};
}
