import {useRef,  useState, useMemo } from 'react';

import PropTypes from 'prop-types';
import Utils from '../Utils';

Quiz.propTypes = {
  questions:PropTypes.array,
  showInstantResponses:PropTypes.bool,
  hasCompleted:PropTypes.func,
  returnResultsOnComplete:PropTypes.bool,
  trackUserReponses:PropTypes.bool,
}

export default function Quiz({questions, hasCompleted, showInstantResponses, returnResultsOnComplete, trackUserReponses}) {
  const submitBtnRef = useRef(null);

  const [showResponse, setShowResponse] = useState(  null )
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(  0 )
  const [userScore, setUserScore] = useState(  0 )
  const [userResponses, setUserResponses] = useState(  [] )

  const nextQuestion = (e)=>{
    if(e){
      e.preventDefault()
    }
    setShowResponse(null)

    if(currentQuestionIndex===(questions.length-1)){

      if(hasCompleted){
        
        hasCompleted(true)
      }

    }

    setCurrentQuestionIndex(currentQuestionIndex+1)
  }

  const clearCurrentResponse = (e)=>{
    e.preventDefault()
    setShowResponse(null)
  }

  

  const quizProgress = useMemo(()=>{
    
    return Math.ceil(((currentQuestionIndex+1) / questions.length) * 100)
  }, [currentQuestionIndex, questions])


  const onOptionChange = ()=>{
    submitBtnRef.current.disabled = false;

  }

  const handleSubmit = (e)=>{
      e.preventDefault()


  // Read the form data
    const form = e.target;

    let formJson;
    try {
      const formData = new FormData(form);
      formJson = Object.fromEntries(formData.entries());
    } catch (error) {
      formJson = Utils.getFormValues(form);
    }

    console.log('formJson', formJson);
    const userResponse = formJson.responses
    //if single question then show response related to answer chosen by user
  
    const innerResponse = questions[currentQuestionIndex].answers.find(q=>q.id=== userResponse)
    
    let newUserScore = userScore
    let updatedUsersResponses = userResponses

    if(questions[currentQuestionIndex].correct==innerResponse.id){
      innerResponse.isCorrect =true
      if(returnResultsOnComplete){
        newUserScore = userScore+1
        setUserScore(newUserScore)
      }
    }

    if(trackUserReponses){
       
      const responseObject = {
        qId:currentQuestionIndex,
        response:userResponse,
        isCorrect:innerResponse.isCorrect || false
       }
       
       updatedUsersResponses.push(responseObject)
      setUserResponses(updatedUsersResponses)
    }

    if(questions.length==1 || showInstantResponses){
      
      setShowResponse(innerResponse)

    }else{

      if(currentQuestionIndex===(questions.length-1)){
        if(!showInstantResponses){

          if(hasCompleted){
            let reportObject;
            if(returnResultsOnComplete){
              reportObject = {
                score:newUserScore
              }
              if(trackUserReponses){
                reportObject.userReponses = updatedUsersResponses
              }

            }else{
              reportObject = true
            }
            hasCompleted(reportObject)
          }
        }

      }else{
        nextQuestion()
      }

    }
    
    // reset form after submitting each answer
    form.reset()

  }

  const sanitizedData = (html) => ({
    // __html: DOMPurify.sanitize(data)
    __html: html
  })

  return (
    
      <>
        <div className='quiz'>
          <div>

          {questions.length > 1 && (
              <p className='tagline-text'>Question {currentQuestionIndex+1} of {questions.length}</p>
            )}

          {questions[currentQuestionIndex].title && (
              <h2 className='tagline-text headline'>{questions[currentQuestionIndex].title}</h2>
            )}

           

            <h4 dangerouslySetInnerHTML={sanitizedData(questions[currentQuestionIndex].question)}></h4>
          </div>
          
          {!showResponse && (
          <>
          
            <form method="post"  onSubmit={handleSubmit}>
              <input name="questionId" type="hidden" defaultValue={questions[currentQuestionIndex].id} />
              <div className="answer-group">
                {questions[currentQuestionIndex].answers.map((item) => {
            
                  return (
                    <div className="form-check" key={item.id} >
                      <input className="form-check-input" type="radio" name="responses" id={`${questions[currentQuestionIndex].id}_${item.id}`} value={item.id} onChange={onOptionChange}/>
                      <label className="form-check-label" htmlFor={`${questions[currentQuestionIndex].id}_${item.id}`}>
                        <div dangerouslySetInnerHTML={sanitizedData(item.answer)} />
                      </label>
                    </div>
                  )

                })}
              </div>


              <div className='progress-block '>
          
                {/* IF MORE THAN 1 QUESTION THEN SHOW PROGRESS BAR */}
                {questions.length > 1 && (
                  <>
                  <span className="tagline-text progress-label">{quizProgress}%</span>
                  <div className="progress mb-3">
                    <div className="progress-bar" role="progressbar" style={{width: `${quizProgress}%`}} aria-valuenow={quizProgress} aria-valuemin="0" aria-valuemax="100"></div>
                  </div>

                  </>
                )}

                <button type="submit" ref={submitBtnRef} disabled className='btn btn-primary float-end'>Submit</button>

              </div> 
            </form>

          </>
          )}

          {showResponse && (
            <>
            <div className={`card card-case-response ${showResponse.isCorrect ? 'card-case-response-correct' : ''}`}>
              
              <div dangerouslySetInnerHTML={sanitizedData(showResponse.response)} ></div>

              {(questions.length>1) && (

                // IF CORRECT THEN SHOW NEXT OTHERWISE SHOW GO BACK
                <div className='btnWrapper'>
                {showResponse.isCorrect 
                      ?( <button onClick={(e)=>nextQuestion(e)} className='btn btn-primary mt-4'>{(currentQuestionIndex===(questions.length-1)) ? "Complete": "Next"}</button>)
                      :( <button onClick={(e)=>clearCurrentResponse(e)} className='btn btn-primary mt-4'>Go back</button>)
                      }
                </div>

              )}



            </div>
            </>
          )}

        </div>

    

      </>
    
  )
}
