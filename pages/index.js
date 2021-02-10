import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {MainLayout} from '../components/MainLayout'
import {PopularArticle} from '../components/PopularArticle'
import {NewArticle} from '../components/NewArticle'
import {RecentArticles} from '../components/RecentArticles'
import {VideoThumbnail} from '../components/VideoThumbnail'
import {CatCarousel} from '../components/CatCarousel'

const Home = ({res}) => {
  const {article_id, arr_new_article, arr_current_article, arr_businesstips_article, arr_hangout_article, arr_higoesupdate_article, arr_lifestyle_article, arr_techsocialmedia_article, arr_popular_article} = res

  return (
    <MainLayout>
      <main className="w-full h-auto py-8 md:py-12">
        <div className="container mx-auto relative md:px-8 lg:px-8 xl:px-28 2xl:px-40">
          <div id="new article" className="w-12/12 lg:w-8/12 h-auto">
            <NewArticle title={'Artikel Terbaru'} articles={arr_new_article} className="h-80"/>
            <RecentArticles idArr={article_id} articles={arr_current_article}/>
          </div>
          <PopularArticle articles={arr_popular_article}/>
        </div>
        {/* <VideoThumbnail/> */}
        <CatCarousel businesstips={arr_businesstips_article} hangouts={arr_hangout_article} updates={arr_higoesupdate_article} lifestyles={arr_lifestyle_article} techs={arr_techsocialmedia_article}/>
      </main>
    </MainLayout>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('https://apiw.higo.id/blog-viewtype', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({type: 'all'})
  })
  const json = await res.json()
  console.log(json)
  return {props: {res: json}}
}

export default Home
