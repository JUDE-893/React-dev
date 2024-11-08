import {useState,useEffect,useRef} from 'react';


export default (function Counter(props) {

  const [count,setCount] = useState({min:7,sec:0}),
  countRef = useRef(count),
  {min,sec} = count;

  console.log('minisec : ',min,sec);

  useEffect ( ()=> {
    countRef.current = count;
  },[count]);


  useEffect ( ()=> {
    const timer = setInterval( () => {
      var num = (countRef.current.min*60 + countRef.current.sec)-1,
      Min = Math.floor(num / 60),
      Sec = (num % 60);
      setCount( {min: Min,sec:Sec} )
    }, 900);

    return () =>{
      clearInterval(timer);
      console.log('interval was cleared');
    }
  },[]);


  return (
    <button className='btn btn-outline' >{count.min}:{count.sec}</button>
  )
})
