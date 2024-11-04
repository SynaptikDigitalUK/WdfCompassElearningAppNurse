import { useEffect, useRef, useState } from 'react';
import Utils from '../Utils';
import { ProgressBar, Spinner } from 'react-bootstrap';
import CacheListingItem from './CacheListingItem/CacheListingItem';

const CacheLibrary = () => {


    const [assetDetailsShown, setAssetDetailsShown] = useState(true);
    const [assetTotalItems, setAssetTotalItems] = useState(0);
    const [assetLoadedItems, setAssetLoadedItems] = useState(0);
    const [assetLoadingInProgress, setAssetLoadingInProgress] = useState(true);
    const [assetLoadPercent, setAssetLoadPercent] = useState(0);
    const [imageList, setImageList] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const [pdfList, setPdfList] = useState([]);
    
    const intervalRef = useRef();
  
    let intialCacheChecked = false


    useEffect(() => {
        
        if(intialCacheChecked){
          return
        }
    
    
        const fetchDataAsync = async () => {
          const assetGroups = await fetchData();
          console.log('assetGroups', assetGroups)
        }
    
        
        fetchDataAsync();
        
      
        intialCacheChecked = true
    
      },[])
    
      const handleCancelClick = () => {
        clearInterval(intervalRef.current);
      }
    
    
      useEffect(() => {
        if(imageList.length > 0){
          // This code will run after every render, 
          // similar to a callback after state is updated
          checkCache();
          triggerInterval();
        }
        
        //TEAR DOWN THE INTERVAL - IF EXISTS
        return () => {
          if(intervalRef.current){
            clearInterval(intervalRef.current);
          }
        }
       
      }, [imageList, videoList, pdfList]); 
    
    
    const triggerInterval = () => {
    
      handleCancelClick()
    
      setAssetLoadingInProgress(true)
    
      const id = setInterval(() => {
               
        checkCache()
        
      }, (1000 * 10) );
      
      intervalRef.current = id;
    
    
    }
        
      const fetchData = async () => {
        
    
        const configResponse = await fetch('assets/data/config.json').then(resp=>resp.json())
        const sectionPlaylist = configResponse.sections
    
        //loop through playlist and build promise array
        let sectionPlaylistPromises = []
        for (let i = 0; i < sectionPlaylist.length; i++) {
          sectionPlaylistPromises.push(
            fetch(`assets/data/${sectionPlaylist[i]}.json`).then(resp=>resp.json()).catch(err=>console.error('section data not found', err))
          )
        }
    
       
    
        // await all promises to complete
        const responses = await Promise.all(
          sectionPlaylistPromises
        )
        let images = []
    
        //load in sections loisted in playlist and append to central data array
        for (let d = 0; d < responses.length; d++) {
          const contentData = responses[d]//.json();
    
          for (let res = 0; res < contentData.content.length; res++) {
            
            //images regex
            const image_regex = RegExp(`assets/[^'"]+`,`gm`);
            const match =  JSON.stringify(contentData.content[res].content).replace(/[\\]/g, "").match(image_regex)
            if (match){
    
              images.push( ... match)
            }
    
          }
    
        }
    
        var unique_items = images.filter(Utils.onlyUnique);    
        var unique_images = unique_items.filter(item=>item.includes('.png')||item.includes('.jpg'));
    
        unique_images = unique_images.map(item=>{ 
          return {
            url:item,
            loaded:false
          }
        })
        setImageList(unique_images)
        
    
        var unique_videos = unique_items.filter(item=>item.includes('.mp4'));
        unique_videos = unique_videos.map(item=>{ 
          return {
            url:item,
            loaded:false
          }
        })
        setVideoList(unique_videos)
       
        var unique_pdfs = unique_items.filter(item=>item.includes('.pdf'));
        unique_pdfs = unique_pdfs.map(item=>{ 
          return {
            url:item,
            loaded:false
          }
        })
        setPdfList(unique_pdfs)
    
        return {unique_images, unique_videos, unique_pdfs}
      }
    
          
      const updateAssetLoaded = ()=>{}
    
      const checkCache = async () => {
    
        let existingImageListCache = imageList
        let existingVideoListCache = videoList
        let existingPdfListCache = pdfList
    
        if ('caches' in window) {
          const cacheName = `compass-elearning-nurse-precache-v2-${window.location.origin}/`;
          const has_asset_cache = await caches.has(cacheName)
          console.log('has_asset_cache', has_asset_cache)
    
          const asset_cache = await caches.open(cacheName);

          const asset_cache_keys= await asset_cache.keys()
                
          if(!asset_cache_keys.length){
            clearInterval(intervalRef.current);
            setAssetLoadingInProgress(false)
            return 
          }
          // loop through images and check if they are in cache
          if(existingImageListCache && existingImageListCache.length > 0){
            for (let i = 0; i < existingImageListCache.length; i++) {
              const checkUrl = '/'+existingImageListCache[i].url
              const imageResponse = await asset_cache.match(checkUrl,{ignoreSearch:true});
              if(imageResponse){
                existingImageListCache[i].loaded = true
              }
            }
          }
    
    
          // loop through videos and check if they are in cache
          if(existingVideoListCache && existingVideoListCache.length > 0){
            for (let i = 0; i < existingVideoListCache.length; i++) {
              const checkUrl = '/'+existingVideoListCache[i].url
              const videoResponse = await asset_cache.match(checkUrl,{ignoreSearch:true});
              if(videoResponse){
                existingVideoListCache[i].loaded = true
              }
            }
          }
    
    
           // loop through pdfs and check if they are in cache
           if(existingPdfListCache && existingPdfListCache.length > 0){
            for (let i = 0; i < existingPdfListCache.length; i++) {
              const checkUrl = '/'+existingPdfListCache[i].url
              const pdfResponse = await asset_cache.match(checkUrl,{ignoreSearch:true});
              if(pdfResponse){
                existingPdfListCache[i].loaded = true
              }
            }
          }
    
    
        
        }else{
          clearInterval(intervalRef.current);
        }
    
        updateLoadStatus(existingImageListCache, existingVideoListCache, existingPdfListCache)
        setImageList(existingImageListCache)
        setVideoList(existingVideoListCache)
        setPdfList(existingPdfListCache)
      
      };
    
    
      const updateLoadStatus = (existingImageListCache=0, existingVideoListCache=null, existingPdfListCache=null) => {
      
        const  totalSumLoadedItems = existingImageListCache.filter(item=>item.loaded).length  + existingVideoListCache.filter(item=>item.loaded).length + existingPdfListCache.filter(item=>item.loaded).length 
        const totalSumItems = existingImageListCache.length + existingVideoListCache.length  + existingPdfListCache.length
      
        setAssetTotalItems( totalSumItems)
        setAssetLoadedItems( totalSumLoadedItems)
    
    
        const percentLoaded = Math.ceil((totalSumLoadedItems /     totalSumItems)*100)
        setAssetLoadPercent( percentLoaded)
      
        // percentLoaded = 100 then clear interval
        if(percentLoaded===100){
          clearInterval(intervalRef.current);
          setAssetLoadingInProgress(false)
        }
    
      }

  return (
    <>
    
    
            
            <p>The details below are an indication of which asset files have been saved to device memory, ready to be used offline. Once complete you will be able to use this app without an internet connection.</p>

            <div className='d-flex justify-content-end'>
              {( assetLoadPercent < 100 || assetLoadingInProgress) && (
                <button className="btn btn-primary p-2" onClick={checkCache}>Refresh view</button>
              )}

            </div>


            <div className='cache-list-callout'>
              
              <div className='d-flex align-items-center justify-content-between pt-1 pb-3'>
                <h5 className='mb-0'>Percentage saved ({assetLoadPercent ? assetLoadPercent+'%' : '-'})</h5>
                  
            {( assetLoadingInProgress) && (
              <Spinner className='loadingSpinner'></Spinner>
            )}
            {( assetLoadPercent >= 100 && !assetLoadingInProgress) && (
              <h5 className='text-success mb-0'><i className='fas fa-check me-2'></i>Ready to use offline</h5>
            )}
                  
              </div>

              <ProgressBar now={assetLoadPercent} /> 
             
              
              <div className='mt-3  '>
                <div className='d-flex align-items-center justify-content-between'>
              <h5 className='mb-0'>Number of assets saved: {assetLoadedItems}/{assetTotalItems}</h5>
              
              <button className="px-0 btn btn-toggle collapsed text-start" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="sidemenu-collapse"
                    onClick={ ()=>setAssetDetailsShown(!assetDetailsShown)} >
                        <h4>{assetDetailsShown ? 'hide' : 'show'} details
                          <i className={`ms-2 fa ${assetDetailsShown ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                        </h4>
                    </button>
                    </div>
                    <div className='asset-list'>
            { assetDetailsShown && (
              
              <>
              <p className='mt-3'>Images</p>
              <div>
                {imageList.map((item, index) => {return (
                   <CacheListingItem  key={`image_${index}`} content={item} onAssetLoaded={(e)=>updateAssetLoaded(e ,'img')} />
                  )}
                )}
                </div>
                </>
            )}

            { assetDetailsShown && (
               <>
            <p className='mt-3'>Videos</p>
            <div>
              {videoList.map((item, index) => {return(
                 <CacheListingItem  key={`video_${index}`}  content={item} onAssetLoaded={(e)=>updateAssetLoaded(e,'video')} />
                )}
              )}
              </div>
                </>

            )}

            { assetDetailsShown && (
              <>

            <p className='mt-3'>Factsheets</p>
            <div>
              {pdfList.map((item, index) => {return(
                 <CacheListingItem  key={`pdf_${index}`}  content={item} />
                
              )}
            )}
            </div>
            </>

        )}

          </div>
          </div>
          </div>
    
    </>
  )
}

export default CacheLibrary
