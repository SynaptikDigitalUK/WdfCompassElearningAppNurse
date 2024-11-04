import PropTypes from 'prop-types';
import { useState } from 'react';

import { useGlobalContext } from '../../GlobalContext';
import  SearchItem  from './SearchItem/SearchItem';
import Utils from '../../Utils';

SearchComponent.propTypes = {
  onSearchUpdate:PropTypes.func
}

export default function SearchComponent({onSearchUpdate}) {
  const { jsonContent } = useGlobalContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(  null )
  

  const filterSearchResults = (term)=>{
    const termLC = term.toLowerCase();

    let results =  jsonContent.content.filter(item => {
      const matched = (
        (item.content.title && item.content.title.toLowerCase().includes(termLC))
        ||
        (typeof item.content.intro ==='string' && item.content.intro && item.content.intro.toLowerCase().includes(termLC))
        ||
        (item.content.body && item.content.body.toLowerCase().includes(termLC))
      )
      
      return matched
      
    })

    // RE-MAP RETURN OBJECT
    results = results.map(item=>{
      return mapSearchItem(item)
    })

  return results
  }

  const mapSearchItem = (item)=>{


    const flattenedChapters = Utils.flatMapAlternative(jsonContent.menu.sections, (item) => item.chapters)
    const flattenedChaptersExtra = Utils.flatMapAlternative(flattenedChapters, (chapter) => chapter.chapters)
        
    let currentPage = flattenedChaptersExtra
    .find(section=>section.contentId===item.id)
    
      // IF NOT FOUND IN CHAPTERS THEN SEARCH IN CASESTUDIES
     if(!currentPage){

      const flattenedCasestudies = Utils.flatMapAlternative(jsonContent.menu.sections, (item) => item.learnMore.casestudies)
      currentPage = flattenedCasestudies
        .find(c=>c.contentId===item.id)

        // IF NOT FOUND IN CASESTUDIES THEN END SEARCH AND RETURN ITEM
        if(!currentPage){
          return item
        }
      }


      const currentChapter = flattenedChapters
      .find(section=>section.chapterId===currentPage.chapterId)

      const currentSection = jsonContent.menu.sections
      .find(section=>section.sectionId===currentChapter.sectionId)
  
    return {
      id : item.id,
      title : item.content.title,
      sectionTitle : currentSection.title,
      chapterTitle : currentChapter.title,
      chapterId :  currentChapter.chapterId
    }
        
  }

  const handleSearch = (e)=>{
    e.preventDefault()
    const term =  e.target.value || ''
    const response = (term) ?  filterSearchResults(term) : null
    

    setSearchTerm(term)
    setSearchResults(response)

    onSearchUpdate(!!term)
  }
  return (
    <>
        <div className='search'>
        
          {/* UPDATING THE SEARCH TERM WILL FIRE RESPONSES TO SHOW BELOW */}
          <div className="input-group search-form">
            <input type="text" className="form-control" id="inputPassword2" placeholder="Search" value={searchTerm}  onChange={e => handleSearch(e)} />
            {/* <button type="button" className="btn btn-primary">Search</button> */}
          </div>

          {searchResults && (

            <div className='card card-search-menu' >

              {/* CLOSE BTN WILL CLEAR SEARCH TERM */}
              <button id="search-btn-close" className="btn btn-close" role="button" onClick={(e)=>{handleSearch(e)}}>
                        <i><img src="assets/close.svg" /></i>
              </button>

              {!!searchResults.length &&(
                <span>{`${searchResults.length} results for "${searchTerm}"`}</span>
              )}

              {/* SHOW RESPONSE ITEMS */}
              {searchResults.map((item) => {
                return <SearchItem key={`search_${item.id}`} data={item} /> 
              })}

              {/* IF NO ITEMS ARE MATCHED THEN SHOW */}
              {!searchResults.length &&(
                <span>{`no results that match "${searchTerm}"`}</span>
              )}

            </div>
          )}

        </div>
    </>
  )
}