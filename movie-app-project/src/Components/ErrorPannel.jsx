

export default function ErrorPannel(props) {

  return (
    <div class='error-pannel d-flex justify-content-center align-items-center vh-100 mb-5 flex-column'>
      <img src={"/imgs"+props.imgPath}  />
      <p className='s-para'>{props.message}</p>
    </div>
  )
}
