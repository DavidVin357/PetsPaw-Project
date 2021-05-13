import React from 'react'
import dogapi from '../dogapi'
import './GalleryImageCard.css'
class FavouritesImageCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { height: 0, spans: 0, checkedFav: true }
    this.imageRef = React.createRef()
  }
  removeFav = async () => {
    try {
      await dogapi.delete(`/favourites/${this.props.image.id}`, {
        sub_id: this.props.userId,
      })
    } catch (err) {
      console.log('Problem with removeFav:', err)
    }
    const checkedFav = this.state.checkedFav
    this.setState({ checkedFav: !checkedFav })
    this.props.removeFav(this.props.image.id)
    this.props.addLog(this.props.image.image.id)
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight
    const spans = Math.ceil(height / 30)
    this.setState({ height, spans })
  }
  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.setSpans)
  }
  render() {
    const image = this.props.image
    if (image) {
      return (
        <div
          className='imageCard'
          style={{
            gridRowEnd: `span ${this.state.spans}`,
            display: this.state.checkedFav ? 'auto' : 'none',
          }}
        >
          <img ref={this.imageRef} alt='favourite' src={image.image.url} />
          <div className='galleryLayer' style={{ height: this.state.height }}>
            <button className='galleryLayerButton' onClick={this.removeFav}>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M5.38071 1C2.40903 1 0 3.40903 0 6.38071C0 7.80777 0.566893 9.17637 1.57597 10.1854L9.5286 18.1381C9.78895 18.3984 10.2111 18.3984 10.4714 18.1381L18.424 10.1854C19.4331 9.17637 20 7.80777 20 6.38071C20 3.40903 17.591 1 14.6193 1C13.1922 1 11.8236 1.56689 10.8146 2.57597L10 3.39052L9.18545 2.57597C8.17637 1.5669 6.80777 1 5.38071 1Z'
                  fill='#FF868E'
                />
              </svg>
            </button>
          </div>
        </div>
      )
    }
    return <div style={{ display: 'none' }}></div>
  }
}

export default FavouritesImageCard
