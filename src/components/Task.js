import { Link } from 'react-router-dom'
import './Task.css'
const Task = ({ name, children, backgroundColor, path }) => {
  const linkStyle = {
    textDecoration: 'none',
  }
  return (
    <Link className='taskContainer' to={path} style={linkStyle}>
      <div
        className='taskImage'
        style={{
          backgroundColor,
          border: `4px solid ${backgroundColor + '99'}`,
          backgroundClip: 'padding-box',
        }}
      >
        {children}
      </div>
      <button type='submit' className='taskButton'>
        {name}
      </button>
    </Link>
  )
}

export default Task
