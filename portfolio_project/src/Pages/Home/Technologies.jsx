import Tech from './Tech';

export default function Technologies() {

  return (
    <div className='tech-section'>

      <p className="Section-title">Technologies</p>
      <div className="">
          <p className='Section-big-title' style={{width:"150%"}}> Staying ahead in the ever-changing tech landscape</p>
      </div>

      <div id='Technologies'>
        <Tech src="./img/react_react native_icon.svg" />
        <Tech src="./img/mongodb.svg" />
        <Tech src="./img/nodejs_icon.svg" />
        <Tech src="./img/nextjs.svg" />
        <Tech src="./img/python.svg" />
        <Tech src="./img/Laravel.svg" />
        <Tech src="./img/react-native.svg" />
        <Tech src="./img/mysql.svg" />
        <Tech style={{height:2,width:30}}src="./img/livekit.png" />
        <Tech src="./img/Brevo-logo-vector-01.svg" />
      </div>
    </div>
  )
}
