import {memo,useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"

export default memo(function SearchBar(props) {

  const [entry,setEntry] = useState(""),
  navigate = useNavigate(),

  // function that retrieve and update the value of the entry via the state dynamic value
  handleEntry = (e) => {
    let val = e.target.value;
    setEntry(val);
  };

  // function that handle the visibility of the searBar accordingly to the value of the entry and the actual user focus (by the cursor)
  var handleVisbility = (e) => {
    (entry.split('').length === 0) &&
     e.target.className !== "search" &&
      e.target.nodeName !== "INPUT" &&
       e.target.className !== "search-bar" &&
        e.target.className !== "search-btn" &&
         e.target.tagName !== "path" &&
          e.target.nodeName !== "svg" ? props.getSearchInfo('searching',false) : props.getSearchInfo('searching',true) ;
  }

  // function that handle the click on the search button to retrieve the search Keyword then navigate to the search page.
  var onClickSearch = function() {
    if (entry.length > 0) {
      props.getSearchInfo('term',entry);
      navigate('/search')
    }
  }

  // function that handles the search event (as previously mentioned in onclickSearch func) after the ENTER Key is pressed
  var onEnterPressSearch = (e) => {
    console.log(e);
    if (e.code === "Enter" || e.charCode === 13 || e.which === 13){
      onClickSearch();
    }
  }


  useEffect(
      () => {

          if (entry.length === 0 ) {
            document.body.addEventListener('mousedown',handleVisbility);
          }else {
            document.body.removeEventListener('mousedown',handleVisbility);
          }
  },[entry]);

  useEffect( () => {
    document.addEventListener('keypress',onEnterPressSearch);

    return () => document.removeEventListener('keypress',onEnterPressSearch)
  })


  return (
      <div className="search">
        <div className="search-bar">
          <input type="text" value={entry ?? ""} placeholder="Seach For Any Movie, Serie Or Show" onChange={handleEntry} autoFocus/>
          <button type="button" className='search-btn' onClick={ onClickSearch } ><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
      </div>
  )
})
