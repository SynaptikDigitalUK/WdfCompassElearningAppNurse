import { createContext, useContext } from "react";
import PropTypes from 'prop-types';

export const GlobalContext = createContext({
//  
})

  GlobalContext.propTypes = {
    
    showSideMenu:PropTypes.object,
    setShowSideMenu:PropTypes.func,
    
    jsonContent:PropTypes.object,
    buildData:PropTypes.object,

    selectedContentId:PropTypes.string,
    setSelectedContentId:PropTypes.func,
    
    selectedViewHistory:PropTypes.array,
    setSelectedViewHistory:PropTypes.func,
    

    activePdfViewerFile:PropTypes.object,
    setActivePdfViewerFile:PropTypes.func,
    

  }


  export const useGlobalContext  = () => useContext(GlobalContext)
