import { useCallback, useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useGlobalContext } from './GlobalContext';

import 'react-pdf/dist/Page/TextLayer.css';
import { Spinner, ProgressBar } from 'react-bootstrap';
import {deviceDetect} from "react-device-detect"


const PDFViewer = () => {
    
    const [numPages, setNumPages] = useState();
    const [pdfLoadPercent, setPdfLoadPercent] = useState(0);
    const { activePdfViewerFile, setActivePdfViewerFile } = useGlobalContext()

    // handle when pdf file is loaded
    //set state - number of pages 
     const onDocumentLoadProgress = ({loaded, total} )=> {

        //get min of 100 or percentage of loaded/total * 100
      let progress = Math.min(Math.round(loaded/total * 100), 100)

      // if progress is 100 reset progress to 0
      if(progress>=100){
        progress = 0 
      }
      setPdfLoadPercent(progress )



    }
    // handle when pdf file is loaded
    //set state - number of pages 
     const onDocumentLoadSuccess = ({ numPages })=> {
      setNumPages(numPages);
      setPdfLoadPercent(0)

    }
    // handle if pdf file fails to load
    const onDocumentLoadError = ( error )=> {
       console.log('onDocumentLoadError', error);
       setPdfLoadPercent(0);
      }

      // close PDF viewer
      const closePDFViewer = (  )=> {
       setActivePdfViewerFile(undefined)
      }

      const [isDeviceIPhone7, setIsDeviceIPhone7] = useState(false);

      // update state with window width
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);
      const getWindowWidth = useCallback(() => setWindowWidth(window.innerWidth), []);

      // Listen for window resize events
      useEffect(() => {

        if(deviceDetect().model =='iPhone' && parseInt(deviceDetect().osVersion)<=15){
          console.log("device likely to be iPhone running ios 15 or less") // gives object shown in image below
          setIsDeviceIPhone7(true)
        }


        window.addEventListener("resize", getWindowWidth);
        return () => {
          window.removeEventListener("resize", getWindowWidth);
        };
      })

  
    return (
      <div className='PDFViewer'>
        <div className='header'>
            {/* {activePdfViewerFile.title} */}
            <a href={activePdfViewerFile.url} className="btn download-btn" download><i className="fas fa-arrow-to-bottom"></i> View file</a>
            <div className='nav-controls'>
              <button className="btn close-btn" onClick={closePDFViewer}><i ><img src="assets/close.svg" /></i></button>
            </div>
        </div>
        
        <div>
         
         {/* if pdfLoadPercent > 0 than show loading */}
          {pdfLoadPercent>0 &&(
            <div className='spinnerWrapper'>
              <Spinner className='loadingSpinner me-2'></Spinner>
              <span>Loading file...</span>
              <div className='progressbar-container'>
                  <ProgressBar now={pdfLoadPercent} />
              </div>
              <span>{pdfLoadPercent}%</span>
            </div>
          )}


        </div>

        {/* create pdf document container */}
        {/* activePdfViewerFile.url:{activePdfViewerFile.url} */}
        {/* isDeviceIPhone7:{JSON.stringify(isDeviceIPhone7)} */}

        {/* If device is iphone 7 then show iframe view - pdf viewer not going to render otherwise */}
        {isDeviceIPhone7 && (
          <iframe src={activePdfViewerFile.url} title="PDF Viewer" className="pdf-document-iframe" />
        )}


        {/* If device is not iphone 7 then redner using pdf viewer magic */}
        {!isDeviceIPhone7 &&(
          <>
          <div className='pdf-viewer-prompt'>Note: after clicking <strong>view file</strong>, swipe right on iOS device or switch back to installed app on Android to continue.</div>

          <Document file={activePdfViewerFile.url} loading='' on onLoadProgress={onDocumentLoadProgress} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentLoadError} className="pdf-document">

          {/* Loop though all pages - create page */}
          {Array.from( new Array(numPages), (el, index) => (

            <Page 
              key={`page_${index + 1}`}
              pageNumber={index + 1} 
              width={Math.min(windowWidth * 0.9, 800)} // width: 90vw; max-width: 400px
              className="pdf-page"  
              renderAnnotationLayer={false} 
              />

            ),
          )}


        </Document>
        
        </>

        )}
        

        
      
      </div>
    );

};


export default PDFViewer;