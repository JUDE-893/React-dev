import {memo} from 'react';


export default memo( function ProgressBar(props) {

  return (
    <div className='progress-container'>
      <div class="progress">
        <div class="progress-bar" style={{width:`${(props.score/280)*100}%`}} role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      <div className='score'>
        <p>Question {props.questionNum}/15</p>
        <p style={{direction: 'rtl', transform: 'translateX(-50px)'}}>{Math.floor(props.score) }/280</p>
      </div>
    </div>
  )
})
