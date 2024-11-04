import PropTypes from 'prop-types';
import { useState } from 'react';
import Quiz from '../Quiz/Quiz'
import { Link } from "react-router-dom";
import SectionTitleBtn from '../SectionTitleBtn'
MiniCaseComponent.propTypes = {
  content:PropTypes.object
}

export default function MiniCaseComponent({content}) {

  const [isComplete, setIsComplete] = useState(  false )

  const sanitizedData = () => ({
    // __html: DOMPurify.sanitize(data)
    __html: content.body
  })


  return (
    <>
  
  <div className='content-wrapper'>

  <div className='container container-case-content'>
    <div className='card'>
    <SectionTitleBtn title={content.sectionTitle} link={content.sectionLink}></SectionTitleBtn>
      <h1>{content.title}</h1>
      <div className='image-wrapper-case-study'><img src={content.image}  /> </div>
      <div dangerouslySetInnerHTML={sanitizedData()} />
     
      <Quiz questions={content.questions} hasCompleted={()=>setIsComplete(true)}/>



    {/* IF QUIZ HAS COMPLETED AND  */}
    {/* IF HAS NEXT REF THEN SHOW NEXT LESSON BUTTON */}
    {content.nextRef && isComplete &&(
      <div>
        <Link to={`./../${content.nextRef}`} className="btn btn-primary" role="button">
          Next
        </Link>
      </div>

    )} 

    </div>
    
  
    </div>
    


    </div>

    </>


  )
}
