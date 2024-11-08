import {memo} from 'react';


export default memo( function ProgressBar(props) {

  return (
    <div className='progress-container'>
      <div class="progress">
        <div class="progress-bar" style={{width:'60%'}} role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      <div className='score'>
        <p>Question {props.questionNum}/4</p>
        <p>{props.score }/280</p>
      </div>
    </div>
  )
})
