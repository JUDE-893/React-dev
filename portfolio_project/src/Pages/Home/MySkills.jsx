import {memo} from 'react';

export default memo(function Myskills() {

  console.log("MySkills");
  return (
    <div className="Container">

      <p className='Section-title'>My Skills</p>
      <h1 className='Section-big-title'>My Expertise</h1>

      <div className="skills-container">

        <div className="skill-box">
          <img className='' src="./img/product-chain-1.png" alt="skill ticket" />
          <h2 className="skill-title">Front-End</h2>
          <p className="small-para">explorente del race ano faety de gamma oder teste under the hood dante woer expertrience del mejores jugadores</p>
        </div>

        <div className="skill-box">
          <img className='' src="./img/tag-1.png" alt="skill ticket" />
          <h2 className="skill-title">Back-End</h2>
          <p className="small-para">explorente del race ano faety de gamma oder teste under the hood dante woer expertrience del mejores jugadores</p>
        </div>

        <div className="skill-box">
          <img className='' src="./img/feather-pen-1.png" alt="skill ticket" />
          <h2 className="skill-title">UI & UX Design</h2>
          <p className="small-para">explorente del race ano faety de gamma oder teste under the hood dante woer expertrience del mejores jugadores</p>
        </div>

        <div className="skill-box">
          <img className='' src="./img/feather-pen-2.png" alt="skill ticket" />
          <h2 className="skill-title">Webflow development</h2>
          <p className="small-para">explorente del race ano faety de gamma oder teste under the hood dante woer expertrience del mejores jugadores</p>
        </div>

      </div>
    </div>
  )
})
