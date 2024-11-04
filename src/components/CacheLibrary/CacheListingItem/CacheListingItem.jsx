import PropTypes from 'prop-types';

CacheListingItem.propTypes = {
  content:PropTypes.object,
  onAssetLoaded:PropTypes.func
}

export default function CacheListingItem({onAssetLoaded, content}) {

  return (
    <>
<div className='d-flex align-items-center justify-content-between'>
      <div className='d-flex align-items-center mb-2'>
        <div className='cache-img-wrapper'>
          
          {/* if not PDF or MP4 then must be image */}
          {(!content.url.includes('mp4') && !content.url.includes('pdf')) &&(
            <img src={content.url} onLoad={(e)=>onAssetLoaded(e.target)} />
          )} 

          {content.url.includes('mp4') &&(
           <video src={content.url} onLoadedData ={(e)=>onAssetLoaded(e.target)} />
          )} 

          {content.url.includes('pdf') &&(
            <i className='fa fa-file-pdf fa-2x mb-2'></i>
          )} 

          
          
          </div> 
        <span className='ms-2'>url: {content.url}</span>
      </div>
      <span className={ `ps-2 flex-shrink-0 ${content.loaded ? 'text-success' : 'text-danger'} `}>
        {content.loaded ? 'loaded' : 'not loaded'}
      </span>
      
      </div>        
                  

    </>


  )
}
