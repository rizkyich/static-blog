import React from 'react'
import {PopularItems} from '../components/PopularItems'
import TitleText from '../components/TitleText'

export const PopularArticle = ({articles, sticky}) => {
  return (
    <section className={`${sticky ? 'h-full w-full': 'h-auto w-auto'} relative mt-12 lg:mt-0 lg:absolute w-12/12 md:w-11/12 md:mx-auto lg:w-4/12 xl:w-4/12 lg:right-0 lg:top-0 md:pr-8 lg:pl-0 xl:pl-0`}>
      <div id="title-popular" className="lg:sticky top-24">
        <TitleText text={'Artikel Populer'}/>
        <div id="popular-items" className="lg:p-3 w-full h-auto mt-4 lg:bg-blue-100">
          {
            articles ?
            articles.map((e, index) => {
              return <PopularItems item={e} lastindex={articles.length - 1} key={index} index={index}/>
            })
            :
            ['','','','',''].map((e, index) => {
              return <PopularItems item={e} lastindex={['','','','',''].length - 1} key={index} index={index}/>
            })
          }
        </div>
      </div>
    </section>
  )
}