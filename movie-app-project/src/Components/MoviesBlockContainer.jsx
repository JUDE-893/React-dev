import {memo, useState,useEffect} from 'react';
import MovieBox from './MovieBox';


export default memo( function MoviesBlockContainer(props) {

  const [data, setData] = useState({});

  return (
    <div className='movies-block-container'>
    <div className='movies-block'>
      {props.data.map( (m) => {
        return <MovieBox key={m.id} type={props.type} data={m} />
      })

      }
    </div>

    </div>
  )
})
