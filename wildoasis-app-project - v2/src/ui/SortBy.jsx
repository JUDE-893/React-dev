import {useSearchParams} from 'react-router-dom';
import Select from './Select';

export default function SortBy(props) {

  const [searchParams,setSearchParams] = useSearchParams();
  const currentSortVal = searchParams.get("SortBy");

  //handle Selecting sorte value
  const handleSelect = (e) => {
    searchParams.set("sortBy",e.target.value);
    setSearchParams(searchParams);
  }

  return(
    <Select {...props} currentVal={currentSortVal} onChange={handleSelect} />
  )
}
