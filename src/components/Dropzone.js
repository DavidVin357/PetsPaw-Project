import React from 'react'
import { useDropzone } from 'react-dropzone'
import uploadBG from '../images/upload-bg.svg'
const Dropzone = ({ onDrop, accept }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  })
  return (
    <div {...getRootProps()}>
      <input className='dropzone-input' {...getInputProps()} />
      <div className='text-center'>
        {
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p>
              <strong>Drag here</strong> your file or{' '}
              <strong>Click here</strong> to upload
            </p>
            <img src={uploadBG} />
          </div>
        }
      </div>
    </div>
  )
}
export default Dropzone
