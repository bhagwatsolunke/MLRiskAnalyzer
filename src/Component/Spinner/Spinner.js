import React from 'react'
import loading from '../loading.gif'
import './Spinner.css'

const Spinner = () => {

  return (
    <div className='text-center' >
      <img className="spinner-loading" src={loading} alt="loading" sizes='' />
    </div>
  )
}
export default Spinner
