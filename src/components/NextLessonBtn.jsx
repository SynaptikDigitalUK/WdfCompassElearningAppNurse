import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

NextLessonBtn.propTypes = {
  link:PropTypes.string,
  linkName:PropTypes.string
}

export default function NextLessonBtn({link, linkName}) {
  return (
    <div className='container-fluid containerfooter-nav'>
    <div className='container '>
      <Link to={`./../${link}`} className="btn btn-next-lesson" role="button">
          <div>
            <p className='footer-nav-text'>
            NEXT TOPIC: {linkName}
            </p>

            </div>
          <div className='chevron-svg'> <img src="assets/chevron-down.svg" /> </div>
      </Link>
    
    </div>
    
    </div>


  )
}
