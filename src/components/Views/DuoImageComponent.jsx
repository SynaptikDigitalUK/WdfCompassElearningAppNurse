import PropTypes from 'prop-types';
import NextLessonBtn from '../NextLessonBtn'
import SectionTitleBtn from '../SectionTitleBtn'
DuoImageComponent.propTypes = {
  content:PropTypes.object
}

export default function DuoImageComponent({content}) {


  const sanitizedData = (type) => ({
    // __html: DOMPurify.sanitize(data)
    __html: content[type]
  })


  return (
    <>
    
  <div className='content-wrapper'>

 
  <div className='container container-course-content'>

    <div className='card'>
    <SectionTitleBtn title={content.sectionTitle} link={content.sectionLink}></SectionTitleBtn>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={sanitizedData('intro')} ></div>
      {content.introImage && (<div className='image-wrapper-case-study'><img src={content.introImage}  /> </div>)}
      <div dangerouslySetInnerHTML={sanitizedData('body')} ></div>
      {content.image && (<div className='image-wrapper'><img src={content.image}  /> </div>)}
      {content.videoUrl && (<div className='video-wrapper'><video src={content.videoUrl} controls></video></div>)}
      <div>{content.action}</div>
    </div>

    {/* <div className='badge bg-info my-3'>DuoImageComponent</div> */}
    

    </div>

    </div>

    {/* IF HAS NEXT REF THEN SHOW NEXT LESSON BUTTON */}
    {content.nextRef &&(
      <NextLessonBtn link={content.nextRef} linkName={content.nextPageTitle}/>
    )} 

    </>


  )
}
