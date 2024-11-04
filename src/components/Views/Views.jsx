import PropTypes from 'prop-types';

import ListingComponent from './ListingComponent'

//import all views from 'views' folder
import BasicComponent from './BasicComponent'
import DuoImageComponent from './DuoImageComponent'
import DynamicComponent from './DynamicComponent'
import HomePageComponent from './HomePageComponent'
import HtmlComponent from './HtmlComponent'
import MCQComponent from './MCQComponent'
import MiniCaseComponent from './MiniCaseComponent'
import CaseComponent from './CaseComponent'
import ReferencesPageComponent from './ReferencesPageComponent';
import HelpPageComponent from './HelpPageComponent';
import TermsPageComponent from './TermsPageComponent';

Views.propTypes = {
  content:PropTypes.object,
  contentId:PropTypes.string
}

// this is full list of available (views) component templates
const Components = {
  BasicComponent: BasicComponent,
  DuoImageComponent: DuoImageComponent,
  DynamicComponent: DynamicComponent,
  HomePageComponent: HomePageComponent,
  HtmlComponent: HtmlComponent,
  MCQComponent: MCQComponent,
  MiniCaseComponent: MiniCaseComponent,
  CaseComponent: CaseComponent
  //add new component here to allow view be availble

};
const RenderListingView = (item)=>{
  return <ListingComponent  content={item} />
}
const RenderReferencesView = (item)=>{
  return <ReferencesPageComponent  content={item} />
}

const RenderHelpView = (item)=>{
  return <HelpPageComponent  content={item} />
}

const RenderTermsView = (item)=>{
  return <TermsPageComponent  content={item} />
}

const BuildComponentView = (item)=>{
  const ComponentName = Components[item.component];
  return <ComponentName  content={item.content} />
}

const ComponentViewNotFound = (item, contentId)=>{
  console.log('ComponentViewNotFound', item, contentId)
  return ( 
    <p>The component {(item ) ? item.component : contentId} - {contentId} has not been created yet.</p>
    )
}

export default function Views({content, contentId}) {
  
  return (
    <>
      {/* only proceed if content has a value */}
      {content && (
        (Object.prototype.hasOwnProperty.call(content, 'id') && typeof Components[content.component] !== "undefined") 
        ?(<> {BuildComponentView(content)} </>)
        :(<> 
            
            {(contentId=="listingPage" )
            ?<>{RenderListingView(content)}</>
            :<>
            
                  {(contentId=="referencesPage" )
                  // if contentId is referencesPage, render ReferencesPageComponent
                  ?<>{RenderReferencesView(content)}</>
                  :<>
                  
                    {(contentId=="helpPage" )
                    // if contentId is helpPage, render HelpPageComponent
                    ?<>{RenderHelpView()}</>
                    :<>
                    
                      {(contentId=="termsPage" )
                      // if contentId is TermsPage, render TermsPageComponent
                      ?<>{RenderTermsView()}</>
                      :<>
                        {/* // if contentId is not any of the above, render ComponentViewNotFound */}
                        {ComponentViewNotFound(content, contentId)} 
                      </>
                      }
                    
                    </>
                    }

                  </>
                  }
            </>
            }
            
            
          </> 
        )
      )}  


   
    </>

  )
}
