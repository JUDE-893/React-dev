import {memo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faStarHalfStroke} from '@fortawesome/free-solid-svg-icons';
import {faStar as regFaStar} from '@fortawesome/free-regular-svg-icons';


export default memo(function Testimonials() {

  console.log("Testimonials");
  return (

    <div className="portfolio-section" id='testimonials'>
      <p className="Section-title">Clients FeedBack</p>
      <p className='Section-big-title'>customer testimonials</p>


      <div className="customer-container">


              <div className="customer-box">
                <div className="stars">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarHalfStroke} />
                </div>
                <p className='small-para'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                <div className="costomer-profile">
                  <img src="./img/avatar-image.png" alt="" />
                  <div className="customer-identity">
                    <p className="project-title">Jahun Johnson</p>
                    <p className='small-para'>customer</p>
                  </div>
                </div>
              </div>


              <div className="customer-box">
                <div className="stars">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <p className='small-para'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                <div className="costomer-profile">
                  <img src="./img/avatar-image.png" alt="" />
                  <div className="customer-identity">
                    <p className="project-title">Jahun Johnson</p>
                    <p className='small-para'>customer</p>
                  </div>
                </div>
              </div>


              <div className="customer-box">
                <div className="stars">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={regFaStar} />
                </div>
                <p className='small-para'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                <div className="costomer-profile">
                  <img src="./img/avatar-image.png" alt="" />
                  <div className="customer-identity">
                    <p className="project-title">Jahun Johnson</p>
                    <p className='small-para'>customer</p>
                  </div>
                </div>
              </div>
      </div>


    </div>
  );
}
)
