import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import BackButton from './BackButton'
import './RightBar.css'
import './Favourites.css'
import TopBar from './TopBar'
import ImageList from './ImageList'
import dogapi from '../dogapi'
import NoItemFound from './NoItemFound'
import Loader from './Loader'
class Search extends React.Component {
  state = { breeds: [], images: [], loading: true, content: true, name: '' }

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
  findByName = () => {
    const name = this.props.match.params.name
    this.setState({ name })
    const breed = this.state.breeds.find(
      (breed) => breed.name.toLowerCase() === name.toLowerCase()
    )
    if (breed) {
      this.getImagesById(breed.value)
      this.setState({ content: true })
    } else {
      this.setState({ content: false })
    }
    this.setState({ loading: false })
  }
  getImagesById = async (breedId) => {
    const results = await dogapi.get('/images/search', {
      params: { breed_id: breedId, limit: 20 },
    })
    const images = results.data
    this.setState({ images })
  }
  onSubmit() {
    this.findByName()
  }
  returnContent = (content) => {
    this.setState({ content })
  }

  async componentDidMount() {
    await this.getBreeds()
    await this.findByName()
  }
  async componentDidUpdate(prevProps) {
    if (this.props.match.params.name !== prevProps.match.params.name) {
      await this.getBreeds()
      await this.findByName()
    }
  }

  render() {
    return (
      <div className='rightContainer'>
        <TopBar onSubmit={this.onSubmit} />
        <div className='FavouritesContent'>
          <div className='buttons'>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <BackButton />
            </Link>
            <button className='textButton'>search</button>
          </div>
          <p style={{ fontSize: '2rem', marginBottom: '5px' }}>
            Search results for:{' '}
            <strong>{` ${this.props.match.params.name}`}</strong>
          </p>
          {this.state.loading ? (
            <div style={{ alignSelf: 'center', marginTop: '5px' }}>
              <Loader />
            </div>
          ) : this.state.content ? (
            <ImageList
              images={this.state.images}
              imageCard='BreedImageCard'
              returnContent={this.returnContent}
            />
          ) : (
            <NoItemFound />
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Search)
