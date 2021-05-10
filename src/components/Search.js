import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import BackButton from './BackButton'
import './RightBar.css'
import './Favourites.css'
import TopBar from './TopBar'
import ImageList from './ImageList'
import dogapi from '../dogapi'
class Search extends React.Component {
  state = { breeds: [], images: [] }

  getBreeds = async () => {
    try {
      const breeds = await dogapi.get('/breeds')
      const breedsList = breeds.data.map((breed) => {
        return {
          value: breed.id,
          id: breed.reference_image_id,
          name: breed.name,
        }
      })
      this.setState({ breeds: breedsList })
    } catch (err) {}
  }
  findByName(name) {
    const breed = this.state.breeds.filter((breed) => breed.name === name)
    const id = ''
    if (breed.length == 1) {
      id = breed[0].id
    }
  }
  getImagesById = async (breedId) => {
    const results = await dogapi.get('/images/search', {
      params: { breed_id: breedId, limit: 20 },
    })
    const images = results.data
    console.log('getImagesById', images)
    this.setState({ images })
  }
  componentDidMount() {
    this.getBreeds()
    this.findByName(this.props.match.params.id)
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
            <button className='textButton'>search</button>
          </div>

          <ImageList images={this.state.images} imageCard='BreedImageCard' />
        </div>
      </div>
    )
  }
}

export default withRouter(Search)
