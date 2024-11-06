import {memo} from 'react';

export default memo(function HeroSection() {

  console.log("HeroSection");
  return (
    <section id='heroSection'>
      <div className="hero--section-container">
        <div className="hero--section">
          <p className='section--title'>Hey, I'm John</p>
          <h1 className="hero--section-title">
            <span className="hero--section-title-color"> Full Stack</span>{" "}
            <br />
            Devoloper
          </h1>
          <p className="hero--section-description">lorem ist atariq via faloga itimogide
          <br />tariq sta albortis nato escl queand el pascifika
          </p>
        </div>
        <button className="btn btn-primary">Get In Touch</button>
      </div>

      <div className="Hero--section-img">
        <img src='./img/hero_img.png' alt="hero section image pannel"/>

      </div>
    </section>
  )
}
)
