import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ArticleThumbnail = ({item, index, lastindex, recommend}) => {
  
  const numberWithPoint = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleDate = (str) => { 
    const strArr = str.split(' ')
    return strArr[0] + ' ' + strArr[1].slice(0,3) + ' ' + strArr[2]
  }
  
  return (
    <div className={`${index === 0 ? 'mb-4' : index === lastindex ? 'mt-6' : 'my-6'} ${item.img_url ? 'pb-4' : 'bg-gray-200 pb-0'} w-full flex h-40 ${recommend ? 'xl:h-40' : 'xl:h-48 lg:h-44 2xl:h-56'} border-b-2 border-blue-200 lg:border-b-0`}>
      {
        item.img_url ? 
          <div style={{'backgroundImage': 'url(' + item.img_url + ')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className="shadow-lg h-full w-5/12 md:w-5/12" id="img-cont">
            {/* <img/> */}
          </div>
        :
          <div className="animate-pulse shadow-lg h-full w-5/12 bg-gray-300" id="img-cont">
            {/* <img/> */}
          </div>
      }
      <div className="h-full w-7/12 md:w-7/12 pl-2 md:pl-4 flex flex-col justify-between" id="item-info">

        {
          item.redirect_link ?
            <Link href="/[...slug]" as={`/${item.redirect_link}`} className="transition-all duratioon-150 w-full cursor-pointer">
              <a className="group">
                <div className="w-full h-full">
                  <div id="tgl-cat" className="w-full flex justify-between md:justify-start">
                    <p className="text-xs xl:text-sm font-light 2xl:text-base text-blue-500 group-hover:text-blue-700  md:mr-4  xl:mr-6 w-18">{item.type}</p>
                    <p className="transition-all text-gray-500 font-light duratioon-150 text-xs xl:text-sm 2xl:text-base group-hover:text-blue-500 w-20 md:w-auto ml-auto md:ml-1">{handleDate(item.date)}</p>
                  </div>

                  <h1 className="transition-all duratioon-150 font-bold my-3 lg:my-2 2xl:my-4 md:text-base xl:text-xl group-hover:text-blue-700">{item.title}</h1>
                  {/* <h1 className="transition-all duratioon-150 mt-1 md:text-lg group-hover:text-blue-500">{title.length > 45 ? title.slice(0, 40) + '...' : title}</h1> */}
                  {
                    !recommend &&
                    <div className="hidden md:block leading-snug group-hover:text-blue-700 text-justify md:text-xs lg:text-xs xl:text-sm 2xl:text-base text-gray-700" dangerouslySetInnerHTML={{__html: item.content}}></div>
                  }
                </div>
              </a>
          </Link>
          :
          <div className="w-full h-full">
            <div className="w-full flex animate-pulse rounded-lg justify-between md:justify-start space-y-5 pt-4">
              <div className="bg-gray-300 rounded-lg mr-4 h-8 w-5/12"></div>
              {/* <div className="bg-gray-300 w-5/12 md:w-auto h-8 ml-auto md:ml-1"></div> */}
            </div>

              <div className="transition-all duratioon-150 w-11/12 h-12 rounded-lg md:text-lg animate-pulse bg-gray-300"></div>
                  {/* <h1 className="transition-all duratioon-150 mt-1 md:text-lg group-hover:text-blue-500">{title.length > 45 ? title.slice(0, 40) + '...' : title}</h1> */}
              <div className="hidden md:block mt-1 bg-gray-300"></div>
          </div>
        }

        {
          item.view &&
          <div id="views" className="flex items-center justify-end lg:justify-start">
            <FontAwesomeIcon className="mr-2" color="gray" icon={["fas", "eye"]} />
            <p className="xl:text-sm text-xs font-light text-gray-500">{numberWithPoint(item.view)} Views</p>
          </div>
        }
      </div>
    </div>
  )
}