import { nanoid } from 'nanoid'
import uniqueRandomArray from 'unique-random-array'
import React from 'react'
import dogapi from '../dogapi'
import './RightBarBreeds.css'
import './RightBar.css'
import TopBar from './TopBar'
import BackButton from './BackButton'
import Dropdown from './Dropdown'
import ImageList from './ImageList'
import { Link } from 'react-router-dom'

class RightBarBreeds extends React.Component {
  limits = [5, 10, 15, 20]

  state = { breeds: [], breedId: '', limit: 5, sortOrder: true, images: [] }

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

  getAllImages = async (limit) => {
    const random = uniqueRandomArray(this.state.breeds)
    const breeds = []
    for (let i = 0; i < limit; i++) {
      breeds.push(random())
    }
    const results = await Promise.all(
      breeds.map(async (breed) => {
        const response = await dogapi.get('/images/search', {
          params: { breed_id: breed.value },
        })
        return response.data
      })
    )
    const images = results.map((res) => res[0])
    console.log('getAllImages:', images)
    this.setState({ images: images })
  }

  getImagesById = async (breedId, limit) => {
    const results = await dogapi.get('/images/search', {
      params: { breed_id: breedId, limit },
    })
    const images = results.data
    console.log('getImagesById', images)
    this.setState({ images: images })
  }

  selectBreeds = (breedId) => {
    console.log(`param breedId: ${breedId}, limit:${this.state.limit}`)
    this.setState({ breedId: breedId })
    this.getImagesById(breedId, this.state.limit)
  }

  changeLimit = (limit) => {
    this.setState({ limit })
    console.log('changeLimit', limit)
    isNaN(parseInt(this.state.breedId))
      ? this.getAllImages(limit)
      : this.getImagesById(this.state.breedId, limit)
  }

  SortAZ = () => {
    const sortOrder = this.state.sortOrder
    if (!sortOrder) {
      const breeds = this.state.breeds
      breeds.reverse()
      this.setState({ breeds })
      this.setState({ sortOrder: !sortOrder })
    }
    if (!parseInt(this.state.breedId)) {
      this.getAllImages(this.state.limit)
    }
  }
  SortZA = () => {
    const sortOrder = this.state.sortOrder
    if (sortOrder) {
      const breeds = this.state.breeds
      breeds.reverse()
      this.setState({ breeds })
      this.setState({ sortOrder: !sortOrder })
    }
    if (!parseInt(this.state.breedId)) {
      this.getAllImages(this.state.limit)
    }
  }

  async componentDidMount() {
    await this.getBreeds()
    await this.getAllImages(this.state.limit)
  }
  render() {
    return (
      <div className='rightContainer'>
        <TopBar />
        <div className='rightBreedsContent'>
          <div className='buttons'>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <BackButton />
            </Link>
            <button className='textButton'>breeds</button>

            <Dropdown
              onChange={this.selectBreeds}
              textColor='#8c8c8c'
              backgroundColor='#F8F8F7'
              firstText='All breeds'
              options={this.state.breeds}
            />
            <Dropdown
              onChange={this.changeLimit}
              textColor='#8c8c8c'
              backgroundColor='#F8F8F7'
              firstText=''
              options={this.limits.map((limit) => {
                return { value: limit, name: `Limit: ${limit}`, id: nanoid() }
              })}
            />
            <button className='sortButton' onClick={this.SortAZ}>
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
                  d='M4 0.195262C4.26035 -0.0650874 4.68246 -0.0650874 4.94281 0.195262L8.94281 4.19526L8 5.13807L5.13807 2.27614V20H3.80474V2.27614L0.942809 5.13807L0 4.19526L4 0.195262ZM15.1381 1.33333C14.0335 1.33333 13.1381 2.22876 13.1381 3.33333V5.33333H17.1381V3.33333C17.1381 2.22876 16.2426 1.33333 15.1381 1.33333ZM17.1381 6.66667V9.33333H18.4714V3.33333C18.4714 1.49238 16.979 9.93411e-09 15.1381 9.93411e-09C13.2971 9.93411e-09 11.8047 1.49238 11.8047 3.33333V9.33333H13.1381V6.66667H17.1381ZM11.8047 10.6667H15.8047C17.2775 10.6667 18.4714 11.8606 18.4714 13.3333C18.4714 14.1298 18.1222 14.8447 17.5686 15.3333C18.1222 15.822 18.4714 16.5369 18.4714 17.3333C18.4714 18.8061 17.2775 20 15.8047 20H11.8047V10.6667ZM15.8047 14.6667C16.5411 14.6667 17.1381 14.0697 17.1381 13.3333C17.1381 12.597 16.5411 12 15.8047 12H13.1381V14.6667H15.8047ZM13.1381 16H15.8047C16.5411 16 17.1381 16.597 17.1381 17.3333C17.1381 18.0697 16.5411 18.6667 15.8047 18.6667H13.1381V16Z'
                  fill='#8C8C8C'
                />
              </svg>
            </button>
            <button className='sortButton' onClick={this.SortZA}>
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
                  d='M3.80474 17.7239V0H5.13807V17.7239L8 14.8619L8.94281 15.8047L4.94281 19.8047C4.81778 19.9298 4.64822 20 4.4714 20C4.29459 20 4.12502 19.9298 4 19.8047L0 15.8047L0.942809 14.8619L3.80474 17.7239ZM15.1381 1.33333C14.0335 1.33333 13.1381 2.22876 13.1381 3.33333V5.33333H17.1381V3.33333C17.1381 2.22876 16.2426 1.33333 15.1381 1.33333ZM17.1381 6.66667V9.33333H18.4714V3.33333C18.4714 1.49238 16.979 0 15.1381 0C13.2971 0 11.8047 1.49238 11.8047 3.33333V9.33333H13.1381V6.66667H17.1381ZM11.8047 10.6667H15.8047C17.2775 10.6667 18.4714 11.8606 18.4714 13.3333C18.4714 14.1298 18.1222 14.8447 17.5686 15.3333C18.1222 15.822 18.4714 16.5369 18.4714 17.3333C18.4714 18.8061 17.2775 20 15.8047 20H11.8047V10.6667ZM15.8047 14.6667C16.5411 14.6667 17.1381 14.0697 17.1381 13.3333C17.1381 12.597 16.5411 12 15.8047 12H13.1381V14.6667H15.8047ZM13.1381 16H15.8047C16.5411 16 17.1381 16.597 17.1381 17.3333C17.1381 18.0697 16.5411 18.6667 15.8047 18.6667H13.1381V16Z'
                  fill='#8C8C8C'
                />
              </svg>
            </button>
          </div>
          <ImageList images={this.state.images} imageCard='BreedImageCard' />
        </div>
      </div>
    )
  }
}

export default RightBarBreeds
