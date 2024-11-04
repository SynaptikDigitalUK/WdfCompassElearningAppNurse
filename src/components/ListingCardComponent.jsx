import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

ListingCardComponent.propTypes = {
    item:PropTypes.object,
    type:PropTypes.string,
    onViewPdf:PropTypes.func
}

export default function ListingCardComponent({item, type, onViewPdf}) {


  return (
    <>
    
    <div className='col-12 col-md-6 col-xl-6 col-xxl-6' key={`case_${item.content.title}`}>
              <div className='card card-cta align-items-end'style={{backgroundImage:"url("+item.content.image+")"}} >
                  <div className='card-body'>
                  <h2>{item.content.title}</h2>
                        <h4>{item.content.subTitle}</h4>
                        {type == 'case' 
                        ?( <Link to={`${item.id}`} className="btn btn-primary">Explore case</Link> )
                        :( 
                        // <a href={item.content.url} className="btn btn-primary btn-primary-dl" rel="noreferrer" target='_blank'>Download fact sheet (pdf)</a>
                        <button className="btn btn-primary btn-primary-dl" onClick={()=>onViewPdf({title:item.content.title, url:item.content.url})}>Download fact sheet (pdf)</button>
                      )
                        }
                        
                  </div>
              </div>
            </div>

    

    </>


  )
}
