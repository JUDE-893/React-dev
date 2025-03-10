import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../Providers/AuthProvider';

export default function Profile(props){

  const {userData,setUserData} = useAuth();


  const navigate = useNavigate();

  // function that reset the user's data state
  const logout = () => {
    setUserData({api_token:null, data: {}});
    navigate('/');
  }

  return(
    <div className="Profile">
      <div className="profile-head">
        <img src={userData.data.profile_img !== null ? `http://127.0.0.1:8000/storage/profile_imgs/${userData.data.profile_img}` : "/imgs/user-thumb1.png"} alt=""/>
        <p>{userData.data.user_name}</p>
        <button className="btn btn-sml" name="button" onClick={logout}>LOGOUT</button>
      </div>
    </div>
  )
}
