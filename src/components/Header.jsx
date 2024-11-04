import PropTypes from 'prop-types';
import { useGlobalContext } from './GlobalContext';

Header.propTypes = {
  title:PropTypes.string
}

export default function Header({title}) {

  const { setShowSideMenu } = useGlobalContext()


  return (
    <header className='fixed-top'>
      <div className=' container'>
      <button className="btn"  role="button" onClick={(e)=>{setShowSideMenu(true)}}>
          <i>
            <img src="/assets/menu.svg"/>
          </i>
      </button>
      </div>



    </header>
  )
}
