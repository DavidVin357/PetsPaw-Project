import React from 'react'
import { nanoid } from 'nanoid'
import dogapi from '../dogapi'
import { Link } from 'react-router-dom'
import './RightBar.css'
import './RightBarVoting.css'
import dislike from '../images/dislike-color-20.svg'
import like from '../images/like-color-20.svg'
import fav from '../images/fav-20.svg'
import TopBar from './TopBar'
import BackButton from './BackButton'
import Loader from './Loader'

class RightBarVoting extends React.Component {
  emotionsRef = React.createRef()
  imageRef = React.createRef()
  state = {
    height: null,
    width: null,
    checkedFav: false,
    favId: '',
    imgSrc: '',
    imgId: '',
    userId: this.props.userId,
    logs: [],
    loading: true,
  }

  getImage = async () => {
    this.setState({ loading: true })
    try {
      const response = await dogapi.get('/images/search')
      const data = response.data[0]
      this.setState({ imgSrc: data.url })
      this.setState({ imgId: data.id })
    } catch (err) {
      console.log(err)
    }
    this.setState({ checkedFav: false, loading: false })
  }

  addLike = async () => {
    await dogapi.post('/votes', {
      image_id: this.state.imgId,
      value: 1,
      sub_id: this.state.userId,
    })
    this.addLog('added to Likes', like)
    this.getImage()
  }
  addDislike = async () => {
    await dogapi.post('/votes', {
      image_id: this.state.imgId,
      value: 0,
      sub_id: this.state.userId,
    })
    this.addLog('added to Dislikes', dislike)
    this.getImage()
  }
  addFav = async () => {
    const checkedFav = this.state.checkedFav
    this.setState({ checkedFav: !checkedFav })
    const response = await dogapi.post('/favourites', {
      image_id: this.state.imgId,
      sub_id: this.state.userId,
    })
    const favId = response.data.id
    this.setState({ favId: favId })
    this.addLog('added to Favourites', fav)
  }
  removeFav = async () => {
    await dogapi.delete(`/favourites/${this.state.favId}`, {
      sub_id: this.state.userId,
    })
    const checkedFav = this.state.checkedFav
    this.setState({ checkedFav: !checkedFav })
    this.addLog('removed from Favourites', '')
  }
  addLog = (text, icon) => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const logs = [...this.state.logs]
    logs.unshift({
      time: `${hours}:${minutes}`,
      imgId: this.state.imgId,
      text,
      icon,
    })

    this.setState({ logs })
  }
  componentDidMount() {
    this.getImage()
    const height = this.emotionsRef.current.clientHeight
    const width = this.emotionsRef.current.clientWidth
    this.setState({ height, width })
  }
  componentDidUpdate() {
    this.imageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  render() {
    return (
      <div className='rightContainer'>
        <div ref={this.imageRef}>
          <TopBar />
        </div>

        <div className='rightVotingContent'>
          <div className='buttons'>
            <Link to='/PetsPaw-Project' style={{ textDecoration: 'none' }}>
              <BackButton />
            </Link>
            <button className='textButton'>voting</button>
          </div>
          <div
            className='image'
            style={{
              position: 'relative',
              marginBottom: `${10 + this.state.height / 2}px`,
            }}
          >
            {this.state.loading ? (
              <div className='loader' style={{ height: '600px' }}>
                <Loader />
              </div>
            ) : (
              <img src={this.state.imgSrc} style={{ borderRadius: '20px' }} />
            )}

            <div
              id='emotions'
              ref={this.emotionsRef}
              style={{
                position: 'absolute',
                top: `calc(100% - ${this.state.height / 2}px)`,
                left: `calc(50% - ${this.state.width / 2}px`,
              }}
            >
              <button
                id='like'
                onClick={this.addLike}
                disabled={this.state.loading}
              >
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15ZM15 2C7.8203 2 2 7.8203 2 15C2 22.1797 7.8203 28 15 28C22.1797 28 28 22.1797 28 15C28 7.8203 22.1797 2 15 2ZM10 12H8V10H10V12ZM22 12H20V10H22V12ZM9.2 16.6L9.8 17.4C12.4 20.8667 17.6 20.8667 20.2 17.4L20.8 16.6L22.4 17.8L21.8 18.6C18.4 23.1333 11.6 23.1333 8.2 18.6L7.6 17.8L9.2 16.6Z'
                    fill='#fff'
                  />
                </svg>
              </button>
              <button
                className={this.state.checkedFav ? 'fav' : 'fav favHover'}
                onClick={this.state.checkedFav ? this.removeFav : this.addFav}
                disabled={this.state.loading}
              >
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d={
                      this.state.checkedFav
                        ? 'M8.07107 2C3.61354 2 0 5.61354 0 10.0711C0 12.2116 0.850339 14.2646 2.36396 15.7782L14.2929 27.7071C14.6834 28.0976 15.3166 28.0976 15.7071 27.7071L27.636 15.7782C29.1497 14.2646 30 12.2116 30 10.0711C30 5.61354 26.3865 2 21.9289 2C19.7884 2 17.7354 2.85034 16.2218 4.36396L15 5.58579L13.7782 4.36396C12.2646 2.85034 10.2116 2 8.07107 2Z'
                        : 'M8.07107 4C4.71811 4 2 6.71811 2 10.0711C2 11.6812 2.63963 13.2254 3.77817 14.364L15 25.5858L26.2218 14.364C27.3604 13.2254 28 11.6812 28 10.0711C28 6.71811 25.2819 4 21.9289 4C20.3188 4 18.7746 4.63963 17.636 5.77817L15.7071 7.70711C15.3166 8.09763 14.6834 8.09763 14.2929 7.70711L12.364 5.77818C11.2254 4.63963 9.68121 4 8.07107 4ZM0 10.0711C0 5.61354 3.61354 2 8.07107 2C10.2116 2 12.2646 2.85034 13.7782 4.36396L15 5.58579L16.2218 4.36396C17.7354 2.85034 19.7884 2 21.9289 2C26.3865 2 30 5.61354 30 10.0711C30 12.2116 29.1497 14.2646 27.636 15.7782L15.7071 27.7071C15.3166 28.0976 14.6834 28.0976 14.2929 27.7071L2.36396 15.7782C0.850339 14.2646 0 12.2116 0 10.0711Z'
                    }
                    fill='#fff'
                  />
                </svg>
              </button>
              <button
                id='dislike'
                onClick={this.addDislike}
                disabled={this.state.loading}
              >
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15ZM15 2C7.8203 2 2 7.8203 2 15C2 22.1797 7.8203 28 15 28C22.1797 28 28 22.1797 28 15C28 7.8203 22.1797 2 15 2ZM10 12H8V10H10V12ZM22 12H20V10H22V12ZM7.6 20.2L8.2 19.4C11.6 14.8667 18.4 14.8667 21.8 19.4L22.4 20.2L20.8 21.4L20.2 20.6C17.6 17.1333 12.4 17.1333 9.8 20.6L9.2 21.4L7.6 20.2Z'
                    fill='#fff'
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className='logs'>
            {this.state.logs.length != 0
              ? this.state.logs.map((log) => (
                  <div className='log' key={nanoid()}>
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
export default RightBarVoting
