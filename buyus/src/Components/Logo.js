import React from 'react'
import myLogo from './Logo.png'

const Logo = ({w,h}) => {
  return (
    <img src={myLogo} alt='Logo' width={w} height={h} />
  )
}

export default Logo