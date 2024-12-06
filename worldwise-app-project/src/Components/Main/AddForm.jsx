import {useState,memo} from 'react'
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
export default memo( function AddForm() {

  return (
    <div className="add-form">
      <form className="Login" action="" method="post">
        <label for="cityname">City name</label>
        <div className="cityInput">
          <input type="text" name="" value=""/>
          <span>🇵🇹</span>
        </div>
        <label for="tripdate">When did you go to «City»?</label>
        <input type='date' name="" value=""/>
        <label for="description">Notes about your trip to «City»</label>
        <textarea name="name" rows="0" cols="0"></textarea>
        <div className='dual-btn'>
          <button className="btn" type="button" name="button" >ADD</button>
          <button className=" btn btn-outline" type="button" name="button" ><FontAwesomeIcon icon={faArrowLeft} />BACK</button>
        </div>
      </form>
    </div>
  )
})
