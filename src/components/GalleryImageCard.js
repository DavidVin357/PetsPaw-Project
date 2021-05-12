import React from 'react'
import dogapi from '../dogapi'
import './GalleryImageCard.css'
class GalleryImageCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { height: 0, spans: 0, checkedFav: false, favId: '' }
    this.imageRef = React.createRef()
  }
  addFav = async () => {
    const checkedFav = this.state.checkedFav
    this.setState({ checkedFav: !checkedFav })
    const response = await dogapi.post('/favourites', {
      image_id: this.props.image.id,
      sub_id: this.props.userId,
    })
    const favId = response.data.id
    this.setState({ favId: favId })
  }
  removeFav = async () => {
    await dogapi.delete(`/favourites/${this.state.favId}`, {
      sub_id: this.props.userId,
    })
    const checkedFav = this.state.checkedFav
    this.setState({ checkedFav: !checkedFav })
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
          }}
        >
          <img ref={this.imageRef} alt={image.breeds[0].name} src={image.url} />
          <div className='galleryLayer' style={{ height: this.state.height }}>
            <button
              className='galleryLayerButton'
              onClick={this.state.checkedFav ? this.removeFav : this.addFav}
            >
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
                  d={
                    this.state.checkedFav
                      ? 'M5.38071 1C2.40903 1 0 3.40903 0 6.38071C0 7.80777 0.566893 9.17637 1.57597 10.1854L9.5286 18.1381C9.78895 18.3984 10.2111 18.3984 10.4714 18.1381L18.424 10.1854C19.4331 9.17637 20 7.80777 20 6.38071C20 3.40903 17.591 1 14.6193 1C13.1922 1 11.8236 1.56689 10.8146 2.57597L10 3.39052L9.18545 2.57597C8.17637 1.5669 6.80777 1 5.38071 1Z'
                      : 'M5.38071 2.33333C3.14541 2.33333 1.33333 4.14541 1.33333 6.38071C1.33333 7.45414 1.75975 8.48361 2.51878 9.24264L10 16.7239L17.4812 9.24264C18.2402 8.48361 18.6667 7.45414 18.6667 6.38071C18.6667 4.14541 16.8546 2.33333 14.6193 2.33333C13.5459 2.33333 12.5164 2.75975 11.7574 3.51878L10.4714 4.80474C10.2111 5.06509 9.78895 5.06509 9.5286 4.80474L8.24264 3.51878C7.48361 2.75975 6.45414 2.33333 5.38071 2.33333ZM0 6.38071C0 3.40903 2.40903 1 5.38071 1C6.80777 1 8.17637 1.5669 9.18545 2.57597L10 3.39052L10.8146 2.57597C11.8236 1.56689 13.1922 1 14.6193 1C17.591 1 20 3.40903 20 6.38071C20 7.80777 19.4331 9.17637 18.424 10.1854L10.4714 18.1381C10.2111 18.3984 9.78895 18.3984 9.5286 18.1381L1.57597 10.1854C0.566893 9.17637 0 7.80777 0 6.38071Z'
                  }
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

export default GalleryImageCard
