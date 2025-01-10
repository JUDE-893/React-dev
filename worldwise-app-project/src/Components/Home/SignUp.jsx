import {memo,useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../../Providers/AuthProvider';


export default function Login(){

  // const {userData, setUserData} = useContext(AuthContext);
  // console.log(userData, setUserData );

  const navigate = useNavigate();
  const [data,setData] = useState({email :'',password : ''});
  const [next,setNext] = useState(true);


  // function that handle validating authentification data and submitting it
  const handleSubmit = () => {
    // navigate('/app/cities');
    const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{12,20}$/;

    if (emailRe.test(data.email)){
      if (passwordRe.test(data.password)){
        var formData = new FormData();

        Object.keys(data).forEach((item, i) => {
          formData.append(item, data[item]);
        });

        axios.post("http://127.0.0.1:8000/api/signup",formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Necessary for file uploads
        },})
        .then( (response) => { console.log(response);})
        .catch( (e) => console.log('eer',e))
    }
  }}

  // function that handles updating the state with the current entry value
  const handleType = (e) => {

    if (e.target.name === 'profile_img') {
      setData({...data, ['profile_img'] : e.target.files[0]});
    }else {
      setData({...data, [e.target.name] : e.target.value});
    }
  };



  return (
    <>
      <form className="Login Signup" method="post" enctype="multipart/form-data">
      { next ?  <><label for="text">Full name</label>
        <input type="text" name="name" value={data.name} onChange={handleType} required />

        <label for="text">User name</label>
        <input type="text" name="user_name" value={data.user_name} onChange={handleType} required />

        <label for="text">City</label>
        <input type="text" name="city" value={data.city} onChange={handleType} required />

        <label for="text">Country</label>
        <input type="text" name="country" value={data.country} onChange={handleType} required />
        <button className="btn" type="button" name="button" onClick={()=> setNext(false)}>Next</button>
        </>
        :<><label for="email">Email address</label>
        <input type="email" name="email" value={data.email} onChange={handleType} required />

        <label for="Password">Password</label>
        <input type="password" name="password" value={data.password} onChange={handleType} required />

        <label for="text">Profile image</label>
         {false && <input type='file' name="profile_img" value={data.profile_img} onChange={handleType} />}
        <input type='file' name="profile_img" onChange={handleType} />

        <div className='dual-btn'><button className="btn btn-outline" type="button" name="button" onClick={()=> setNext(true)}>Previous</button>
        <button className="btn" type="button" name="button" onClick={handleSubmit}>SIGN UP</button></div></>}
      </form>
      <p className='login-Or-signup'>Already have an account? <span onClick={ () => navigate('/login')}>Log In.</span></p>
      <p className="copyright">&copy; Copyright 2024 by <a href="https://github.com/JUDE-893" target='_blanc'>@JUDE-893</a> Inc.</p>
    </>
  )
}
