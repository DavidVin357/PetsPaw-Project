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
    const response = await dogapi.get('/votes', {
      params: {
        sub_id: this.props.userId,
      },
    })
    const votes = response.data
    if (votes.length != 0) {
      const dislikes = votes.filter((vote) => vote.value == this.props.value)
      const results = await Promise.all(
        dislikes.map(
          async (dislike) => await dogapi.get(`/images/${dislike.image_id}`)
        )
      )

      const images = results.map((result) => result.data)
      console.log('dislike images', images)
      this.setState({ images })
      this.setState({ loading: false })
    } else {
      this.setState({ loading: false })
      this.setState({ content: false })
    }
  }
  returnContent = (content) => {
    this.setState({ content })
  }
  async componentDidMount() {
    this.setState({ name: this.props.value ? 'Likes' : 'Dislikes' })
    await this.getVotes()
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      console.log('Updated props!')
      this.setState({ name: this.props.value ? 'Likes' : 'Dislikes' })
      await this.getVotes()
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
