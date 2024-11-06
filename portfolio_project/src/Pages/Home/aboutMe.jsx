import {memo} from 'react';

export default memo(function AboutMe() {

  console.log("About");
  return (
    <div className="About-container" id="about">

      <div className="Hero--section-img">
        <img  className='' src="./img/about-me.png" alt="" />
      </div>

      <div className="About-Section">
        <p className='Section-title'>About</p>
        <p className='Section-big-title'>About Me</p>
        <p className='small-para'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Ut enim ad minim veniam, quis nostrud exercitation quip exeal commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore </p>
        <br/>
        <p className='small-para'>Plus fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  )
})
