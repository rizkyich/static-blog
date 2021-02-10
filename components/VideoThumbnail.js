import React from 'react'
import TitleText from '../components/TitleText'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VideoItem = ({item, index}) => {
  const numberWithPoint = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className="w-11/12 h-80 rounded-lg shadow-lg mx-auto bg-white">
      <div className="h-3/6 w-full">
        <img src={item.img} className="w-full h-full rounded-t-lg rounded-tr-lg"/>
      </div>
      <div className="relative w-full h-3/6 px-2 pt-10">
        <div className="absolute w-16 h-16 flex justify-center items-center rounded-full left-3 -top-8 bg-blue-400"> 
          <FontAwesomeIcon className="text-lg" size="2x" color="white" icon={["fas", "play"]} />
        </div>

        <div className="flex justify-between">
          <p className="text-sm text-blue-400 mr-4">{item.cat}</p>
          <p className="text-sm">{item.tgl}</p>
        </div>

        <h1>{item.title}</h1>

        <div id="views" className="flex items-center justify-start mt-4">
          <FontAwesomeIcon className="mr-2" color="gray" icon={["fas", "eye"]} />
          <p className="text-sm text-gray-500">{numberWithPoint(item.views)} Views</p>
        </div>
      </div>
    </div>
  )
}

const imgArr = [
  {
    id: 1,
    cat: 'HIGOes Update',
    tgl: '18 Januari 2021',
    title: 'HIGOspot Kini Hadir di Mangga Dua Square Jakarta',
    sub: 'Internetan nyaman sambul nunggu belanja, bisa...',
    img: 'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format',
    views: 13213,
  },
  {
    id: 2,
    cat: 'HIGOes Update',
    tgl: '18 Januari 2021',
    title: 'HIGOspot Kini Hadir di Mangga Dua Square Jakarta',
    sub: 'Internetan nyaman sambul nunggu belanja, bisa...',
    img: 'https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format',
    views: 8237,
  },
  {
    id: 3,
    cat: 'HIGOes Update',
    tgl: '18 Januari 2021',
    title: 'HIGOspot Kini Hadir di Mangga Dua Square Jakarta',
    sub: 'Internetan nyaman sambul nunggu belanja, bisa...',
    img: 'https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format',
    views: 923773,
  }
]

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    paritialVisibilityGutter: 150
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 65
  }
}

export const VideoThumbnail = () => {
  return (
    <section className="bg-blue-100 w-full h-auto pt-8 mt-12">
      <div className="container mx-auto pb-8  md:px-8 xl:px-20 2xl:px-40 md:w-11/12 lg:w-full w-full h-auto">
        <TitleText text={'Video'}/>
        <div className="w-11/12 mx-auto md:w-full h-auto pb-8 mt-4">
          <Carousel
            ssr
            partialVisbile={true}
            // centerMode={true}
            arrows={false}
            itemClass="image-item"
            responsive={responsive}
          >
            {
              imgArr.map((item, index) => {
                return (
                  <VideoItem item={item} key={index}/>
                )
              })
            }
          </Carousel>
        </div>
        <div id="link-video" className="w-full">
          <p className="text-sm w-16 ml-auto mr-4 text-blue-700">View All</p>
        </div>
      </div>
    </section>
  )
}