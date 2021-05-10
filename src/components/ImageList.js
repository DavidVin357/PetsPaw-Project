import './ImageList.css'
import BreedImageCard from './BreedImageCard'
import GalleryImageCard from './GalleryImageCard'
import FavouritesImageCard from './FavouritesImageCard'
import React from 'react'
class ImageList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { images: [] }
  }
  CustomTag = this.props.imageCard

  render() {
    return (
      <div className='image-list' ref={this.ref}>
        {this.props.imageCard == 'GalleryImageCard'
          ? this.props.images.map((image) => (
              <GalleryImageCard
                key={image.id}
                image={image}
                userId={this.props.userId}
              />
            ))
          : this.props.imageCard == 'FavouritesImageCard'
          ? this.props.images.map((image) => (
              <FavouritesImageCard
                key={image.id}
                image={image}
                userId={this.props.userId}
                removeFav={this.props.removeFav}
              />
            ))
          : this.props.images.map((image) => (
              <BreedImageCard key={image.id} image={image} />
            ))}
      </div>
    )
  }
}

export default ImageList
