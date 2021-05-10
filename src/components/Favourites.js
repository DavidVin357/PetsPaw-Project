import React from 'react'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'
import BackButton from './BackButton'
import './RightBar.css'
import './Favourites.css'
import TopBar from './TopBar'
import ImageList from './ImageList'
import dogapi from '../dogapi'
class Favourites extends React.Component {
  state = { favIds: [], imageIds: [], images: [], logs: [] }
  getAllFavs = async () => {
    const response = await dogapi.get('/favourites', {
      params: { sub_id: this.props.userId },
    })
    const results = response.data
    const favIds = results.map((result) => result.id)
    const images = results.map((result) => result.image.url)
    this.setState({ favIds, images })
  }
  removeFav = (id) => {
    const favIds = [...this.state.favIds]
    const images = [...this.state.images]
    const index = favIds.indexOf(id)
    favIds.filter((favId) => favId != id)
    images.splice(index, 1)
    this.setState({ favIds, images })
    this.addLog()
  }
  addLog = (imgId, text, icon) => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const logs = [...this.state.logs]
    logs.unshift({
      time: `${hours}:${minutes}`,
      imgId,
      text,
      icon,
    })
  }
  componentDidMount() {
    this.getAllFavs()
  }
  render() {
    return (
      <div className='rightContainer'>
        <TopBar />
        <div className='FavouritesContent'>
          <div className='buttons'>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <BackButton />
            </Link>
            <button className='textButton'>Favourites</button>
          </div>

          <ImageList
            images={this.state.images}
            imageCard='FavouritesImageCard'
            userId={this.props.userId}
            removeFav={this.removeFav}
          />
          <div className='logs'>
            {this.state.logs.length != 0
              ? this.state.logs.map((log) => (
                  <div className='log' key={() => nanoid()}>
                    <p className='timeText'>{log.time}</p>
                    <p>
                      Image ID:
                      <strong style={{ color: '#1D1D1D' }}>
                        {` ` + log.imgId}
                      </strong>
                      {` was `}
                      {log.text}
                    </p>
                    <img src={log.icon} style={{ marginLeft: 'auto' }}></img>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </div>
    )
  }
}

export default Favourites
