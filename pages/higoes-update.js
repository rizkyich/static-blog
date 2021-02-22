import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState, useEffect} from 'react'
import {MainLayout} from '../components/MainLayout'
import {PopularArticle} from '../components/PopularArticle'
import {NewArticle} from '../components/NewArticle'
import {RecentArticles} from '../components/RecentArticles'
import {VideoThumbnail} from '../components/VideoThumbnail'
import {useApi, serverApiRequest} from '../src/libs/api'
import usePrevious from '../src/libs/usePrevious'

const HigoesUpdate = ({initData}) => {
   // console.log(initData)
   const requestListArticleParam = {
    path: 'blog-viewtype',
    params: 'type',
    data: 'higoesupdate',
    method: 'post'
  }
  const initRequestArticle = initData && initData.isServer ? null : requestListArticleParam
  
  const [listArticle, requestListArticle] = useApi(initRequestArticle, initData)
  const [arrArticle, setArrArticle] = useState({...listArticle.data})
  
  const prevDataState = usePrevious(listArticle.data)
  useEffect(() => {
    if (listArticle.data && listArticle.data !== prevDataState) {
      setArrArticle({...listArticle.data})
    }
  }, [listArticle.data, prevDataState]);

  return (
    <>
      <Head>
        <title>Lihat Update Lokasi Baru dan Pengembangan Teknologi dari HIGO</title>
        <meta property="og:title" content="Lihat update lokasi baru dan pengembangan teknologi dari HIGO"></meta>
        <meta itemProp="name" content="Berita terbaru seputar HIGO, mulai dari pengembangan produk, lokasi HIGOspot terbaru, dan hal menarik lainnya." />
        <meta itemProp="description" content="Berita terbaru seputar HIGO, mulai dari pengembangan produk, lokasi HIGOspot terbaru, dan hal menarik lainnya." name="description" />
        <meta property="og:site_name" content="HIGO"/>
        <meta name="keywords" content="Blog HIGO, Lokasi Terbaru HIGOspot, Artikel Lifestyle & Teknologi, Artikel Tips Bisnis & Tempat Hangout" />
      </Head>
      <MainLayout>
        <main className="w-full h-auto py-8 md:py-12">
          <div className="container mx-auto relative md:px-8 lg:px-0 xl:px-10 2xl:px-20">
            <div id="new article" className="w-12/12 lg:w-8/12 md:pr-6 h-auto">
              <NewArticle title={'Artikel Terbaru'} articles={arrArticle.arr_new_article} className="h-80"/>
              <RecentArticles idArr={arrArticle.article_id} articles={arrArticle.arr_current_article}/>
            </div>
            <PopularArticle articles={arrArticle.arr_popular_article}/>
          </div>
          {/* <VideoThumbnail/> */}
          {
            arrArticle.arr_businesstips_article &&
            <CatCarousel businesstips={arrArticle.arr_businesstips_article} hangouts={arrArticle.arr_hangout_article} updates={arrArticle.arr_higoesupdate_article} lifestyles={arrArticle.arr_lifestyle_article} techs={arrArticle.arr_techsocialmedia_article}/>
          }
        </main>
      </MainLayout>
    </>
  )
}

HigoesUpdate.getInitialProps = async ({req, res, isServer}) => {
  let initData = {}
  try {
    if (isServer) {
      const requestListArticleParam = {
        path: 'blog-viewtype',
        params: 'type',
        data: 'higoesupdate',
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

export default HigoesUpdate