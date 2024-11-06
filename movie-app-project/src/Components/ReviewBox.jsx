import {memo,useState,useEffect,Children,cloneElement} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from "@fortawesome/free-solid-svg-icons";

export default memo( function ReviewBox(props) {

  var stringReducer = function(strg,lm) {

    var limit = lm;
    if (strg.length > limit){
        while(strg.charAt(limit) !== " "){
          limit +=1;
        };
        return (strg.slice(0,limit) + " ...");
    };return strg;
 };

  return (
    <div className="review-box">
      <div className="review-head">
        <FontAwesomeIcon icon={faUser} />
        <p>{props.data.author}</p>
      </div>
      <p className='s-para'>{stringReducer((props.data.content ?? ""),200)}</p>

    </div>
  )
})
