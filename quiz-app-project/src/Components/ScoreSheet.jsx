import {useState, useEffect} from 'react';


export default function ScoreSheet(props) {

  const [score,setScore] = useState(0);

  useEffect( () => {
    var scorePer= (props.score/280)*100;
    var part = scorePer-score > 10 ? scorePer/10 : scorePer-score;
    if (score === scorePer) {
      clearTimeout(incrementor)
    }else{
      var incrementor = setTimeout( () => {
        setScore(score+ part);
      },100)
    };

    return () => clearTimeout(incrementor);
  },[score])

  // add a keyPress Event
  useEffect ( () => {
    console.log("Called from the scresheet");
    document.addEventListener("keypress",handleEnterKey );
    return () => {document.removeEventListener("keypress",handleEnterKey );}
  },[])

  // function that get called as the user presses a keyboard button & returns an action to the reducer as the user clickes the «Enter» key
  function handleEnterKey(e) {
    if (e.code === "Enter" || e.keyCode === 13 || e.which === 13) {
      props.handleDispatcher({operation: 'restart'})
    }
  }

  return (
    <div className='scoreSheet d-flex flex-column justify-content-center align-items-center'>
      <p className='average'>{Math.floor(score)}%</p>
      <p className="score">Your Score: {props.score} / 280 point</p>
      <p className="score hight-score">Highiest Score: {props.highiestScore} / 280 point</p>
      <button className='btn' onClick={() => props.handleDispatcher({operation: 'restart'})}>Let's start</button>
    </div>
  )
}
