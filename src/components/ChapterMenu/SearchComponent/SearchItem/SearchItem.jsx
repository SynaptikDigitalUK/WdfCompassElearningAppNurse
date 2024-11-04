
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useGlobalContext } from '../../../GlobalContext';

SearchItem.propTypes = {
  data:PropTypes.object,
}

export default function SearchItem({data}) {

  const { setShowSideMenu } = useGlobalContext()

  return (
    <>

        {data.title && (
   <div className="search-item">
        
        <>

              <div className='position-relative'>
                <h6>{data.sectionTitle }</h6>
                <h3>{data.chapterTitle }</h3>
                <Link className='search-course-name stretched-link border' to={`section/${data.chapterId}/${data.id}`} onClick={()=>{setShowSideMenu(false)}} >
                <span>{data.title }</span>
                </Link>
              </div>
       </>
        

      </div>
              )}

    </>
  )
}


