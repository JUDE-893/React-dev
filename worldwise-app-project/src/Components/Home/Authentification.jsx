import {memo,useState} from 'react';
import Login from './Login';

export default memo( function Authentification(props){

  const [registered, setRegistered] = useState(true);

  return (
    <div>
      {registered ? <>
        <Login/>
          <p>Don't You have an Account Yet ? <span onClick={setRegistered(false)}>Sign Up!</span></p>
        </>
      :<>
        <p>Already Have an Account ? <span onClick={setRegistered(true)}>Log In!</span></p>
      </>}
    </div>
  )
})
