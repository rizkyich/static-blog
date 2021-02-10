import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {MainLayout} from '../components/MainLayout'
import {useEffect, useState} from 'react'
import {PopularArticle} from '../components/PopularArticle'
import {NewArticle} from '../components/NewArticle'
import {RecentArticles} from '../components/RecentArticles'
import {VideoThumbnail} from '../components/VideoThumbnail'
import {CatCarousel} from '../components/CatCarousel'
import {useApi, serverApiRequest} from '../src/libs/api'
import usePrevious from '../src/libs/usePrevious'

const Home = ({initData}) => {
  // console.log(initData)
  const requestListArticleParam = {
    path: 'blog-viewtype',
    params: 'type',
    data: 'all',
    method: 'post'
  }
  
  const [listArticle, requestListArticle] = useApi(requestListArticleParam, initData)
  const [arrArticle, setArrArticle] = useState({...listArticle.data})
  
  const prevDataState = usePrevious(listArticle.data)
  useEffect(() => {
    if (listArticle.data && listArticle.data !== prevDataState) {
      setArrArticle({...listArticle.data})
    }
  }, [listArticle.data, prevDataState]);

  // useEffect

  return (
    <MainLayout>
      {
        arrArticle &&
        <main className="w-full h-auto py-8 md:py-12">
          <div className="container mx-auto relative md:px-8 lg:px-8 xl:px-28 2xl:px-40">
            <div id="new article" className="w-12/12 lg:w-8/12 h-auto">
              <NewArticle title={'Artikel Terbaru'} articles={arrArticle.arr_new_article} className="h-80"/>
              <RecentArticles idArr={arrArticle.article_id} articles={arrArticle.arr_current_article}/>
            </div>
            <PopularArticle articles={arrArticle.arr_popular_article}/>
          </div>
          {/* <VideoThumbnail/> */}
          <CatCarousel businesstips={arrArticle.arr_businesstips_article} hangouts={arrArticle.arr_hangout_article} updates={arrArticle.arr_higoesupdate_article} lifestyles={arrArticle.arr_lifestyle_article} techs={arrArticle.arr_techsocialmedia_article}/>
        </main>
      }
    </MainLayout>
  )
}

Home.getInitialProps = async ({req, res, isServer}) => {
  let initData = {}
  try {
    if (isServer) {
      const requestListArticleParam = {
        path: 'blog-viewtype',
        params: 'type',
        data: 'all',
        method: 'post'
      }
      const response = await serverApiRequest({...requestListArticleParam})
      const data = response.data 
      initData = {data, requestConfig: requestListArticleParam, isServer}
    }


    return {initData}
  } catch (error) {
    throw error
  }
}

export default Home
