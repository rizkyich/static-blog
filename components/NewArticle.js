import React from 'react'
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TitleText from '../components/TitleText'
const CustomDot = ({ onMove, index, onClick, active }) => {
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <li
      className={active ? "mx-1 w-3 h-3 rounded-full border-2 border-blue-700 bg-blue-400" : "mx-1 w-3 h-3 rounded-full border-2 border-blue-700"}
      onClick={() => onClick()}
    >
    </li>
  )
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

const CarouselItem = ({item}) => {
  const {date, id, img_url, subtitle, redirect_link, title, view, type} = item
  return (
    <Link href="/[...slug]" as={`/${redirect_link}`} className="w-full h-full">
      <a className="cursor-pointer">
        <div style={{'backgroundImage': 'url(' + img_url + ')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className="md:px-5 relative w-full h-full">

          <div id="card-info" className="px-2 md:px-4 absolute left-0 bottom-0 w-full h-3/6 bg-gradient-to-t from-gray-600 to-transparent">
            <div className="absolute bottom-2 md:bottom-4 w-auto h-auto">
              <div id="cat-tgl" className="flex w-full">
                <p className="text-white text-sm mr-5">{type}</p>
                <p className="text-white text-sm">{date}</p>
              </div>
              <h3 className="bold my-1 text-white leading-tight text-lg lg:text-xl xl:text-2xl md:w-full w-10/12">{title}</h3>
              <p className="text-white italic text-sm">{subtitle}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export const NewArticle = ({articles, title}) => {
  return (
    <div id="new-article" className="w-12/12 lg:w-full md:w-11/12 md:mx-auto h-80 lg:h-lg xl:h-xl 2xl:h-2xl">
      <TitleText text={title}/>
      <div id="carousel-container" className="w-full h-full py-4">
        
        {
          articles ? 
            <Carousel
            className="w-full h-full"
            swipeable={true}
            draggable={false}
            showDots={true} 
            responsive={responsive}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // renderButtonGroupOutside={false}
            // renderDotsOutside
            customDot={<CustomDot />}
          >

            {
              articles.map((item, index) => {
                return (<div key="index" className="w-full sm:w-11/12 md:w-full sm:mx-auto h-80 lg:h-lg xl:h-xl 2xl:h-2xl white pb-10">
                  <div className="w-full h-full bg-gray-300">
                    <CarouselItem item={item}/>
                  </div>
                </div>)
              })
            }
          </Carousel>
          :
          <div className="w-full h-full relative bg-gray-300">
             <div id="card-info" className="px-2 md:px-4 absolute left-0 bottom-0 w-full h-3/6">
            <div className="absolute bottom-2 md:bottom-4 w-11/12 h-auto">
              <div id="cat-tgl" className="animate-pulse flex w-full">
                <div className="w-4/12 rounded-md bg-gray-100 h-5 mr-5"></div>
                <div className="w-4/12 h-5 bg-gray-100 rounded-md"></div>
              </div>
              <div className="animate-pulse my-1 bg-gray-100 h-10 rounded-md md:w-full w-10/12"></div>
              <p className="animate-pulse w-10/12 h-5 bg-gray-100 rounded-md"></p>
            </div>
          </div>
          </div>
        }
      </div>
    </div>
  )
}