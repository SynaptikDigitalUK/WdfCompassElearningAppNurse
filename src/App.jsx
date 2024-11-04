import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Header from './components/Header'
import ChapterMenu from './components/ChapterMenu/ChapterMenu'
import Views from './components/Views/Views'

import { GlobalContext } from './components/GlobalContext';
import { Spinner } from 'react-bootstrap';
import Utils from './components/Utils';
import PDFViewer from './components/PDFViewerComponent';

import { pdfjs } from 'react-pdf';

function App() {
  let location = useLocation();

  const [homepageSection, setHomepageSection] = useState(  null )
  const [selectedViewHistory, setSelectedViewHistory] = useState(  [] )
  const [selectedViewChapter, setSelectedViewChapter] = useState(  undefined )
  const [selectedContentId, setSelectedContentId] = useState(  {id:''} )
  const [activePdfViewerFile, setActivePdfViewerFile] = useState(undefined)
  const [showSideMenu, setShowSideMenu] = useState( false)
  const [buildData, setBuildData] = useState(  null )
  const [jsonContent, setJsonContent] = useState(  null )
  const [loadingData, setLoadingData] = useState( true)

  const globalProps = { selectedContentId, setSelectedContentId, jsonContent,buildData, showSideMenu, setShowSideMenu, selectedViewHistory, activePdfViewerFile, setActivePdfViewerFile}


  //Configure PDF.js worker
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    '../js/pdfjs-dist/pdf.worker.mjs',
    import.meta.url,
  ).toString();


   //CALL EFFECT EVERYTIME THE "activePdfViewerFile" CHANGES
   // add / remove class to body to show / hide scrollbar
   useEffect(() => {
      
    if(activePdfViewerFile){
      document.body.classList.add('pdf-viewer-active')
    }else{
      document.body.classList.remove('pdf-viewer-active')
    }

   }, [activePdfViewerFile])

  //CALL EFFECT EVERYTIME THE "location" CHANGES
  useEffect(() => {
    
    if (jsonContent === null) {
      const fetchData = async () => {
        const configResponse = await fetch('assets/data/config.json').then(resp=>resp.json())
        const sectionPlaylist = configResponse.sections

        //loop through playlist and build promise array
        let sectionPlaylistPromises = []
        for (let i = 0; i < sectionPlaylist.length; i++) {
          sectionPlaylistPromises.push(
            fetch(`assets/data/${sectionPlaylist[i]}.json`).then(resp=>resp.json())
          )
        }

        //set up default central data array
        const parsedContentData = {
          menu:{
            title:configResponse.appTitle,
            limitDisplayLevels:configResponse.menuLimitDisplayLevels,
            sections:[]
          },
          content:[...configResponse.content],
          references:[]
        }

        // await all promises to complete
        const responses = await Promise.all(
          sectionPlaylistPromises
        )
        
        //load in sections loisted in playlist and append to central data array
        for (let d = 0; d < responses.length; d++) {
          const contentData = responses[d]//.json();
          parsedContentData.menu.sections.push(contentData.menu)
          parsedContentData.content.push(...contentData.content)
        }
        
        //load in references data
        const referencesResponse = await fetch('assets/data/references.json').then(resp=>resp.json())
        parsedContentData.references = referencesResponse.references;

        // store central data array global context 
        setJsonContent(parsedContentData)
        
        //load in build info data
        const buildInfoResponse = await  fetch('./buildinfo.json').then(resp=>resp.json())
        setBuildData(buildInfoResponse.info)


        // remove loading icon
        setLoadingData(false)

        processRoute(parsedContentData, location)
            
      };

      fetchData();
    }else{
      processRoute(jsonContent, location)
    }

  }, [location]);

  const processRoute = ((content, location)=>{
  
    setHomepageSection(  content.content.find(page=>page.id==='homepage') )

    const doesAnyHistoryEntryExist = location.key !== "default";
    if(doesAnyHistoryEntryExist){
      const trimmedPathName = location.pathname.replace(/\/section\//g, "")
      // const currentSelectedContentId = trimmedPathName.split('_').shift()
      if(trimmedPathName!=='/'){
        setSelectedViewHistory([...selectedViewHistory, trimmedPathName])
      }
    }

    //UPDATE GLOBAL "SelectedcontentId" VARIABLE
    const urlPathSplit = location.pathname.replace(/section\//g, "").split('/')
    urlPathSplit.shift()


    const urlSectionId = urlPathSplit[0]
    let urlContentId = urlPathSplit[0]
  
  
    const rootElement = document.getElementById('root');
    let currentChapter, currentSection;

    if(urlSectionId!=='references' && urlSectionId!=='help' && urlSectionId!=='terms'){

      //if url address has more than 1 path
      if(urlPathSplit.length>1){
        urlContentId = urlPathSplit[1]
      }
      
      setSelectedContentId({id:urlContentId})

      //if set
      const flattenedChapters = Utils.flatMapAlternative(content.menu.sections, (item) => item.chapters)
      if(urlContentId && (urlSectionId==urlContentId)){
        
        currentChapter =flattenedChapters
          .find(section=>section.chapterId===urlSectionId)

          currentSection = content.menu.sections
          .find(section=>section.sectionId===currentChapter.sectionId)

          currentChapter.sectionLink = ''
          currentChapter.sectionTitle = currentSection.title

          //inject casestudies content
          if(currentSection.learnMore?.casestudies){
            currentChapter.caseStudiesContent = content.content.filter( page => currentSection.learnMore.casestudies.map(i=>i.contentId).includes(page.id ))
          }
          
          //inject factsheets content
          if(currentSection.learnMore?.factsheets){
            currentChapter.factsheetsContent = content.content.filter( page => currentSection.learnMore.factsheets.map(i=>i.contentId).includes(page.id ))
          }
          
      }else{
        currentChapter = content.content.find(page=>page.id===urlContentId)

        const  currentMenuChapter = flattenedChapters
        .find(section=>section.chapterId===urlSectionId)

        if(currentChapter && currentChapter.content){
          currentChapter.content.sectionLink = currentMenuChapter.chapterId
          currentChapter.content.sectionTitle = currentMenuChapter.title
        
          
          //if path includes '/'
          let nextPage
          if(currentChapter.content.nextRef.includes('/')){

            //find next page component and set current chapter nextpage title to match
            let nextRefSplit = currentChapter.content.nextRef.split('/')
            //remove first option (..)
            nextRefSplit.shift()

            //remove empty options from list
            nextRefSplit = nextRefSplit.filter((a) => a);

            // if path is folder/topic
            if(nextRefSplit.length>1){
            
              //remove first option (folder)
              nextRefSplit.shift()

              //find next page based on topic id
              const flattenedChaptersExtra = Utils.flatMapAlternative(flattenedChapters, (chapter) => chapter.chapters)
              nextPage = flattenedChaptersExtra
              .find(section=>section.contentId===nextRefSplit[0])

            }else{

              // else path is folder
              //find next page based on folder id
              nextPage = flattenedChapters
                .find(chapter=>chapter.chapterId===nextRefSplit[0])
              }

          }else{

            //for example single topic - 'bbb3'
            //find next page component and set current chapter nextpage title to match
            const flattenedChaptersExtra = Utils.flatMapAlternative(flattenedChapters, (chapter) => chapter.chapters)
            nextPage = flattenedChaptersExtra
              .find(section=>section.contentId===currentChapter.content.nextRef)


          }
          
          if(nextPage){
            currentChapter.content.nextPageTitle = nextPage.title
          }

        }else{
          console.log('no currentChapter or currentChapter.content')
        }

      }
      setSelectedViewChapter (currentChapter )
    

      // if currentChapter has value means its not homepage
      // this adds a reference of current component type to the root element
      // use case - for css styling
      
      if(currentChapter){      

        //add current component name to data-component attribute on root element
        if(currentChapter.component){
          rootElement.setAttribute("data-component", currentChapter.component);
        }else{
          rootElement.setAttribute("data-component", 'ListingComponent');
        }
        
      }else{
          rootElement.setAttribute("data-component", 'HomePageComponent'); 
      }
  }else{
    
    if(urlSectionId==='help'){
      currentSection = {}
    }else{
      currentSection = Object.assign({}, content.references)
    }

    let compName ='' 
    if(urlSectionId==='help'){
      compName = 'HelpPageComponent'
    }else if(urlSectionId==='terms'){
      compName = 'TermsPageComponent'
    }else{
      compName = 'ReferencesPageComponent'
    }

    currentSection.sectionLink = ''
    rootElement.setAttribute("data-component", compName);

    setSelectedViewChapter (currentSection )
    
  }

     // AFTER EACH ROUTE CHANGE - SCROLL TO TOP OF PAGE
     document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });

  })
 
  return (
    <>
      {/*  ADD GLOBAL CONTENT - ALLOWING ALL ITEMS INSIDE, ACCESS TO ALL GLOBAL PROPS*/}
      <GlobalContext.Provider value={globalProps}>
      
      <div>
          
        {loadingData ?(
          <div className='spinnerWrapper'>
            <Spinner className='loadingSpinner me-2'></Spinner>
            <span>Loading...</span>
          </div>
        )
        :(
          <>
        
            {/* SIDE MENU */}
            <Offcanvas show={showSideMenu} backdrop={false} scroll={true} className="sidemenu">
              <Offcanvas.Body>
                <ChapterMenu isSideMenu={true}  ></ChapterMenu>
              </Offcanvas.Body>
            </Offcanvas>


        
            {/*  HEADER */}
            <Header title={jsonContent.menu.title} />


            {/*  MAIN VIEW AREA */}
            <div className="main-wrapper">
          
              {/*  ADD POSSIBLE URLS ROUTES SUPPORTED BY APP - ALL ROUTES SENT TO 'VIEWS' COMPONENT*/}
              <Routes>
                  <Route path="/" element={<Views content={homepageSection} />} contentId='homepage' />
                  <Route path="/section/:sectionId" element={  <Views content={selectedViewChapter}  contentId='listingPage'/> } />
                  <Route path="/section/:sectionId/:page" element={  <Views content={selectedViewChapter}  contentId={selectedContentId.id}/> } />
                  <Route path="/section/references" element={  <Views content={selectedViewChapter}  contentId='referencesPage'/> } />
                  <Route path="/section/help" element={  <Views content={selectedViewChapter}  contentId='helpPage'/> } />
                  <Route path="/section/terms" element={  <Views content={selectedViewChapter}  contentId='termsPage'/> } />
                  <Route path='*' element={<Views />} />        
              </Routes> 

            </div>
            </>
            )}
          </div>
          
          {/* if pdf viewer is active  */}
          {activePdfViewerFile &&( <PDFViewer /> )}

          </GlobalContext.Provider>

        </>
  )
}

export default App
