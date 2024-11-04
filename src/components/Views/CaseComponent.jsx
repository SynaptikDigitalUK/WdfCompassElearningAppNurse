import PropTypes from 'prop-types';
import { useState } from 'react';
// import CaseLearning from '../CaseLearning/CaseLearning'
import Quiz from '../Quiz/Quiz'
import { Link } from "react-router-dom";
import SectionTitleBtn from '../SectionTitleBtn'
CaseComponent.propTypes = {
  content:PropTypes.object
}

export default function CaseComponent({content}) {

  const [isStarted, setIsStarted] = useState(  false )
  const [isComplete, setIsComplete] = useState(  false )

  const sanitizedData = (html) => ({
    // __html: DOMPurify.sanitize(data)
    __html: html
  })


  return (
    <>
  
  <div className='content-wrapper'>

  

  <div className='container container-case-content'>
    <div className='card'>
    <SectionTitleBtn title={content.sectionTitle} link={content.sectionLink}></SectionTitleBtn>
      <h2>{content.title}</h2>
      {/* <h4>{content.subTitle}</h4> */}
      
      {content.image && (
        <div className='image-wrapper-case-study'><img src={content.image}  /> </div>
      )}
      
      {/* IF NOT STARTED  - SHOW INTRO SLIDE */}
      {!isStarted  && (
          <div className='case-intro'>
            
            <div className="row">
              <div className='col-12 col-md-6 col-xl-6 col-xxl-6 case-history'> 
                {/* <h2>History</h2> */}
                <div dangerouslySetInnerHTML={sanitizedData(content.intro.history)} />
              </div>
              <div className='col-12 col-md-6 col-xl-6 col-xxl-6' >
                <div className=' case-subtle'>
                {/* <h3>Clinical chemistry</h3> */}
                <div dangerouslySetInnerHTML={sanitizedData(content.intro.chemistry)} />
                </div>
              </div>

            </div>
            
            <div className="row justify-content-center">
              <div className='col-10 '>
                <div className='case-subtle'>
                {/* <h3>Current medication</h3> */}
                <div dangerouslySetInnerHTML={sanitizedData(content.intro.medication)} />
                </div>
              </div>
            </div>

            <div className='d-flex justify-content-center'>
            <button onClick={(e)=>{
              e.preventDefault(); 
              setIsStarted(true)
            }} 
            className='btn btn-primary'>Start</button>
            </div>

          </div>
        )}

        { (isStarted && !isComplete) &&(
          <div className='case-quiz'>
            <Quiz questions={content.questions} showInstantResponses={true} hasCompleted={()=>setIsComplete(true)}/>
          </div>
        )}

      {/* IF COMPLETED  - SHOW SUMMARY SLIDE */}
      {isComplete  && (
      
      <div className='case-summary'>
            <h1>Summary</h1>
            <div className="row">
              <div className='col-12 col-md-6 col-xl-6 col-xxl-6 case-history'> 
                {/* <h2>History</h2> */}
                <div dangerouslySetInnerHTML={sanitizedData(content.summary.intro)} />
              </div>
              <div className='col-12 col-md-6 col-xl-6 col-xxl-6' >
                <div className='case-subtle'>
                {/* <h3>Current chemistry </h3> */}
                <div dangerouslySetInnerHTML={sanitizedData(content.summary.chemistry)} />
              </div>
              </div>
            </div>
            
            <div className="row justify-content-center">
              <div className='col-10 '>
                <div className='case-subtle'>
                {/* <h3>Current medication</h3> */}
                <div dangerouslySetInnerHTML={sanitizedData(content.summary.medication)} />
                </div>
              </div>
            </div>
          

          </div>
      
      
      )}



    {/* IF QUIZ HAS COMPLETED AND  */}
    {/* IF HAS NEXT REF THEN SHOW NEXT LESSON BUTTON */}
    {content.nextRef && isComplete &&(
      <div className='d-flex justify-content-center'>
        <Link to={`./${content.nextRef}`} className="btn btn-primary" role="button">
          Back
        </Link>
      </div>

    )} 

    </div>
    
  
    </div>
    


    </div>

    </>


  )
}
