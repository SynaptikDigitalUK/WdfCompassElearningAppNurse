
import PropTypes from 'prop-types';
import { useGlobalContext } from '../GlobalContext';
import NavItem from './NavItem/NavItem.jsx';
import SearchComponent from './SearchComponent/SearchComponent.jsx';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Utils from '../Utils.jsx';

ChapterMenu.propTypes = {
  isSideMenu:PropTypes.bool
}

export default function ChapterMenu({isSideMenu}) {
  const { jsonContent, buildData } = useGlobalContext()
  const { showSideMenu, setShowSideMenu } = useGlobalContext()
  const { selectedViewHistory } = useGlobalContext()
  
  const [ searchMode, setSearchMode ] = useState(false)
  const [ previousRouteChapterId, setPreviousRouteChapterId ] = useState('')

  useEffect(() => {
   
      console.log('selectedViewHistory >>', selectedViewHistory)
      if(selectedViewHistory.length>0){
      
        const currentRouteChapterId = selectedViewHistory[selectedViewHistory.length-1].split('_').shift()
        setPreviousRouteChapterId(currentRouteChapterId)
      }

  }, [selectedViewHistory])

  return (
    <>

    <div id={`${isSideMenu ? 'sidemenu-content' : 'homepagemenu-content'}`} className={`${isSideMenu ? 'sidemenu' : 'homepagemenu'}-content`}>
      {isSideMenu &&(
        <>
          <button className="btn btn-close"  role="button" onClick={()=>{setShowSideMenu(!showSideMenu)}}>
                    <i ><img src="assets/close.svg" /></i>
          </button>


          <p className='tagline-text headline'>{jsonContent.menu.title}</p>
        </>
      )}
      <div className="flex-grow-1 px-0 ">

      
        <>
          <SearchComponent onSearchUpdate={(e)=>setSearchMode(e)}/>
        </>
      

      <ul className='list-unstyled nav-wrapper'>
        
        {isSideMenu &&(
          // SHOW HOME BUTTON - ONLY IF SIDE MENU
          <li className="home item-wrapper" ><Link to={'/'} onClick={()=>setShowSideMenu(false)}>Home</Link></li>
        )}

        {jsonContent.menu.sections.map((item) => {
          // LOOP ALL SECTIONS IN MENU AND SHOW NAV ITEM
          return <NavItem key={`${Utils.removeUnsafeChars(item.title)}`} item={item} isSideMenu={isSideMenu} currentLevel={1} limitDisplayLevels={jsonContent.menu.limitDisplayLevels} showOpenMenuChapterId={previousRouteChapterId} />  ;
        })}

        <li className="references item-wrapper card card-course-menu" ><Link to={'/section/references'} onClick={()=>setShowSideMenu(false)}><h4>References</h4></Link></li>
        <li className="terms item-wrapper card card-course-menu" ><Link to={'/section/terms'} onClick={()=>setShowSideMenu(false)}><h4>Terms and conditions</h4></Link></li>
        <li className="help item-wrapper card card-course-menu" ><Link to={'/section/help'} onClick={()=>setShowSideMenu(false)}><h4>Instructions for offline access</h4></Link></li>
      </ul>

      <div className='disclaimer small mt-5'>
      <strong>Disclaimer for healthcare professional </strong><br/>
      2024© World Diabetes Foundation. All rights reserved. This app is developed for use by healthcare providers only and is intended to provide information about diabetes prevention and management. It should not replace your clinical judgement as a healthcare professional. The opinions expressed do not necessarily reflect those of the World Diabetes Foundation (WDF) or International Medical Press (IMP). The WDF or IMP assume no liability for any material contained herein.
      </div>
    
      {searchMode &&(
        <div className='search-mode-cover'></div>
      )}

  </div>


  {/* selectedPath:{JSON.stringify(selectedPath) } */}



  {(buildData  && isSideMenu) &&(
    <footer>
      <span className='me-2 pe-2'>v: {buildData.version}</span>
    </footer>
  )}
  </div>
    </>
  )
}


