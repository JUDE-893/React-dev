import {useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './Components/Question';
import ProgressBar from './Components/ProgressBar';
import Counter from './Components/Counter';

function reducer(state,action) {

  switch (action.operation) {
    case "start":
      console.log('called',state.started === true ? false : true);
      return {...state, started: (state.started === true ? false : true)}
      break;

    case "correct":
      return {...state, score: state.score + 10}


    case "answered":
      return {...state, answered: state.answered ? false : true, questionNum : state.questionNum + 1}
      break;

    default:
      return state;
  }
}

var data = [
  {question : 'Wht is the most popular JavaScript framework ?', correct:0, answers: ["react.js" ,'Angular' , "Vue.js", "Next.js"]},
  {question : 'Wht is the most popular JavaScript framework ?', correct:0, answers: ["react.js" ,'Angular' , "Vue.js", "Next.js"]},
  {question : 'Wht is the most popular JavaScript framework ?', correct:0, answers: ["react.js" ,'Angular' , "Vue.js", "Next.js"]},
  {question : 'Wht is the most popular JavaScript framework ?', correct:0, answers: ["react.js" ,'Angular' , "Vue.js", "Next.js"]}
]


// App Component
function App() {

  const [state,dispatch] = useReducer(reducer,{started : false, score:0, answered:false, questionNum:0});
  const {started,score,answered,questionNum} = state;

  // the function that triggers the dispatcher and pass the proper action to perform, The action is recieve by the function as argument: {operation : optExemple}
  var handleDispatcher = function(action) {
    dispatch(action)
  }

  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="app-title">React Quiz</p>
      </header>

      { !started ? <div className="intro">
        <p className='b-para'> Welcome To The React.Js Quiz!</p>
        <p className='m-para'> 15 question to test your React knowlege</p>
        <button className='btn' onClick={() => handleDispatcher({operation: 'start'})}>Let's start</button>
      </div>
      : <>
        <ProgressBar score={score} questionNum={questionNum}/>
        <Question key={questionNum} data={data[questionNum]} handleDispatcher={handleDispatcher}>
          <Counter />
        </Question>
      </>
    }

    </div>
  );
}

export default App;
