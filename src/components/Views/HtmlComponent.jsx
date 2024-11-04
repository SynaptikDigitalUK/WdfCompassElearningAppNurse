import PropTypes from 'prop-types';
import NextLessonBtn from './../NextLessonBtn'
import SectionTitleBtn from '../SectionTitleBtn'
HtmlComponent.propTypes = {
  content:PropTypes.object
}

export default function HtmlComponent({content}) {


  const sanitizedData = () => ({
    // __html: DOMPurify.sanitize(data)
    __html: content.body
  })


  return (
    <>
      <div className='content-wrapper xx'>
        <div className='container container-course-content'>



          <div className='card'>
            <SectionTitleBtn title={content.sectionTitle} link={content.sectionLink}></SectionTitleBtn>

            <h1>{content.title}</h1>

            <div dangerouslySetInnerHTML={sanitizedData('body')} />
          </div>
        </div>
      </div>
    
    
      {/* IF HAS NEXT REF THEN SHOW NEXT LESSON BUTTON */}
      {content.nextRef &&(
        <NextLessonBtn link={content.nextRef} linkName={content.nextPageTitle}/>
      )} 


    </>


  )
}
