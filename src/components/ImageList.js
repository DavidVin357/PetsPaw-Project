import './ImageList.css'
import BreedImageCard from './BreedImageCard'
import GalleryImageCard from './GalleryImageCard'
import FavouritesImageCard from './FavouritesImageCard'
import React from 'react'
class ImageList extends React.Component {
  constructor(props) {
    super(props)
  }
  once = false
  render() {
    if (this.props.images.length) {
      return (
        <div className='image-list' ref={this.ref}>
          {this.props.imageCard == 'GalleryImageCard'
            ? this.props.images.map((image) => {
                if (image) {
                  return (
                    <GalleryImageCard
                      key={image.id}
                      image={image}
                      userId={this.props.userId}
                    />
                  )
                }
                if (!this.once) {
                  const once = this.once
                  this.props.returnContent(false)
                  this.once = !once
                }
                return null
              })
            : this.props.imageCard == 'FavouritesImageCard'
            ? this.props.images.map((image) => {
                if (image) {
                  return (
                    <FavouritesImageCard
                      key={image.id}
                      image={image}
                      userId={this.props.userId}
                      removeFav={this.props.removeFav}
                      addLog={this.props.addLog}
                    />
                  )
                }
                if (!this.once) {
                  const once = this.once
                  this.props.returnContent(false)
                  this.once = !once
                }
              })
            : this.props.images.map((image) => {
                if (image) {
                  return <BreedImageCard key={image.id} image={image} />
                }
                if (!this.once) {
                  const once = this.once
                  this.props.returnContent(false)
                  this.once = !once
                }
              })}
        </div>
      )
    }
    return <div style={{ display: 'none' }}></div>
  }
}

export default ImageList
