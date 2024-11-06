import {memo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretUp,faCaretDown} from "@fortawesome/free-solid-svg-icons";


export default memo( function ReadMore(props) {
  return (
    <>
      <br/>
      <p className='read-more' onClick={() => props.setOverExpanded(props.overExpanded ? false : true)}>
        READ {props.overExpanded ? 'LESS' : 'MORE'}
        <FontAwesomeIcon icon={props.overExpanded ? faCaretUp : faCaretDown} />
      </p>
    </> )
})
