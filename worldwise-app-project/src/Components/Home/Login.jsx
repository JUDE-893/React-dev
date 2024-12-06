import {memo} from 'react';
import {useNavigate} from 'react-router-dom';

export default memo( function Login(props){

  const navigate = useNavigate();

  const handleSubmit = () => {
    props.setLogged(true);
    navigate('/app/cities');
  }

  return (
      <form className="Login" action="" method="post">
        <label for="email">Email address</label>
        <input type="email" name="" value="jack@example.com"/>
        <label for="Password">Email address</label>
        <input type="password" name="" value="MyP@ssword"/>
        <button className="btn" type="button" name="button" onClick={handleSubmit}>LOGIN</button>
      </form>
  )
})
