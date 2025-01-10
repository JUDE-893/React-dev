import {memo,useState,useContext,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../../Providers/AuthProvider';


export default memo( function Login(props){

  const navigate = useNavigate();

  const {userData,setUserData} = useAuth();

  const [data,setData] = useState({email :'',password : ''});

  //redirect the user if authentificated
  useEffect( () => {
    var n = userData.api_token === null ? true : navigate('/app/cities');
  },[userData])

  // function that handle validating & submitting the user credits. info.
  const handleSubmit = () => {
    // props.setLogged(true);
    const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{12,20}$/;

    console.log(emailRe.test(data.email));
    console.log(passwordRe.test(data.password));
    console.log((data.password));

    if (emailRe.test(data.email)){
      if (passwordRe.test(data.password)){
        axios.post("http://127.0.0.1:8000/api/login",data)
        .then( (response) => {
          setUserData({api_token : response.data.api_token, data : response.data.user });
          console.log(response);})
        .catch( (e) => console.log(e))
      }
    }
  }

  //function that handles the updating the state variables from the entry value
  const handleType = (e) => {
    setData({...data, [e.target.name] : e.target.value});
  }

  return (
    <>
      <form className="Login" action="" method="post">
        <label for="email">Email address</label>
        <input type="email" name="email" value={data.email} onChange={handleType} />
        <label for="Password">Password</label>
        <input type="password" name="password" value={data.password} onChange={handleType} />
        <button className="btn" type="button" name="button" onClick={handleSubmit}>LOGIN</button>
      </form>
      <p className='login-Or-signup'>You don't have an account yet? <span onClick={ () => navigate('/signup')}>Sign Up.</span></p>
      <p className="copyright">&copy; Copyright 2024 by <a href="https://github.com/JUDE-893" target='_blanc'>@JUDE-893</a> Inc.</p>
    </>
  )
})
