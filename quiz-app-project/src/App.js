import {useReducer,useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Question from './Components/Question';
import ProgressBar from './Components/ProgressBar';
import Counter from './Components/Counter';
import ScoreSheet from './Components/ScoreSheet';


function reducer(state,action) {

  switch (action.operation) {
    case "start":
      return {...state, started: (state.started === true ? false : true)}
      break;

    case "finish":
      return {...state, finished: (state.finished === true ? false : true)}
      break;

    case "correct":
      var obj = {...state, score: state.score + (280/state.data.length)}
      return {...obj, highiestScore: (state.highiestScore < obj.score ? obj.score : state.highiestScore)}

    case "answered":
      return {...state, answered: state.answered ? false : true, questionNum : state.questionNum + 1}
      break;

    case "restart":
      return {...state ,started : false,finished:false, score:0, answered:false, questionNum:0}
      break;

    case "dataSetting":
      return {...state ,data : action.data}
      break;

    default:
      return state;
  }
}


// App Component
function App() {

  const [state,dispatch] = useReducer(reducer,{data:[], started : false,finished:false, score:0,highiestScore:0, answered:false, questionNum:0});
  const {data,started,score,highiestScore,answered,questionNum,finished} = state;

  // the function that triggers the dispatcher and pass the proper action to perform, The action is recieve by the function as argument: {operation : optExemple}
  var handleDispatcher = function(action) {
    dispatch(action)
  }

  useEffect( () => {
    axios.get("http://localhost:9600/questions").then( (request) => {handleDispatcher({data: request.data, operation:"dataSetting"})}).catch( (e) => {console.log(e);})
  },[])

  // add a keyPress Event
  useEffect ( () => {
    !started  && document.addEventListener("keypress",handleEnterKey );
    return () => {document.removeEventListener("keypress",handleEnterKey );}
  },[started])

  // function that get called as the user presses a keyboard button & returns an action to the reducer as the user clickes the «Enter» key
  function handleEnterKey(e) {
    if (e.code === "Enter" || e.keyCode === 13 || e.which === 13) {
      handleDispatcher({operation: 'start'})
    }
  }

  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="app-title">React Quiz</p>
      </header>

      {!finished ? (!started ? <div className="intro">
        <p className='b-para'> Welcome To The React.Js Quiz!</p>
        <p className='m-para'> 15 question to test your React knowlege</p>
        <button className='btn' onClick={() => handleDispatcher({operation: 'start'})}>Let's start</button>
      </div>
      : <>
        <ProgressBar score={score} questionNum={questionNum} />
        <Question key={questionNum} questionNum={questionNum} lastQuestionNum={data.length-1} data={data[questionNum] ?? {}} handleDispatcher={handleDispatcher}>
          <Counter handleDispatcher={handleDispatcher} />
        </Question>
      </>)
      : <ScoreSheet handleDispatcher={handleDispatcher} score={score} highiestScore={highiestScore}/>
    }

    </div>
  );
}

export default App;
