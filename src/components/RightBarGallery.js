import React from 'react'
import { nanoid } from 'nanoid'
import dogapi from '../dogapi'
import uniqueRandomArray from 'unique-random-array'
import './RightBar.css'
import './RightBarGallery.css'
import ImageList from './ImageList'
import BackButton from './BackButton'
import TopBar from './TopBar'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'
import NoItemFound from './NoItemFound'
import Loader from './Loader'

class RightBarGallery extends React.Component {
  state = {
    breeds: [],
    breedId: '',
    limit: 5,
    type: 'gif,jpg,png',
    order: 'RANDOM',
    images: [],
    content: true,
    loading: true,
  }
  orders = ['Random', 'Asc', 'Desc']
  types = [
    { name: 'All', value: 'gif,jpg,png' },
    { name: 'Static', value: 'jpg,png' },
    { name: 'Animated', value: 'gif' },
  ]
  limits = [5, 10, 15, 20]

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
    } catch (err) {
      console.log(err)
    }
  }

  getAllImages = async () => {
    const random = uniqueRandomArray(this.state.breeds)
    const breeds = []
    for (let i = 0; i < this.state.limit; i++) {
      breeds.push(random())
    }
    const results = await Promise.all(
      breeds.map(async (breed) => {
        const response = await dogapi.get('/images/search', {
          params: {
            breed_id: breed.value,
            mime_types: this.state.type,
            order: this.state.order,
          },
        })

        return response.data
      })
    )
    const images = results.map((res) => res[0])
    if (images.length == 0) {
      this.setState({ content: false })
    }
    this.setState({ images: images })
    this.setState({ loading: false })
  }

  getImagesById = async () => {
    const results = await dogapi.get('/images/search', {
      params: {
        breed_id: this.state.breedId,
        limit: this.state.limit,
        mime_types: this.state.type,
        order: this.state.order,
      },
    })
    const images = results.data
    if (images.length == 0) {
      this.setState({ content: false })
    }
    this.setState({ images: images })
    this.setState({ loading: false })
  }

  selectBreeds = (breedId) => {
    this.setState({ breedId: breedId })
  }

  changeLimit = (limit) => {
    this.setState({ limit })
  }

  changeOrder = (order) => {
    this.setState({ order })
  }

  changeType = (type) => {
    this.setState({ type })
  }

  onUpdate = () => {
    this.setState({ content: 'content', loading: true })
    isNaN(parseInt(this.state.breedId))
      ? this.getAllImages(this.state.limit)
      : this.getImagesById(this.state.breedId, this.state.limit)
  }
  returnContent = (content) => {
    this.setState({ content })
  }

  async componentDidMount() {
    await this.getBreeds()
    await this.getAllImages(this.state.limit)
  }

  render() {
    return (
      <div className='rightContainer'>
        <TopBar />
        <div className='rightGalleryContent'>
          <div className='buttons'>
            <Link to='/PetsPaw-Project' style={{ textDecoration: 'none' }}>
              <BackButton />
            </Link>
            <button className='textButton'>gallery</button>
          </div>
          <div className='dropDowns'>
            <Dropdown
              label='Order'
              onChange={this.changeOrder}
              backgroundColor='#fff'
              textColor='#1D1D1D'
              options={this.orders.map((order) => {
                return {
                  value: order.toUpperCase(),
                  name: order,
                  id: nanoid(),
                }
              })}
            />
            <Dropdown
              label='Type'
              onChange={this.changeType}
              backgroundColor='#fff'
              textColor='#1D1D1D'
              options={this.types.map((type) => {
                return {
                  value: type.value,
                  name: type.name,
                  id: nanoid(),
                }
              })}
            />
            <Dropdown
              label='Breed'
              onChange={this.selectBreeds}
              backgroundColor='#fff'
              textColor='#1D1D1D'
              firstText='None'
              options={this.state.breeds}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 40px',
                gap: '10px',
              }}
            >
              <Dropdown
                label='Limit'
                onChange={this.changeLimit}
                backgroundColor='#fff'
                textColor='#1D1D1D'
                options={this.limits.map((limit) => {
                  return {
                    value: limit,
                    name: `${limit} items per page`,
                    id: nanoid(),
                  }
                })}
              />
              <button className='smallButton' onClick={this.onUpdate}>
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
                    d='M9.48189 2.49989L7.93396 0.953004L8.88633 0L12.0577 3.16928L8.88634 6.33873L7.93395 5.38576L9.47232 3.84832C5.51244 3.99813 2.3473 7.25498 2.3473 11.2478C2.3473 15.3361 5.66547 18.6527 9.75744 18.6527C13.8494 18.6527 17.1676 15.3361 17.1676 11.2478V10.5742H18.5149V11.2478C18.5149 16.081 14.5927 20 9.75744 20C4.92221 20 1 16.081 1 11.2478C1 6.50682 4.77407 2.64542 9.48189 2.49989Z'
                    fill='#FF868E'
                  />
                </svg>
              </button>
            </div>
          </div>
          {this.state.loading ? (
            <div style={{ alignSelf: 'center' }}>
              <Loader />
            </div>
          ) : (
            <ImageList
              images={this.state.images}
              imageCard='GalleryImageCard'
              userId={this.props.userId}
              returnContent={this.returnContent}
            />
          )}

          {this.state.content ? null : <NoItemFound />}
        </div>
      </div>
    )
  }
}

export default RightBarGallery
