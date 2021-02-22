import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PopularItems = ({item, index, lastindex}) => { 
  const numberWithPoint = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className={`${index === 0 ? 'mb-3' : index === lastindex ? 'mt-3' : 'my-3'} w-11/12 mx-auto md:mx-0  md:w-full flex h-40 lg:h-32 xl:h-36 2xl:h-36 pb-3 border-b-2 border-blue-200 lg:border-b-0`}>
      {
        item.img_name ? 
          <div style={{'backgroundImage': 'url(https://blog.higo.id/img//blog/' + item.img_name+ ')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className="h-full w-5/12 lg:w-6/12" id="img-cont">
            {/* <img/> */}
          </div>
        :
          <div className="h-full w-5/12 lg:w-6/12 bg-gray-400 animate-pulse" id="img-cont">
            {/* <img/> */}
          </div>

      }
      <div className="h-full w-7/12 lg:w-8/12 pl-2 md:pl-4" id="item-info">
        
        <div className="group flex h-full flex-col justify-between transition-all duratioon-150 w-full cursor-pointer">
          {
            item.type &&
            <p className="text-blue-400 text-xs md:text-sm">{item.type}</p>
          }
          {
            item.title ?
            <Link href="/[...slug]" as={`/${item.redirect_link}`}>
              <a>
                <h1 className="block transition-all font-bold duratioon-150 md:text-sm xl:text-base 2xl:text-lg leading-snug md:leading-snug group-hover:text-blue-500">{item.title}</h1>
              </a>
            </Link>
            :
            <h1 className="block lg:hidden xl:block transition-all duratioon-150 w-full h-10 bg-gray-400 rounded-lg animate-pulse"></h1>
          }
          {
            item.view &&
            <div id="views" className="flex items-center justify-start">
                <FontAwesomeIcon className="mr-2" color="gray" icon={["fas", "eye"]} />
                <p className="text-xs xl:text-sm text-gray-500">{numberWithPoint(item.view)} Views</p>
            </div>
          }
        </div>


      </div>
    </div>
  )
}