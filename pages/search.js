import {useState, useEffect} from 'react'
import {MainLayout} from '../components/MainLayout'
import { useRouter } from "next/router";
import {RecentArticles} from '../components/RecentArticles'
import { LoadMore } from '../components/LoadMore'
import TitleText from '../components/TitleText'

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
        <div className="container mx-auto pt-8 relative md:px-8 lg:px-40 xl:px-60 2xl:px-60">
          {
            response ?
              <>
              {/* <p>halo</p>
              <p>{JSON.stringify(response.arr_article)}</p> */}
              {
                response.arr_article[0] ?
                <RecentArticles  keyword={param.query.q} articles={arrArticle}/>
                :
                <div className="w-full h-screen pt-4">
                  <TitleText text={'Hasil Pencarian tidak ditemukan'}/>
                  <div className="w-full h-full flex flex-col space-y-10 pt-40 items-center">
                    <p className="text-xl text-gray-500">Artikel yang terkait dengan <b className="text-gray-900">{param.query.q}</b> tidak ditemukan</p>
                    <button onClick={() => router.back()} className="text-xl px-12 py-2 rounded-lg bg-blue-600 hover:bg-blue-900 text-white">Kembali</button>
                  </div>
                </div>
              }
              {
                (!response.last_data && response.arr_article[0]) &&
                <LoadMore  loading={isLoading} getLoadMore={async () => setResponse(await fetchData(strId))}/> 
              }
              </>
              :
              <div className="w-full h-screen"></div>
          }
        </div>          
      </main>
    </MainLayout>
  )
}
