import {memo, useState, useEffect} from 'react';

export default memo( function Question(props) {

  const {question, correct, answers} = props.data,
  [choosed, setChoosed] = useState(false);

  // add an keyPress event
  useEffect ( () => {
    choosed && document.addEventListener("keypress",handleEnterKey );
    return () => {document.removeEventListener("keypress",handleEnterKey );}
  },[choosed])

  // function that recieves the index of the chosen answer and compare it with the index of the correct one then return the result to the reducer function
  var handleClick = function(ind) {
    !choosed && setChoosed( true);
    !choosed && props.handleDispatcher({operation: (ind === correct ? 'correct' : 'incorrect')})
  }

  // function that get called as the user presses a keyboard button & returns an action to the reducer as the user clickes the «Enter» key
  function handleEnterKey(e) {
    if (e.code === "Enter" || e.keyCode === 13 || e.which === 13) {
      props.lastQuestionNum === props.questionNum && props.handleDispatcher({operation: 'finish'});
      props.lastQuestionNum > props.questionNum && props.handleDispatcher({operation: 'answered'});
    }
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
        {choosed && props.lastQuestionNum > props.questionNum && <button className='btn next' onClick={() => props.handleDispatcher({operation: 'answered'})}>Next</button>}
        {choosed && props.lastQuestionNum === props.questionNum && <button className='btn next' onClick={() => props.handleDispatcher({operation: 'finish'})}>Finish</button>}
      </div>
   </div>  )
})
