import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const GoTop = () => {
  const goTop = () => {
    window.scrollTo(0,0)
  }
  
  return (
    <button onClick={goTop} className="fixed z-50 bg-black bg-opacity-70 bottom-32 right-0 md:right-28  lg:rounded-lg rounded-l-lg md:w-14 md:h-14 w-12 h-12 border-2 shadow-2xl">
      <FontAwesomeIcon color="white" size="2x" icon={["fas", "angle-up"]} />
    </button>
  )
}