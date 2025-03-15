import {memo} from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default memo(function HeroSection() {

  console.log("HeroSection");
  return (
    <section id='heroSection'>
      <div className="hero--section-container">
        <div className="hero--section">
          <p className='section--title'>Hey, I'm Arif Ayoub </p>
          <h1 className="hero--section-title">
            <span className="hero--section-title-color"> Full Stack</span>{" "}
            <br />
            Devoloper
          </h1>
          <p className="hero--section-description">Crafting scalable web solutions and delivering innovative
          <br/> full-stack development to bring ideas to life.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => document.location.replace('#Contact')}>Get In Touch</button>
      </div>

      <div className="Hero--section-img">
        {/*<img src='./img/hero_img.png' alt="hero section image pannel"/>*/}
        <DotLottieReact
          src="./img/Animation - 1741972949921.json"
          loop
          autoplay
          />
      </div>
    </section>
  )
}
)
