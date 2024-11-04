import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useState, useMemo } from 'react';
import ListingCardComponent from './../ListingCardComponent';
import SectionTitleBtn from '../SectionTitleBtn'
import Utils from '../Utils';
import { useGlobalContext } from '../GlobalContext';

ListingComponent.propTypes = {
  content:PropTypes.object
}

export default function ListingComponent({content}) {
  // set intial view count before user click load more
  const defaultValueLimit = 3
  const [showFullResults, setShowFullResults] = useState(  false )

  // return either the limited view or full listings
  const filteredListings = useMemo(()=>{
    if(!content.chapters)return []
    return showFullResults ? content.chapters : content.chapters.map(t=>t).splice(0,defaultValueLimit)
  }, [ showFullResults, content])

  const {setActivePdfViewerFile} = useGlobalContext()

  return (
    <>
  {content.chapters 
  ?(
  
  <div className='content-wrapper'>

  <div className='container container-listing-content'>

  <SectionTitleBtn title={content.sectionTitle} link={content.sectionLink} active={true}></SectionTitleBtn>
<h1>{content.title}</h1>
<ul className='list-unstyled nav-wrapper'>
  {filteredListings.map((item) => {
      return (
      
          <li key={`sub_${Utils.removeUnsafeChars(item.title)}`} className="card-topic-wrapper">
            <Link to={`${item.contentId}`} className='card card-topic-menu'>
                <h3>{item.title }</h3>
            </Link>
          </li>
           
      )}
  )}
</ul>

  {!showFullResults && ( content.chapters.length > defaultValueLimit) &&(
    <div className='d-flex mb-5'>
      <button className='btn btn-outline-primary mx-auto' onClick={()=>{setShowFullResults(true)}}>LOAD MORE</button>
    </div>
  )}
  
  {((content.caseStudiesContent?.length)    || ( content.factsheetContent?.length)) &&(
    <p className='tagline-text'>LEARN MORE</p>
  )}

  <div className='row'>
  {!!content.caseStudiesContent?.length && (
  <>
  
    {content.caseStudiesContent.map((item) => {
        return (
          <ListingCardComponent item={item} key={`case_${item.content.title}`} type="case" />
      )} 
    )}
  </>
  )}

{!!content.factsheetsContent?.length && (
  <>
  
    {content.factsheetsContent.map((item) => {
        return (
          <ListingCardComponent item={item} key={`case_${item.content.title}`} onViewPdf={(e)=>setActivePdfViewerFile(e)}  type="factsheet" />
      )} 
    )}
  </>
  )}
  </div> 

  
    
    </div>
    </div>
  )
  :(false)
}
    </>


  )
}
