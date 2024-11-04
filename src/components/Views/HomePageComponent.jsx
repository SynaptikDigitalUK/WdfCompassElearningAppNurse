import PropTypes from 'prop-types';
import ChapterMenu from './../ChapterMenu/ChapterMenu'

HomePageComponent.propTypes = {
  content:PropTypes.object
}

export default function HomePageComponent({content}) {


  return (
    <>
   

<div className='hero-homepage' style={{backgroundImage:"url("+content.imageUrl+")"}}>
   
    <div className='logo-wrapper'>
      <div className='logo'><img src="assets/logo.svg"  /></div>
    </div>
    
    <div className='container'>
    <div className='title-wrapper'>
      <p className='title'>{content.title}</p>
      <p className='sub-title'>{content.subTitle}</p>
    </div>
    {/* <button className='btn btn-primary btn-primary-play'>{content.videoAction}</button> */}
    </div>

</div>


    <div className='container'>

    <div className="homepagemenu">
      <ChapterMenu  isSideMenu={false}></ChapterMenu>
    </div>


    </div>


 
    </>


  )
}
