import React from 'react'
import './BreedImageCard.css'
import { Link } from 'react-router-dom'
class BreedImageCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { height: 0, spans: 0 }
    this.imageRef = React.createRef()
  }
  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.setSpans)
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight
    const spans = Math.ceil(height / 30)
    this.setState({ height, spans })
  }
  returnCard = () => {}

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
          <img
            ref={this.imageRef}
            alt={image.hasOwnProperty('breeds') ? image.breeds[0].name : ''}
            src={image.url}
          />
          {image.hasOwnProperty('breeds') ? (
            <Link
              to={`/breeds/${image.breeds[0].id}`}
              className='breedlayerLink'
            >
              <div className='breedLayer' style={{ height: this.state.height }}>
                <button className='breedLayerButton'>
                  {image.breeds[0].name}
                </button>
              </div>
            </Link>
          ) : (
            <></>
          )}
        </div>
      )
    }
    return <div style={{ display: 'none' }}></div>
  }
}

export default BreedImageCard
