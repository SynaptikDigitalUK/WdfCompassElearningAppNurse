import PropTypes from 'prop-types';
import SectionTitleBtn from '../SectionTitleBtn'

ReferencesPageComponent.propTypes = {
  content:PropTypes.object
}

export default function ReferencesPageComponent({content}) {


  const sanitizedData = (html) => ({
    // __html: DOMPurify.sanitize(data)
    __html: html
  })


  

  return (
    <>
  
  <div className='content-wrapper'>

  <div className='container container-references-content'>

  <SectionTitleBtn title={content.sectionTitle} link={content.sectionLink} active={false}></SectionTitleBtn>
<h1>{content.title}</h1>

  {content.referenceList?.map((chapter) => {
    return (
      < div key={`chapter_${chapter.chapterId}`}>
      <h3>Chapter: {chapter.chapterId}</h3>


      <ul className='list-unstyled nav-wrapper'>
      <>
          { chapter.references?.map((item, index) => {
            return (
                <li key={`ref_${index}`} className="card-topic-wrapper reference">
                      <div dangerouslySetInnerHTML={sanitizedData(item.reference)}></div>
                </li>
              )
          }) 
          }
          </>     
      </ul>

      </ div>
      )}
  )}

 
  
  </div> 


    </div>

    </>


  )
}
