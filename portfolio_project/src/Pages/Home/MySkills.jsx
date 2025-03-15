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
          <p className="small-para">Expertise in creating user interfaces with React, Next.js and Vanilla Javascript</p>
        </div>

        <div className="skill-box">
          <img className='' src="./img/tag-1.png" alt="skill ticket" />
          <h2 className="skill-title">Back-End</h2>
          <p className="small-para">Excel in crafting and managing robust server-side services, ensuring seamless communication with databases systems</p>
        </div>

        <div className="skill-box">
          <img className='' src="./img/feather-pen-1.png" alt="skill ticket" />
          <h2 className="skill-title"><span style={{}}>API Development</span> and Integration</h2>
          <p className="small-para">Design, develop, and consume RESTful to connect front-end and back-end components seamlessly</p>
        </div>

        <div className="skill-box">
          <img className='' src="./img/feather-pen-2.png" alt="skill ticket" />
          <h2 className="skill-title">Project Management</h2>
          <p className="small-para">Strong expertise in managing projects, and applying agile methodologies for successful and efficient project delivery.</p>
        </div>

      </div>
    </div>
  )
})
