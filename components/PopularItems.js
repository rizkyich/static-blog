import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PopularItems = ({item, index, lastindex}) => { 
  const numberWithPoint = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className={`${index === 0 ? 'mb-3' : index === lastindex ? 'mt-3' : 'my-3'} w-11/12 mx-auto md:mx-0  md:w-full flex h-40 lg:h-24 xl:h-32 2xl:h-32 pb-3 border-b-2 border-blue-200 lg:border-b-0`}>
      <div style={{'backgroundImage': 'url(https://blog.higo.id/img//blog/' + item.img_name+ ')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className="h-full w-5/12 lg:w-4/12" id="img-cont">
        {/* <img/> */}
      </div>
      <div className="h-full w-7/12 lg:w-8/12 pl-2 md:pl-4 flex flex-col justify-between" id="item-info">
        
        <div className="group transition-all duratioon-150 w-full cursor-pointer">
        <p className="lg:hidden xl:block text-blue-400 text-xs md:text-sm">{item.type}</p>
          <h1 className="hidden lg:block xl:hidden transition-all duratioon-150 md:text-base leading-snug md:leading-snug group-hover:text-blue-500">{item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title}</h1>
          <h1 className="block lg:hidden xl:block transition-all duratioon-150 md:text-base leading-snug md:leading-snug group-hover:text-blue-500">{item.title.length > 50 ? item.title.slice(0, 45) + '...' : item.title}</h1>
        </div>

        <div id="views" className="flex items-center justify-start">
            <FontAwesomeIcon className="mr-2" color="gray" icon={["fas", "eye"]} />
            <p className="text-xs text-gray-500">{numberWithPoint(item.view)} Views</p>
        </div>
      </div>
    </div>
  )
}