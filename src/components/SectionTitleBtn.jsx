import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

SectionTitleBtn.propTypes = {
  link:PropTypes.string,
  title:PropTypes.string,
  active:PropTypes.bool
}

export default function SectionTitleBtn({link, title, active=true}) {


  return (
    <p className='tagline-text headline'>
      {active 
      ?(
        <>
          {/* pass state object when using back button, so main menu will open at that section */}
          <Link to={`./../../${link}`} role="button " className='btn btn-section-title'>
            {title}
          </Link>
        </>
      )
      :(
        <>{title}</>
      )
      }

    </p>        
    
    


  )
}
