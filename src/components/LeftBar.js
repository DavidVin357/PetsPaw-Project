import { Link } from 'react-router-dom'
import './LeftBar.css'
import logo from '../images/logo.svg'
import voting from '../images/vote-table.svg'
import breeds from '../images/pet-breeds.svg'
import gallery from '../images/images-search.svg'
import Task from './Task'

const LeftBar = () => {
  return (
    <div className='leftContainer'>
      <div className='leftContent'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <div className='logo'>
            <img alt='logo' src={logo} />
          </div>
        </Link>
        <div className='leftMainContent'>
          <h1 style={{ color: '#1D1D1D', marginBottom: '10px' }}>Hi intern!</h1>
          <p style={{ color: '#8C8C8C' }}>Welcome to MSI 2021 Front-end test</p>
          <p style={{ fontWeight: '500', marginTop: '50px' }}>
            Lets start using The Dogs API
          </p>
          <div className='tasks'>
            <Task name='voting' backgroundColor='#B4B7FF' path='/voting'>
              <img alt='voting' src={voting} />
            </Task>

            <Task name='breeds' backgroundColor='#97EAB9' path='/breeds'>
              <img alt='breeds' src={breeds} />
            </Task>

            <Task name='gallery' backgroundColor='#FFD280' path='/gallery'>
              <img alt='gallery' src={gallery} />
            </Task>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftBar
