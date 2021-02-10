import {useState, useEffect} from 'react'
import {MainLayout} from '../components/MainLayout'
import { useRouter } from "next/router";
import {RecentArticles} from '../components/RecentArticles'
import { LoadMore } from '../components/LoadMore'

export default function Search() {
  const router = useRouter()
  const param = router
  const [response, setResponse] = useState(null)
  const [arrArticle, setArrArticle] = useState([])
  const [strId, setStrId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const fetchData = async (id) => {
    setIsLoading(true)
    const res = await fetch('https://apiw.higo.id/blog-search', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({article_id: id, keyword: param.query.q})
    })
    const json = await res.json()
    setIsLoading(false)
    return json
  }

  useEffect(async () => {
    if (param.query.q) {
      setArrArticle([])
      setStrId('')
      const obj = await fetchData('')
      console.log(obj, 'h')
      setResponse({...obj})
    }
  }, [param.query.q])

  useEffect(() => {
    if (response) {
      console.log('lewat', response)
      setArrArticle([...arrArticle, ...response.arr_article])
      setStrId(response.article_id)
    }
  }, [response])

  return (
    <MainLayout>
     <main className="w-full h-auto py-4">
        <div className="container mx-auto relative md:px-8 lg:px-40 xl:px-96 2xl:px-96">
          {
            response && 
              <>
              {/* <p>halo</p>
              <p>{JSON.stringify(response.arr_article)}</p> */}
              <RecentArticles  keyword={param.query.q} articles={arrArticle}/>
              {
                !response.last_data &&
                <LoadMore  loading={isLoading} getLoadMore={async () => setResponse(await fetchData(strId))}/> 
              }
              </>
          }
        </div>          
      </main>
    </MainLayout>
  )
}
