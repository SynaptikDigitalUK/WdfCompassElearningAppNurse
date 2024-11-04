
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../GlobalContext';
import Utils from '../../Utils';

NavItem.propTypes = {
  item:PropTypes.object,
  isSideMenu:PropTypes.bool,
  currentLevel:PropTypes.number,
  limitDisplayLevels:PropTypes.number,
  showOpenMenuChapterId:PropTypes.string
}

export default function NavItem({item, isSideMenu, currentLevel, limitDisplayLevels, showOpenMenuChapterId}) {
  
  let navigate = useNavigate();
  const { setShowSideMenu, jsonContent, setActivePdfViewerFile } = useGlobalContext()
  

  const handleNavClick = (e, item)=>{
    e.preventDefault();
    e.stopPropagation()
    
    
    if(item.chapterId){
      
      //close sidemenu
      setShowSideMenu(false)

      const url =`/section/${item.chapterId}`;
      navigate(url)
    }

  }

  const handleLearnMoreNavClick = (e, sectionId,  item, type)=>{
    e.preventDefault();
    e.stopPropagation()
    

    //close sidemenu
    setShowSideMenu(false)

    //IF CASE THEN NAVIGATE TO NEW SECTION
    if(type == 'case'){
      const url =`/section/${sectionId}/${item.contentId}`;
      navigate(url)
      
    //IF FACTSHEET THEN FIND ORIGNAL CONTENT AND OPEN URL IN WINDOW
    }else{
      const matchedRes = jsonContent.content.find(res=>res.id===item.contentId)
      
      if(matchedRes)
      
      
      //  window.open(matchedRes.content.url, '_blank')
      setActivePdfViewerFile({title:item.title, url:matchedRes.content.url})



    }

  }

  return (
    <>

   <li className={`item-wrapper ${isSideMenu ? '' : 'card card-course-menu'}`}>
        
 
        {/* IF HAS CHAPTERS / CHILDREN */}
        {item.chapters && (
                
                <>
                    {/*  data-bs-target for opening collapse div "id" */}
                    <button className="btn btn-toggle collapsed text-start" data-bs-toggle="collapse" aria-expanded="false" data-bs-target={`#${isSideMenu ? 'sidemenu' : 'homemenu'}-collapse_${Utils.removeUnsafeChars(item.title)}`}
                    onClick={ (e)=>handleNavClick(e, item)}
                    >
                        <h4>{item.title}</h4>
                    </button>
                
                    {/* limitDisplayLevels is set in content.json */}
                    {/* if limitDisplayLevels > 0 then restrict recursive-ness */}
                    {/* if limitDisplayLevels == 0 then menu will be fully recursive */}
                    {(!limitDisplayLevels || (limitDisplayLevels && currentLevel<limitDisplayLevels)) &&(
                      
                      <>
                      {/*  collapse div id */}
                      
                      <div  id={`${isSideMenu ? 'sidemenu' : 'homemenu'}-collapse_${Utils.removeUnsafeChars(item.title)}`}>
                      
                      </div>
                      
                      {/* if showOpenMenuChapterId matches current section id then pre-open that section */}
                      <div className={`collapse ${showOpenMenuChapterId===item.sectionId ? 'show' : ''}`} id={`${isSideMenu ? 'sidemenu' : 'homemenu'}-collapse_${Utils.removeUnsafeChars(item.title)}`}>
                          <ul>
                              {item.chapters.map((subItem, index) => (
                                  <NavItem key={`${Utils.removeUnsafeChars(subItem.title)}-${index}`} item={subItem} currentLevel={currentLevel+1} limitDisplayLevels={limitDisplayLevels} />
                              ))}

                          </ul>

                          
                          {
                          !!(item.learnMore 
                          &&(
                              ( item.learnMore.caseStudies?.length) ||
                              ( item.learnMore.factsheets?.length)
                            )
                          )
                          && (
                        <>
                         

                        
                          <div>
                            <p className='tagline-text headline ps-3 mt-4'>LEARN MORE - </p>

                            <ul>
                            
                            {item.learnMore.casestudies.map((caseStudy) => (
                              <li key={caseStudy.contentId} className="item-wrapper card card-course-menu">

                                <button className="btn btn-toggle collapsed text-start" onClick={ (e)=>handleLearnMoreNavClick(e, caseStudy.chapterId,caseStudy, 'case')}>
                                  <h4>{caseStudy.title}</h4>
                                </button>
                              </li> 
                             
                            ))}

                            {item.learnMore.factsheets.map((fact) => (
                            
                             <li key={fact.contentId} className="item-wrapper card card-course-menu">
                                <button className="btn btn-toggle collapsed text-start" onClick={ (e)=>handleLearnMoreNavClick(e, item.sectionId, fact, 'pdf')}>
                                  <h4>{fact.title}</h4>
                                </button>
                              </li> 
                            
                            ))}

                             

                            </ul>
                          </div>
                         
                        </>
                      )}


                    

                    </div>

                    </>
                    )}


                      
                      
                </>
           

        )}

        {/* IF DONT HAS CHAPTERS / CHILDREN */}
        {/* SO IS ENDPOINT */}
        {!item.chapters && (
        
        <>

            {/*  this gets translated to be href link - ("to" equals "href" )  */}
            <Link className='nav-course-page' to={`section/${item.chapterId}/${item.contentId}`}> {item.title } </Link>

        </>
        )}

      </li>

    </>
  )
}


