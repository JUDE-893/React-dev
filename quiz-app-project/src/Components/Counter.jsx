import {useState,useEffect} from 'react';


export default (function Counter(props) {

  const [count,setCount] = useState(new Date())

  useEffect ( ()=> {
    var now = new Date();
    now.setMinutes(now.getMinutes() + 7)
    setCount(now)

    setInterval( () => {
      console.log(count.getSeconds());
      setCount( count.setSeconds(count.getSeconds() - 0.5 ))
    }, 1000)
  },[])


  return (
    <button className='btn btn-outline' >{count.getMinutes}:{count.getSeconds}</button>
  )
})
