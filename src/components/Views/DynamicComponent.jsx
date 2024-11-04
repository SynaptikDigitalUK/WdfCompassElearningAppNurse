import PropTypes from 'prop-types';
import NextLessonBtn from './../NextLessonBtn'
import SectionTitleBtn from '../SectionTitleBtn'
DynamicComponent.propTypes = {
  content:PropTypes.object
}

export default function DynamicComponent({content}) {
  return (
    <>

    <div className='container ='>
    <SectionTitleBtn title={content.sectionTitle} link={content.sectionLink}></SectionTitleBtn>
    
    <div className='card'>
    
    <h3>{content.title}</h3>
    {content.image && (<div className='image-wrapper'><img src={content.image}  /> </div>)}
    <div>{content.body}</div>
    {content.videoUrl && (<div className='video-wrapper'><video src={content.videoUrl} controls></video></div>)}

</div>

    </div>




    <div className='badge bg-info my-3'>DynamicComponent</div>
    
    
    {/* IF HAS NEXT REF THEN SHOW NEXT LESSON BUTTON */}
     {content.nextRef &&(
      <NextLessonBtn link={content.nextRef} linkName={content.nextPageTitle}/>
    )} 


    </>


  )
}
