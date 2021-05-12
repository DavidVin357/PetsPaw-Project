import React from 'react'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'
import BackButton from './BackButton'
import './RightBar.css'
import './Favourites.css'
import TopBar from './TopBar'
import ImageList from './ImageList'
import dogapi from '../dogapi'
import NoItemFound from './NoItemFound'
import Loader from './Loader'
class Favourites extends React.Component {
  state = { images: [], logs: [], loading: true, content: true }
  getAllFavs = async () => {
    const response = await dogapi.get('/favourites', {
      params: { sub_id: this.props.userId },
    })
    const images = response.data
    if (images.length == 0) {
      this.setState({ content: false })
    }
    this.setState({ images })
    this.setState({ loading: false })
  }
  removeFav = async (favId) => {
    const images = [...this.state.images]
    images.filter((image) => image.id != favId)
    this.setState({ images })
  }
  addLog = (imgId) => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const logs = [...this.state.logs]
    logs.unshift({
      time: `${hours}:${minutes}`,
      imgId,
    })
    this.setState({ logs })
  }
  returnContent = (content) => {
    this.setState({ content })
  }
  componentDidMount() {
    this.getAllFavs()
  }
  render() {
    return (
      <div className='rightContainer'>
        <TopBar focus='favourite' />
        <div className='FavouritesContent'>
          <div className='buttons'>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <BackButton />
            </Link>
            <button className='textButton'>Favourites</button>
          </div>
          {this.state.loading ? (
            <div style={{ alignSelf: 'center', marginTop: '5px' }}>
              <Loader />
            </div>
          ) : (
            <div>
              <ImageList
                images={this.state.images}
                imageCard='FavouritesImageCard'
                userId={this.props.userId}
                removeFav={this.removeFav}
                addLog={this.addLog}
                returnContent={this.returnContent}
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
                          {` was removed from Favourites`}
                        </p>
                      </div>
                    ))
                  : ''}
              </div>
            </div>
          )}
          {this.state.content ? null : <NoItemFound />}
        </div>
      </div>
    )
  }
}

export default Favourites
