import {memo, useState} from 'react';

export default memo( function Question(props) {

  const {question, correct, answers} = props.data,
  [choosed, setChoosed] = useState(false);

  var stateClass = "";

  var handleClick = function(ind) {
    setChoosed( true);
    props.handleDispatcher({operation: (ind === correct ? 'correct' : 'incorrect')})
  }

  return (

    <div className="question-section">
      <p className="m-para">{question}</p>
      <div className="suggestions">
        {answers.map( (a,i) => {

          return <button key={i} className={ `btn btn-question ${choosed ? (correct === i ? 'correct' : 'wrong') : ""}`} onClick={()=>handleClick(i)}>{a}</button>
        })}
      </div>

      <div className='question-footer'>
        {props.children}
        {choosed && <button className='btn' onClick={() => props.handleDispatcher({operation: 'answered'})}>Next</button>}
      </div>
   </div>  )
})
