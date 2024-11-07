import {useReducer} from 'react';
import logo from './logo.svg';
import './App.css';

function reducer(state,action) {
  return {...state, started: action.started}
  console.log('from the reducer : ',state,action);
}

function App() {

  const [state,dispatch] = useReducer(reducer,{started : false});
  const {started} = state;

  var handleStart = () => {
    dispatch({started: true})
  }

  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="app-title">React Quiz</p>
      </header>

      { !started && <div className="intro">
        <p className='b-para'> Welcome To The React.Js Quiz!</p>
        <p className='m-para'> 15 question to test your React knowlege</p>
        <button className='btn' onClick={handleStart}>Let's start</button>
      </div>}

    </div>
  );
}

export default App;
