import {memo} from 'react';

export default memo( function Pricing(){
  return (
    <>
      <div className="Pricing">
        <div className="">
          <h1>Simple pricing.<br/>Just $9/month.</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel labore mollitia iusto. Recusandae quos provident, laboriosam fugit voluptatem iste.</p>
        </div>
        <img src="/imgs/img-2.jpg" alt="@photo with a city view on the background"/>
      </div>
      <p className="copyright">&copy; Copyright 2024 by <span>@Jude-893</span> Inc.</p>
    </>
  )
})
