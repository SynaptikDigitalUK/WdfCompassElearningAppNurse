import PropTypes from 'prop-types';
import { useState } from 'react';
import Quiz from '../Quiz/Quiz'
import { Link } from "react-router-dom";
import SectionTitleBtn from '../SectionTitleBtn'

MCQComponent.propTypes = {
  content:PropTypes.object
}

export default function MCQComponent({content}) {

  const [isComplete, setIsComplete] = useState(  false )
  const [userResponse, setUserResponse] = useState(  false )
  const sanitizedData = (html) => ({
    // __html: DOMPurify.sanitize(data)
    __html: html
  })



  const quizHasCompleted = (response)=>{

    const userResponses = response.userReponses

    setIsComplete(true)
    setUserResponse(response)

    // APPLY CORRECT  / INCORRECT RESPONSE CLASS
    setTimeout(()=>{
      const mcq_summary_response_el = document.getElementById('mcq_summary_response')
      const list = mcq_summary_response_el.getElementsByTagName('li')

      for (let i = 0; i< list.length;i++) {

        const matchResponse = userResponses.find(res=>res.qId === i)
        const currInnerHtml  = list[i].innerHTML
        if(matchResponse && matchResponse.isCorrect){
          list[i].innerHTML = "<span>CORRECT</span>" + currInnerHtml
          list[i].classList.add("correct")
        }else{
          list[i].innerHTML = "<span>INCORRECT</span>" + currInnerHtml
          list[i].classList.add("incorrect")
        }
    }

    }, 400)
  }

  return (
    <>
  
  <div className='content-wrapper'>
  <div className='container container-mcq-content'>
  
  <SectionTitleBtn title={content.sectionTitle} link={content.sectionLink}></SectionTitleBtn>
  <h1>{content.title}</h1>
  <div className='card card-mcq'>

      <div className='quiz-intro-text'>{content.intro}</div>
      {!isComplete &&(
        <Quiz questions={content.questions} returnResultsOnComplete={true} trackUserReponses={true} hasCompleted={(response)=>quizHasCompleted(response)} />
      )}

      {isComplete &&(
        <>
          <h2>SUMMARY RESULTS</h2>

          <p><strong>Score:</strong> {userResponse.score}/{content.questions.length}</p>

          <div id="mcq_summary_response" dangerouslySetInnerHTML={sanitizedData(content.summary)} />



          {content.nextRef &&(

          <div className='d-flex justify-content-center'>
            <Link to={`./../${content.nextRef}`} className="btn btn-primary" role="button">
              Next
            </Link>
          </div>

          )}

        </>
      )}
    </div>

  </div>
  
  </div>
  
  

    </>


  )
}
