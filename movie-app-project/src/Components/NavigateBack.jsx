import {memo} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";


export default memo( function NavigateBack(props) {

  const navigate = useNavigate(),

  handleGoBack = () => {
        navigate(-1);
    };

  return (
    <div className="detail-title mt-3 mb-3">
      <p className='page-title'>{props.pageName}</p>
      <Link  className='mt-2' onClick={handleGoBack} ><FontAwesomeIcon icon={faArrowLeft} /><span className='invisible cursor-pointer'>Back</span></Link>
    </div>
  )
})
