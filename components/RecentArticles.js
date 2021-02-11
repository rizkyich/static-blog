import React, {useState, useEffect} from 'react'
import { ArticleThumbnail } from '../components/ArticleThumbnail'
import { LoadMore } from '../components/LoadMore'
import TitleText from '../components/TitleText'
import { useRouter } from "next/router"

export const RecentArticles = ({articles, idArr, keyword}) => {
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [articleId, setArticleId] = useState('')
  const [articlesArr, setArticlesArr] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(true)
  const [lastData, setLastData] = useState(false)
  const router = useRouter()
  const pathname = router.pathname

  useEffect(() => {
    if (articles) setArticlesArr([...articles])
  }, [articles])

  useEffect(() => {
    if (idArr) setArticleId(idArr)
  }, [idArr])

  useEffect(() => {
    if (isLoadMore) {
      setTimeout(() => {
          setIsLoadMore(false)
      }, 1000)
    }
  }, [isLoadMore])

  const getPathName = (str) => {
    if (str === '/') return 'all'
    if (str === '/higoes-update') return 'higoesupdate'
    if (str === '/hangout') return 'hangout'
    if (str === '/lifestyle') return 'lifestyle'
    if (str === '/tech-social-media') return 'techsocialmedia'
    if (str === '/business-tips') return 'businesstips'
  } 

  // console.log(articleId, 'kenaap')
  const fetchArticles = () => {
    const type = getPathName(pathname)

    setIsLoading(true)
    fetch('https://apiw.higo.id/blog-loadmorearticle', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({type, article_id: articleId, keyword})
      })
    .then(response => {
      if (response.status !== 200) {
        console.log('There was an error', response)
        return
      }

      response.json().then(data => {
        if (!data.arr_current_article[0]) setLoadMore(false)
        setLastData(data.last_data)
        setIsLoading(false)
        setArticlesArr([...articlesArr, ...data.arr_current_article])
        setArticleId(data.article_id)
      })
    })
    .catch(e => {
      console.log('Errorni', e)
    })
  }

  return (
    <div className="w-12/12 md:w-11/12 lg:w-full md:mx-auto h-auto pt-14">
      <TitleText text={keyword ? 'Hasil Pencarian: ' + keyword : 'Artikel Terkini'}/>
      <div id="recent-articles-list" className="w-11/12 pt-4 mx-auto md:w-full">
        {
          articlesArr[0] ? 
          articlesArr.map((e, index) => {
            return <ArticleThumbnail item={e} index={index} lastindex={articles.length - 1} key={index}/>
          })
          :
          ['', '', '', ''].map((e, idx) => {
            return <ArticleThumbnail key={idx}  item={e} lastindex={['', '', '', ''].length - 1} index={idx}/>
          })
        }
      </div>
      {
       ((loadMore && !keyword) && !lastData) && <LoadMore loading={isLoading} getLoadMore={(val) => fetchArticles()}/>
      }
    </div>
  )
}