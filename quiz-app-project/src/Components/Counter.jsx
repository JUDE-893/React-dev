import {useState,useEffect,useRef} from 'react';


export default (function Counter(props) {

  const [count,setCount] = useState({min:7,sec:30}),
  countRef = useRef(count),
  {min,sec} = count;

  //console.log('minisec : ',min,sec);

  useEffect ( ()=> {
    countRef.current = count;
  },[count]);


  useEffect ( ()=> {
    const timer = setInterval( () => {
      var num = (countRef.current.min*60 + countRef.current.sec)-1;
      if (num >= 0){
        var Min = Math.floor(num / 60),
        Sec = (num % 60);
        setCount( {min: Min,sec:Sec} );
      }else {
        props.handleDispatcher({operation:'finish'});
        clearInterval(timer);
      };

    }, 1000);

    return () =>{
      clearInterval(timer);
    }
  },[]);


  return (
    <button className='btn btn-outline' >{count.min}:{count.sec < 0 ? 0 : ''}{count.sec}</button>
  )
})
