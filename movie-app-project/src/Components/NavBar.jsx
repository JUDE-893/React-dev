import {memo,useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass,faBars} from "@fortawesome/free-solid-svg-icons"

export default memo(function NavBar(props) {

  // const [searching,setSearching] = useState(props.searching)
  //
  // var handleSearching = () => {
  //   searching ? setSearching(false) : setSearching(true)
  // }

  return (
    <div className="Nav">
    {console.log("navBar")}

      <div className="nav-logo">
        <FontAwesomeIcon style={{marginRight:15}} onClick={()=>props.getSearchInfo('menuReduced',true)} icon={faBars} />
        Cinema Paradiso
      </div>
      {!props.searching ? <button type="button" className='searchBar-btn' onClick={() => {props.getSearchInfo('searching',true)}}><FontAwesomeIcon icon={faMagnifyingGlass} /></button> : props.children}

    </div>
  )
})
