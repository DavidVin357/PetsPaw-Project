import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import dogapi from '../dogapi'
import './RightBarBreeds.css'
import './RightBarSelectedBreed.css'
import TopBar from './TopBar'
import BackButton from './BackButton'
class RightBarSelectedBreed extends React.Component {
  dotsRef = React.createRef()
  styleLink = { textDecoration: 'none' }
  state = {
    images: [],
    currentImage: '',
    breedData: {},
    breedHeight: '',
    breedWeight: '',
  }
  getImagesById = async (breedId) => {
    const results = await dogapi.get('/images/search', {
      params: { breed_id: breedId, limit: 5 },
    })
    const images = results.data
    console.log('getImagesById', images)
    this.setState({ images: images })
    this.setState({ currentImage: images[0].url })
    this.setState({ breedData: images[0].breeds[0] })
    this.setState({
      breedWeight: images[0].breeds[0].weight.metric,
      breedHeight: images[0].breeds[0].height.metric,
    })
  }
  changeSliderImage = (event) => {
    this.setState({ currentImage: event.target.value })
  }
  componentDidMount() {
    this.getImagesById(this.props.match.params.id)
    const height = this.dotsRef.current.clientHeight
    this.setState({ height })
    console.log(this.state.breedData)
  }
  render() {
    return (
      <div className='rightContainer'>
        <TopBar />
        <div className='rightSelectedBreedContent rightBreedsContent'>
          <div className='buttons'>
            <Link to='/breeds' style={this.styleLink}>
              <BackButton />
            </Link>
            <Link to='/breeds' style={this.styleLink}>
              <button
                className='textButton'
                style={{ backgroundColor: '#fbe0dc', color: '#ff868e' }}
              >
                breeds
              </button>
            </Link>
            <button className='textButton' style={{ width: '90px' }}>
              {this.props.match.params.id}
            </button>
          </div>
          <div
            className='slider'
            style={{
              position: 'relative',
              marginBottom: `${30 + this.state.height / 2}px`,
            }}
          >
            <img src={this.state.currentImage}></img>
            <div
              ref={this.dotsRef}
              className='dots'
              style={{
                position: 'absolute',
                top: `calc(100% - ${this.state.height / 2}px)`,
                left: `calc(50% - ${
                  (20 * this.state.images.length + 10) / 2
                }px`,
              }}
            >
              {this.state.images.map((image, index) => (
                <button
                  autoFocus={index == 0}
                  className='dot'
                  value={image.url}
                  key={image.id}
                  onClick={this.changeSliderImage}
                ></button>
              ))}
            </div>
          </div>
          <div className='breedText'>
            <h1>{this.state.breedData.name}</h1>
            <h2>{this.state.breedData.bred_for}</h2>
            <div className='breedParams'>
              <p>
                <span className='paramName'>Temperament:</span>
                <span>{this.state.breedData.temperament}</span>
              </p>
              <p>
                <p>
                  <span className='paramName'>Height:</span>
                  <span>{` ${this.state.breedHeight} cm at the withers`}</span>
                </p>
                <p>
                  <span className='paramName'>Weight:</span>
                  <span>{` ${this.state.breedWeight} kgs`}</span>/
                </p>
                <p>
                  <span className='paramName'>Life span:</span>
                  <span>{` ${this.state.breedData.life_span}`}</span>
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(RightBarSelectedBreed)
