import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const LoadMore = ({getLoadMore, loading}) => {
  return (
    <button onClick={getLoadMore} id="loadmore-btn" className="mt-4 transition-all duration-150 group hover:bg-white hover:border-2 border-blue-700 w-11/12 mx-auto md:w-full h-12 shadow-lg flex justify-center items-center bg-blue-700 rounded-lg focus:outline-none">
      {
        loading ? 
        <FontAwesomeIcon className="animate-spin" size="2x" color="black" icon={["fas", "spinner"]} />
        :
        <p className="text-white group-hover:text-blue-700">Load More</p>
      }
    </button>
  )
}