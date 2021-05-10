import './BackButton.css'
const BackButton = () => {
  return (
    <button className='backButton'>
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0)'>
          <path
            d='M4.70981 10.9901L13.3095 19.5896C13.8565 20.1369 14.7435 20.1369 15.2903 19.5896C15.8371 19.0427 15.8371 18.1558 15.2903 17.6091L7.68086 9.99988L15.29 2.39096C15.8369 1.84391 15.8369 0.957107 15.29 0.410284C14.7432 -0.136761 13.8563 -0.136761 13.3093 0.410284L4.70959 9.00985C4.43617 9.28339 4.29962 9.64153 4.29962 9.99983C4.29962 10.3583 4.43644 10.7167 4.70981 10.9901Z'
            fill='#FF868E'
          />
        </g>
        <defs>
          <clipPath id='clip0'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </button>
  )
}
export default BackButton
