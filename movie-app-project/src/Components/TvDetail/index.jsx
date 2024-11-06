import {memo} from 'react';
import { useParams } from 'react-router-dom';
import DetailsInfo from '../DetailsInfo';
import MovieContainer from '../MovieContainer';
import SeasonBox from './SeasonBox';

export default memo( function(props) {

  const { ID } = useParams();

  return (
    <DetailsInfo ID={ID} type='tv'>
      <MovieContainer id="seasons" endpoint={`tv/${ID}`} type='tv'>
        <p className="section-title">Seasons</p>
        <SeasonBox ID={ID}/>
      </MovieContainer>
    </DetailsInfo>
  )
})
