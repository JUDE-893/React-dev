import {memo} from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default memo(function AboutMe() {

  console.log("About");
  return (
    <div className="About-container" id="about">

      <div className="Hero--section-img">
        {false && <img  className='' src="./img/about-me.png" alt="" />}
        <DotLottieReact
          src="./img/pc_animation.lottie"
          loop
          autoplay
          />
      </div>

      <div className="About-Section">
        <p className='Section-title'>About</p>
        <p className='Section-big-title'>About Me</p>
        <p className='small-para'>I’m a highly motivated and passionate junior full-stack developer with strong expertise in crafting web applications that inspire and deliver. My skill set spans both frontend and backend development, with a particular focus on React, React Native, and the backend power of Node.js, Laravel, MongoDB, and MySQL. My approach leverages the strengths of a MEERN stack—enhanced with Laravel and MySQL—to build scalable, robust, and seamless solutions.</p>
        <br/>
        <p className='small-para'>What drives me every day is my commitment to clean code, intuitive user experiences, and finding innovative ways to solve complex problems. Whether it’s bringing dynamic frontends to life or architecting efficient backends, I thrive on turning ideas into functional, impactful realities.</p>
      </div>
    </div>
  )
})
