import React from 'react'
import './Favourites.css'
import dogapi from '../dogapi'
import { Link } from 'react-router-dom'
import BackButton from './BackButton'
import TopBar from './TopBar'
import ImageList from './ImageList'
import NoItemFound from './NoItemFound'
import Loader from './Loader'
class Votes extends React.Component {
  state = { name: '', images: [], content: true, loading: true }
  getVotes = async () => {
    this.setState({ loading: true })
    const response = await dogapi.get('/votes', {
      params: {
        sub_id: this.props.userId,
      },
    })
    const images = response.data
    if (images.length == 0) {
      this.setState({ content: false })
    }
    const votes = images.filter((vote) => vote.value === this.props.value)
    let final_images = []
    for (const vote of votes) {
      try {
        const response = await dogapi.get(`/images/${vote.image_id}`)
        const image = response.data
        final_images.push(image)
      } catch {
        console.log('Image not Fetched')
        continue
      }
    }
    this.setState({ images: final_images })
    this.setState({ loading: false })
  }
  returnContent = (content) => {
    this.setState({ content })
  }
  componentDidMount() {
    this.setState({ name: this.props.value ? 'Likes' : 'Dislikes' })
    this.getVotes()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ name: this.props.value ? 'Likes' : 'Dislikes' })
      this.getVotes()
    }
  }
  render() {
    return (
      <div className='rightContainer'>
        <TopBar focus={this.props.value ? 'like' : 'dislike'} />
        <div className='FavouritesContent'>
          <div className='buttons'>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <BackButton />
            </Link>
            <button className='textButton'>{this.state.name}</button>
          </div>
          <div>
            {this.state.loading ? (
              <div style={{ alignSelf: 'center', marginTop: '5px' }}>
                <Loader />
              </div>
            ) : (
              <ImageList
                images={this.state.images}
                imageCard='BreedImageCard'
                userId={this.props.userId}
                returnContent={this.returnContent}
              />
            )}
          </div>
          {this.state.content ? null : <NoItemFound />}
        </div>
      </div>
    )
  }
}
export default Votes
