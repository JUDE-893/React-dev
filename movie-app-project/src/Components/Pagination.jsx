import {memo, useState} from 'react';

/*
  Pagination Component : displays a pagination element that allow navigate or search through a multiple or big amount of data
  requires* : {pageIndex: curentpage index , pagesIndexes : total pages , setPageIndex : currrent page index setter}
*/


export default memo( function Pagination(props) {

  const [deckIndex,setDeckIndex] = useState(0);

  var {pageIndex: pageIndex,setPageIndex: setPageIndex ,pagesIndexes: pagesIndexes} = props;
  console.log('pageINdex : ',pageIndex,'setpages : ', setPageIndex ,'pagesInd : ', pagesIndexes);
  var maxDeck = Math.floor(pagesIndexes / 10) + (pagesIndexes % 10 !== 0 ? 1 : 0);


  return (
    <nav aria-label="...">
      <ul class="pagination pagination-sm justify-content-center">

          {pagesIndexes > 10 && (<li class="page-item" >
                                       <span class="page-link" href="#" aria-label="Previous" onClick={()=>(deckIndex > 0) && setDeckIndex(deckIndex-1)}><span aria-hidden="true">&laquo;</span></span>
                                     </li>)}

          {Array.from({ length: pagesIndexes }, (_, l) => l).slice(deckIndex*10,deckIndex*10+10).map ((i) => {
            return  (<li key={i} className={`page-item ${i === pageIndex ? "active" : ''}`} aria-current="page">
                         <span onClick={()=> setPageIndex(i)} className="page-link">{i + 1}</span>
                     </li>)})}

           {pagesIndexes > 10 && (<li class="page-item" >
                                        <span class="page-link" href="#" aria-label="Next" onClick={()=>(deckIndex +1 < maxDeck) && setDeckIndex(deckIndex+1)}><span aria-hidden="true">&raquo;</span></span>
                                  </li>)}
      </ul>
    </nav>
  )

})
