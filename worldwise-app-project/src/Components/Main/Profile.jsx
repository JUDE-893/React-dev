import {memo} from 'react';

export default memo(function Profile(props){

  return(
    <div className="Profile">
      <div className="profile-head">
        <img src="/imgs/user-thumb1.png" alt=""/>
        <p>Jack Sparrow</p>
        <button className="btn btn-sml" name="button">LOGOUT</button>
      </div>
    </div>
  )
})
