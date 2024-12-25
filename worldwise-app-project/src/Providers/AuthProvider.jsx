import {useState, createContext, useEffect,useContext} from 'react';
import axios from 'axios';

// create the context
const AuthContext = createContext();

// create the context' provider
function AuthProvider({children}) {

const [userData, setUserData] = useState({api_token:null, data: {}});

useEffect( () => {
  axios.post("http://127.0.0.1:8000/api/check.auth",{
    headers : {
      'Authorization': `Bearer ${userData.api_token}`,
    }
  }).then( (response) => { console.log(response);})
  .catch( (e) => console.log(e))
},[])

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
)}

function useAuth() {
  var context = useContext(AuthContext);
  if (!context) {
    throw new Error(' useAuth Hook was used outside of  its respective scoop');
  }
  return context;
}


export { useAuth,AuthProvider };
