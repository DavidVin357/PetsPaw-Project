import React from 'react'
import { Link } from 'react-router-dom'
import Dropzone from './Dropzone'
import successIcon from '../images/success-20.svg'
import errorIcon from '../images/error-20.svg'
import './Uploader.css'
import axios from 'axios'
import dogapi from '../dogapi'

class Uploader extends React.Component {
  state = {
    isUploaded: false,
    isSent: false,
    fileName: 'No File Selected',
    image: '',
    file: '',
  }
  //DOES NOT ACTUALLY UPLOADS THE IMAGE TO API BECAUSE OF PROBLEMS WITH CORS :(
  // uploadImage = async () => {
  //   const formData = new FormData()
  //   formData.append('file', this.state.file)
  //   console.log(this.state.file)
  //   try {
  //     const response = await dogapi.post('/images/upload', {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       formData,
  //       sub_id: this.props.userId,
  //     })
  //     console.log('response from upload', response)
  //   } catch (err) {
  //     console.log('Error:', err)
  //   }
  // }
  uploadImage = () => {
    this.setState({ isSent: true })
    this.setState({ isUploaded: false, fileName: 'No File Selected' })
  }
  onDrop = (acceptedFiles) => {
    console.log('acceptedFiles', acceptedFiles)
    acceptedFiles.map((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.setState({ image: e.target.result })
        this.setState({ file })
        console.log('result image', e)
      }
      reader.readAsDataURL(file)
      return file
    })
    this.setState({
      isUploaded: true,
      fileName: `Image File Name: ${acceptedFiles[0].name}`,
    })
  }

  componentDidMount() {
    this.props.darkenScreen()
  }
  componentWillUnmount() {
    this.props.lightenScreen()
  }
  render() {
    return (
      <div className='rightContainer'>
        <div className='uploaderContent'>
          <Link
            to='/gallery'
            style={{ textDecoration: 'none', marginLeft: 'auto' }}
          >
            <button className='smallButton'>
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
                  d='M9.05691 9.99997L1.52832 2.47137L2.47113 1.52856L9.99972 9.05716L17.5283 1.52856L18.4711 2.47137L10.9425 9.99997L18.4711 17.5286L17.5283 18.4714L9.99972 10.9428L2.47113 18.4714L1.52832 17.5286L9.05691 9.99997Z'
                  fill='#FF868E'
                />
              </svg>
            </button>
          </Link>
          <h1>Upload a .jpg or .png Dog Image</h1>
          <p>
            Any uploads must comply with the{' '}
            <a href='https://www.thedogapi.com/privacy'>upload guidelines</a> or
            face deletion.
          </p>
          <div className='uploadZone'>
            {this.state.isUploaded ? (
              <img
                src={this.state.image}
                style={{ height: '320px', borderRadius: '10px' }}
              />
            ) : (
              <Dropzone onDrop={this.onDrop} accept={'image/*'} />
            )}
          </div>
          <p className='fileData'>{this.state.fileName}</p>
          <button
            className='uploadButton'
            style={{ visibility: this.state.isUploaded ? 'visible' : 'hidden' }}
            onClick={this.uploadImage}
          >
            UPLOAD PHOTO
          </button>
          <div
            className='uploadResult'
            style={{ visibility: this.state.isSent ? 'visible' : 'hidden' }}
          >
            <img src={successIcon} />
            <p>Thanks for the Upload - Dog found!</p>
          </div>
        </div>
      </div>
    )
  }
}
export default Uploader
